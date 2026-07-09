"""Touch2Sign backend API tests."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://signup-complete.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def test_health(s):
    r = s.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    d = r.json()
    assert d["status"] == "ok"
    assert d["ses_configured"] is False
    assert "time" in d


def test_dashboard_stats(s):
    r = s.get(f"{API}/dashboard/stats", timeout=15)
    assert r.status_code == 200
    d = r.json()
    assert len(d["stats"]) == 4
    assert len(d["activity"]) == 5


def test_documents(s):
    r = s.get(f"{API}/documents", timeout=15)
    assert r.status_code == 200
    docs = r.json()["documents"]
    assert len(docs) == 6
    for doc in docs:
        assert "id" in doc and "title" in doc and "status" in doc and "assurance" in doc


def test_verifications(s):
    r = s.get(f"{API}/verifications", timeout=15)
    assert r.status_code == 200
    assert len(r.json()["verifications"]) == 5


def test_demo_post_valid_and_persist(s):
    payload = {
        "name": "TEST_Tester",
        "email": "test_tester@example.com",
        "company": "TEST_Co",
        "team_size": "11–50",
        "phone": "+441234567890",
        "message": "TEST hello",
    }
    r = s.post(f"{API}/demo", json=payload, timeout=15)
    assert r.status_code == 200
    d = r.json()
    assert "id" in d
    assert d["email_sent"] is False
    assert "message" in d and len(d["message"]) > 0
    new_id = d["id"]

    # Verify persistence via GET /api/demo
    r2 = s.get(f"{API}/demo", timeout=15)
    assert r2.status_code == 200
    items = r2.json()
    assert any(it["id"] == new_id for it in items)
    # Sorted newest first
    if len(items) >= 2:
        assert items[0]["created_at"] >= items[-1]["created_at"]


def test_demo_missing_email_422(s):
    r = s.post(f"{API}/demo", json={"name": "X", "company": "Y"}, timeout=15)
    assert r.status_code == 422


def test_demo_invalid_email_422(s):
    r = s.post(f"{API}/demo", json={"name": "X", "email": "not-an-email", "company": "Y"}, timeout=15)
    assert r.status_code == 422


def test_demo_list_sorted(s):
    r = s.get(f"{API}/demo", timeout=15)
    assert r.status_code == 200
    items = r.json()
    times = [it["created_at"] for it in items]
    assert times == sorted(times, reverse=True)
