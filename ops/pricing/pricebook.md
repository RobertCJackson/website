# Touch2Sign pricebook

**Owner:** Pricing bot (drafts). **Approver:** Robert. **Ops** reports Stripe; does not set list price. **GTM / Marketing** quote only what is `live` here.

Last reviewed: 2026-09-01 (from repo + https://touch2sign.info/venues/). Currency default **GBP**. VAT: not stated anywhere public — flag as open.

Status key: `live` on a public page · `in-repo` coded but may not be deployed · `conflict` two sources disagree · `unknown` mentioned, no SKU.

---

## How to read this

Three motions, three packs. Do not mash them into one “Starter.”

| Motion | Buyer | Meter | Public story |
| --- | --- | --- | --- |
| **Legal / SignFlow** | Solicitors, firms, HR | Seats + docs / QES | Enterprise trust |
| **Venues** | Party venue owner | Forms / month | Overhead, £10 |
| **Bulk sign-in** | Anyone with a PDF + a list | Same as venues | Same rails, same £ |

---

## Pack A — Venue Disclaimers (+ bulk sign-in)

Source of truth for list price: https://touch2sign.info/venues/ and `frontend/src/pages/Venues.jsx`.

| SKU | Name | Price | Included | Status |
| --- | --- | --- | --- | --- |
| `venue-starter` | Starter | **£5 / mo** | 250 forms, event link + QR, door checklist PDF, 3 active events, 1 branded template | live |
| `venue-standard` | Standard | **£10 / mo** | 1,000 forms, unlimited events, guest list CSV + invites, live signed status, unlimited templates | live (default pitch) |
| `venue-scale` | Scale | **£25 / mo** | Fair use ~10,000 forms, 5 locations, kiosk/tablet, API + webhooks, priority support | live |
| `venue-overage` | Extra forms | **£10 / 1,000 forms** | — | live (footnote) |
| `venue-annual` | Annual | 2 months free | Same SKU, prepaid | live (footnote) |
| `venue-fx` | EUR / USD | unstated rates | — | live as “available”, **unknown** numbers |

**Not in the pack:** ticketing, POS, waiver *wording*, legal advice.

**Pilot:** Standard unless Robert says otherwise.

**Open:** What happens at 251st form on Starter? Hard stop vs overage? Seasonal pause?

---

## Pack B — Legal eSignature / deed witnessing

Sources disagree. Do **not** quote Pack B in venue emails until this is resolved.

### B1 — Marketing site `Pricing.jsx`

| SKU | Name | Price | Notes | Status |
| --- | --- | --- | --- | --- |
| `legal-starter` | Starter | **£29 / user / mo** | Max 3 users, 50 docs/user/mo, SES+AES, no OneID, no deed witnessing | in-repo |
| `legal-business` | Business | **£69 / user / mo** | Unlimited users/docs, QES ready, OneID, deed witnessing, CRM | in-repo |
| `legal-ent` | Enterprise | Custom / year | SSO, residency, CSM, QES bundle, escrow | in-repo |
| `legal-trial` | Trial | 14 days | Includes OneID + deed sandbox | in-repo FAQ |

Checkout: SignFlow ` /login?mode=signup&plan={starter\|business}&billing=annual ` (`frontend/src/lib/signflow.js`). Default billing in the helper is **annual**.

### B2 — Welcome / billing success `Welcome.jsx`

| SKU | Name | Price | Status |
| --- | --- | --- | --- |
| `personal-monthly` | Personal | **£12 / month** | **conflict** with B1 |
| `personal-annual` | Personal | **£120 / year** | **conflict** |
| `biz-monthly` | Business | **£29 / seat / month** | **conflict** (B1 Business is £69) |
| `biz-annual` | Business | **£290 / seat / year** | **conflict** |

Welcome copy also says “Unlimited document sends” + full SES/AES/QES on those plans — that fights B1 Starter limits.

**P0 for Pricing bot:** one table Robert signs. Then Product aligns Pricing.jsx, Welcome.jsx, SignFlow, Stripe.

---

## Pack C — Other motions

| Product | Price | Status |
| --- | --- | --- |
| HirePass (US hiring / W-4 / I-9) | — | mentioned on touch2sign.info · **unknown** |
| Deed witnessing add-on (if unbundled) | — | bundled in B1 Business · **unknown** if sold solo |
| OneID per check | — | **unknown** |
| QES certificates | — | “bundle” on Enterprise · **unknown** unit price |

---

## Competitive notes (fill in; do not publish as ours)

| Name | What they sell | Ballpark (verify) | Our reply |
| --- | --- | --- | --- |
| ROLLER / Venue-OS / XEPOS | Till + bookings + waivers | XEPOS trampoline from ~£39/mo (verify) | Keep the till; we are the clipboard |
| Smartwaiver / WaiverForever | Waivers, often envelope/US | — | £10 party link, UK venues |
| DocuSign / Adobe | Envelopes, seats | £££ | Wrong tool for a guest list |
| Parafait | FEC suite | — | Full park OS |

---

## Discount / exception log

| Date | Who | What | Why | Expires |
| --- | --- | --- | --- | --- |
| — | — | — | — | — |

No discount without a row here.

---

## Decisions Robert still owes

1. Pack B: is list price the £29/£69 page or the £12/£29 welcome SKUs?
2. One word **Starter** on venues (£5) and legal (£29) — rename one pack?
3. VAT inclusive or exclusive on all public pages?
4. HirePass: SKU or hide until priced?
5. Bulk sign-in: always same as venues, or a cap for non-venue orgs?
