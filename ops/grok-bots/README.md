# Touch2Sign — Grok Bot roster

Copy-paste setup for a founder running several jobs. **Create four bots now.** Do not create the “later” bots until the first four have had a quiet, correct week.

All bots share **one Grok Bot computer** (logins, files, browser). That is not a security boundary. Safety lives in each bot’s **description**.

Company facts they must not invent:

- Product: UK eSignature + remote deed witnessing (legal) and **Venue Disclaimers** (parent consent for party venues) + **bulk sign-in**.
- Venues landing: https://touch2sign.info/venues/
- Outreach inbox: `hello@touch2sign.info` — never send cold mail from the main signing domain.
- Legal/product inbox: `hello@touch2sign.com`
- Price (venues): Starter £5 / 250 forms, Standard £10 / 1,000, Scale £25. Not a POS. Solicitor owns wording.
- Repo: `github.com/RobertCJackson/website` — branch work via Cursor Cloud Agents, not by YOLO-pushing to `main`.
- Playbook on disk: `marketing/venues/` in that repo.

---

## Create in this order

| # | Bot | File | When |
| --- | --- | --- | --- |
| 0 | Shared skills | `shared-skills.md` | Once, before any bot |
| 1 | Chief of Staff | `01-chief-of-staff.md` | Day 1 |
| 2 | GTM | `02-gtm.md` | Day 1 after HubSpot is connected |
| 3 | Product | `03-product.md` | Day 1 after GitHub is connected |
| 4 | Ops | `04-ops.md` | After 7 quiet CoS mornings, or sooner if Stripe is live |
| — | Group: Daily desk | `group-chat.md` | After 1–3 exist |
| 5+ | Later | `05-later.md` | Support, Design, Data — not now |

---

## Tools matrix (connect these, not everything)

| Tool | Who uses it | Why |
| --- | --- | --- |
| Grok Bot app (Mac/Win + iOS) | You | The manager. Do not add another bot OS. |
| Gmail (`hello@touch2sign.info` + personal) | CoS, GTM | Inbox, drafts. CoS triages; GTM drafts outreach. |
| Google Calendar | CoS | Holds, walkthroughs, “what needs me today.” |
| HubSpot | GTM, CoS (read) | Source of truth for venues pipeline. Import `prospects.csv`. |
| GitHub | Product | PRs, CI, issues on `website`. |
| Cursor Cloud Agents | Product | Actual code changes. Product bot delegates; it does not merge `main`. |
| Notion **or** Google Drive (pick one) | All | Company brain: ICP, pricing, legal line, brand. |
| Stripe | Ops | Failed payments, new subs. Read-only until trusted. |
| Microsoft Clarity | GTM / Product (weekly) | Did anyone use the venues page. |
| Slack | Skip unless you live there | Email + Grok Bot is enough for a small team. |
| Composio | Later | Only when you are tired of installing plugins one by one. |

**Do not connect:** bank/Xero, the signing/production app as a sender, Instantly as “Grok can press send,” Superdesign until Design bot exists.

---

## How to paste a prompt

1. Grok Bot → **New → Create new agent**
2. **Bot actions → Edit Profile** → name, title, paste **Description**
3. **Settings → Plugins** → enable the tools listed for that bot, sign in
4. Send the **First message** in that bot’s chat
5. After it does the first job well, add the **Routine** from the same file
6. Enable **Shared skills** on the bot

External send, spend, delete, merge to `main` = **you approve**. Every description says so.
