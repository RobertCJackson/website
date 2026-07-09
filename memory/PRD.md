# Touch2Sign — PRD

## Original problem statement
Fresh Touch2Sign website: UK-focused digital signing + remote deed witnessing.
Marketing site (Home, Features, Security & Compliance, Solutions, Pricing,
Contact/Book Demo, Sign In) + branded authenticated app shell (Dashboard,
Documents, Signatures/Workflows, Identity Verification, Settings).

Brand: navy/cobalt blue on white, shield + document + fingerprint + stylus mark,
"Touch2Sign" wordmark. Clean legal-corporate enterprise UI.

Reference site: https://signflow.icit.co.uk:4443/

## User personas
- Solicitors / conveyancers (deed witnessing, TR1 transfers)
- Estate agents & accountants (client agreements, HMRC filings)
- HR & operations teams (onboarding, MSAs, NDAs)
- SMB and enterprise IT / compliance buyers

## Core requirements (static)
- Marketing pages with clear enterprise value prop + trust signals
- Consistent design system across marketing and app shell
- Book Demo primary conversion path (form → MongoDB + AWS SES email)
- Sign In placeholder that lands users in the branded app shell
- App shell must feel enterprise-grade, minimal, and legible

## User choices captured
- **Auth**: placeholder sign in (Cursor will wire up real login later)
- **Pricing**: option (b) — sample tier plans visible (Starter/Business/Enterprise)
- **Book Demo email**: AWS SES with graceful degradation if env vars missing
- **Logo & branding assets**: handled downstream by Cursor via GitHub — SVG
  placeholder shield mark shipped in `Logo.jsx`
- **App shell data**: seeded mock data via backend endpoints

## Architecture
- Frontend: React 19 + React Router 7 + Tailwind + Shadcn UI + sonner toasts
- Backend: FastAPI + Motor (Mongo async) + boto3 (SES)
- Database: MongoDB (single `demo_requests` collection persists Book Demo submissions)
- Fonts: Chivo (display) + IBM Plex Sans (body) + IBM Plex Mono (mono/audit)
- Palette: navy `#0A192F`, cobalt `#1D4ED8`, accent `#3B82F6`, slate ramp

## Delivered — 2026-02-XX
### Backend (`/app/backend/server.py`)
- `GET  /api/health` — reports SES config status
- `POST /api/demo`   — validates payload, dispatches SES email (best effort),
  persists to Mongo, returns `{id, email_sent, message}`
- `GET  /api/demo`   — lists submissions (newest first)
- `GET  /api/dashboard/stats` — 4 KPI cards + 5-item activity feed
- `GET  /api/documents` — 6 seeded documents with status/assurance
- `GET  /api/verifications` — 5 seeded OneID-style verifications
- SES config via `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`,
  `SES_FROM_EMAIL`, `SES_TO_EMAIL` — missing values gracefully degrade

### Frontend
- **Marketing layout**: sticky Navbar (glass), Home hero + product mock,
  compliance strip, 3-pillar section, 4-step lifecycle, solutions grid,
  audit trail highlight, CTA, Footer
- **Marketing pages**: Home, Features (grouped), Security & Compliance
  (controls + ongoing assurance), Solutions (8 use cases), Pricing (3 tiers +
  FAQs), Contact (Book Demo form + sidebar), SignIn (split layout w/ SSO)
- **App shell**: sidebar w/ 5 nav items, sticky top header w/ search / notifs
  / user menu, dashboard w/ stats + recent docs + activity, documents table w/
  filters + search + status badges, kanban view for signatures, verifications
  table w/ pass-rate stats, tabbed settings (org / team / security / alerts)
- **Testing**: `data-testid` on every interactive element; testing agent
  reports 100% backend & frontend critical flow pass

## Prioritized backlog
### P0 — none blocking
### P1 — enhancements after review
- Wire real auth (Cursor task): swap placeholder SignIn `navigate('/app')`
  for real JWT/session flow
- Persist Documents/Verifications to Mongo w/ CRUD (currently seeded)
- Fine-tune Shadcn Select accessibility on Contact form (`team-size`)
- Add hero/product illustrations from design guidelines image URLs
- Add favicon + app icon export
### P2 — future
- Dark mode for app shell
- CMS-driven marketing content
- Real compliance certification logos when procured
- Demo scheduling (Calendly-style) integration
- Public status page + API docs
