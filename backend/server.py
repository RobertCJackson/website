"""Touch2Sign FastAPI backend.

Provides:
- POST /api/demo             book-a-demo submissions (persist + optional SES email)
- GET  /api/demo             list submissions (for admin/QA)
- GET  /api/dashboard/stats  summary metrics for the app dashboard
- GET  /api/documents        seeded document list for the app shell
- GET  /api/verifications    seeded verification requests for the app shell
"""

from __future__ import annotations

import logging
import os
import uuid
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import List, Optional

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("touch2sign")

# -----------------------------------------------------------------------------
# Mongo
# -----------------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# -----------------------------------------------------------------------------
# SES (graceful degradation - no keys required at runtime)
# -----------------------------------------------------------------------------
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.environ.get("AWS_REGION")
SES_FROM_EMAIL = os.environ.get("SES_FROM_EMAIL")
SES_TO_EMAIL = os.environ.get("SES_TO_EMAIL")


def _ses_configured() -> bool:
    return all(
        [
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY,
            AWS_REGION,
            SES_FROM_EMAIL,
            SES_TO_EMAIL,
        ]
    )


def _send_demo_email(payload: "DemoRequestCreate") -> bool:
    """Send the demo request via AWS SES. Returns True on success, False otherwise."""
    if not _ses_configured():
        logger.info("SES not configured - skipping email send.")
        return False

    try:
        ses = boto3.client(
            "ses",
            region_name=AWS_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
        subject = f"[Touch2Sign] New demo request - {payload.company}"
        text_body = (
            "A new demo request has been submitted on touch2sign.com\n\n"
            f"Name:       {payload.name}\n"
            f"Work Email: {payload.email}\n"
            f"Company:    {payload.company}\n"
            f"Team Size:  {payload.team_size or '-'}\n"
            f"Phone:      {payload.phone or '-'}\n\n"
            f"Message:\n{payload.message or '-'}\n"
        )
        html_body = f"""
        <html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0F172A;">
          <h2 style="color:#0A192F;margin:0 0 12px;">New Touch2Sign demo request</h2>
          <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
            <tr><td style="color:#475569;">Name</td><td><strong>{payload.name}</strong></td></tr>
            <tr><td style="color:#475569;">Work email</td><td><a href="mailto:{payload.email}">{payload.email}</a></td></tr>
            <tr><td style="color:#475569;">Company</td><td>{payload.company}</td></tr>
            <tr><td style="color:#475569;">Team size</td><td>{payload.team_size or '-'}</td></tr>
            <tr><td style="color:#475569;">Phone</td><td>{payload.phone or '-'}</td></tr>
          </table>
          <p style="margin-top:16px;color:#475569;">Message</p>
          <blockquote style="border-left:3px solid #1D4ED8;padding:8px 12px;color:#0F172A;margin:0;">
            {(payload.message or '-').replace(chr(10), '<br/>')}
          </blockquote>
        </body></html>
        """
        ses.send_email(
            Source=SES_FROM_EMAIL,
            Destination={"ToAddresses": [SES_TO_EMAIL]},
            Message={
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": text_body, "Charset": "UTF-8"},
                    "Html": {"Data": html_body, "Charset": "UTF-8"},
                },
            },
        )
        logger.info("SES demo email dispatched to %s", SES_TO_EMAIL)
        return True
    except (ClientError, BotoCoreError) as exc:
        logger.error("SES send failed: %s", exc)
        return False


# -----------------------------------------------------------------------------
# App / router
# -----------------------------------------------------------------------------
app = FastAPI(title="Touch2Sign API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------------------------------------------------------
class DemoRequestCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: str = Field(..., min_length=1, max_length=160)
    team_size: Optional[str] = Field(None, max_length=40)
    phone: Optional[str] = Field(None, max_length=40)
    message: Optional[str] = Field(None, max_length=2000)


class DemoRequest(DemoRequestCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class DemoResponse(BaseModel):
    id: str
    email_sent: bool
    message: str


# ---------- Routes ----------------------------------------------------------
@api_router.get("/")
async def root():
    return {"service": "touch2sign", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "ses_configured": _ses_configured(),
        "time": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/demo", response_model=DemoResponse)
async def create_demo(payload: DemoRequestCreate):
    email_sent = _send_demo_email(payload)
    record = DemoRequest(**payload.model_dump(), email_sent=email_sent)
    doc = record.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.demo_requests.insert_one(doc)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Failed to persist demo request: %s", exc)
        raise HTTPException(status_code=500, detail="Could not save request")

    msg = (
        "Thanks — our team has been notified and will be in touch shortly."
        if email_sent
        else "Thanks — your request has been recorded. We'll be in touch shortly."
    )
    return DemoResponse(id=record.id, email_sent=email_sent, message=msg)


@api_router.get("/demo", response_model=List[DemoRequest])
async def list_demo_requests(limit: int = 100):
    cursor = db.demo_requests.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(length=limit)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


# ---------- Seed data for app shell -----------------------------------------
def _iso_days_ago(days: int) -> str:
    return (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()


_SEED_DOCUMENTS = [
    {
        "id": "DOC-2041",
        "title": "Freehold Transfer TR1 - 14 Ashford Lane",
        "type": "Deed",
        "recipients": ["j.hughes@ashford-legal.co.uk", "witness@onemid.uk"],
        "status": "Witnessed",
        "assurance": "OneID Medium",
        "updated_at": _iso_days_ago(0),
    },
    {
        "id": "DOC-2039",
        "title": "Master Services Agreement - Ridgeway Partners",
        "type": "Contract",
        "recipients": ["a.malik@ridgeway.co.uk"],
        "status": "Signed",
        "assurance": "AES",
        "updated_at": _iso_days_ago(1),
    },
    {
        "id": "DOC-2036",
        "title": "Employment Offer - Priya Shah",
        "type": "HR",
        "recipients": ["priya.shah@outlook.com"],
        "status": "Sent",
        "assurance": "SES",
        "updated_at": _iso_days_ago(2),
    },
    {
        "id": "DOC-2033",
        "title": "Statutory Declaration - Beaumont Estate",
        "type": "Deed",
        "recipients": ["r.beaumont@icloud.com"],
        "status": "Awaiting Witness",
        "assurance": "OneID High",
        "updated_at": _iso_days_ago(3),
    },
    {
        "id": "DOC-2028",
        "title": "NDA - Halcyon Ventures Ltd",
        "type": "Contract",
        "recipients": ["m.pearce@halcyon.vc"],
        "status": "Draft",
        "assurance": "SES",
        "updated_at": _iso_days_ago(5),
    },
    {
        "id": "DOC-2021",
        "title": "Deed of Variation - 22 Regent Court",
        "type": "Deed",
        "recipients": ["conveyancing@lawrence-brown.co.uk"],
        "status": "Archived",
        "assurance": "QES",
        "updated_at": _iso_days_ago(11),
    },
]


_SEED_VERIFICATIONS = [
    {
        "id": "VER-8812",
        "signer": "Rachel Beaumont",
        "email": "r.beaumont@icloud.com",
        "method": "OneID + Selfie",
        "assurance": "High",
        "status": "Verified",
        "checked_at": _iso_days_ago(0),
    },
    {
        "id": "VER-8809",
        "signer": "James Hughes",
        "email": "j.hughes@ashford-legal.co.uk",
        "method": "OneID",
        "assurance": "Medium",
        "status": "Verified",
        "checked_at": _iso_days_ago(0),
    },
    {
        "id": "VER-8804",
        "signer": "Priya Shah",
        "email": "priya.shah@outlook.com",
        "method": "OTP + Document",
        "assurance": "Medium",
        "status": "In progress",
        "checked_at": _iso_days_ago(1),
    },
    {
        "id": "VER-8798",
        "signer": "Michael Pearce",
        "email": "m.pearce@halcyon.vc",
        "method": "OneID",
        "assurance": "High",
        "status": "Awaiting signer",
        "checked_at": _iso_days_ago(2),
    },
    {
        "id": "VER-8790",
        "signer": "Aisha Malik",
        "email": "a.malik@ridgeway.co.uk",
        "method": "OneID",
        "assurance": "Medium",
        "status": "Failed",
        "checked_at": _iso_days_ago(4),
    },
]


@api_router.get("/documents")
async def list_documents():
    return {"documents": _SEED_DOCUMENTS}


@api_router.get("/verifications")
async def list_verifications():
    return {"verifications": _SEED_VERIFICATIONS}


@api_router.get("/dashboard/stats")
async def dashboard_stats():
    return {
        "stats": [
            {"key": "documents", "label": "Documents", "value": 128, "delta": "+12 this week"},
            {"key": "pending", "label": "Pending signatures", "value": 14, "delta": "3 due today"},
            {"key": "verifications", "label": "Identity verifications", "value": 42, "delta": "98% pass rate"},
            {"key": "completed", "label": "Completed this month", "value": 87, "delta": "+18% vs last month"},
        ],
        "activity": [
            {
                "id": "act-1",
                "actor": "James Hughes",
                "event": "Witness attestation completed",
                "doc": "DOC-2041",
                "when": _iso_days_ago(0),
                "kind": "witness",
            },
            {
                "id": "act-2",
                "actor": "Aisha Malik",
                "event": "Signature applied (AES)",
                "doc": "DOC-2039",
                "when": _iso_days_ago(1),
                "kind": "signature",
            },
            {
                "id": "act-3",
                "actor": "OneID",
                "event": "Identity verified — Medium assurance",
                "doc": "VER-8809",
                "when": _iso_days_ago(1),
                "kind": "verification",
            },
            {
                "id": "act-4",
                "actor": "System",
                "event": "SCCR audit certificate generated",
                "doc": "DOC-2039",
                "when": _iso_days_ago(2),
                "kind": "audit",
            },
            {
                "id": "act-5",
                "actor": "Priya Shah",
                "event": "Document opened",
                "doc": "DOC-2036",
                "when": _iso_days_ago(2),
                "kind": "view",
            },
        ],
    }


# ---------- App wiring ------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
