import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Search,
  PartyPopper,
  QrCode,
  Smartphone,
  FolderOpen,
  CalendarPlus,
  Check,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";

const PILLARS = [
  {
    icon: Clock3,
    title: "Time at the door",
    body: "Parents sign on mobile before arrival. Staff print a door checklist with a walk-in QR — no hunting binders or verifying paper.",
  },
  {
    icon: Search,
    title: "Risk when it matters",
    body: "Signed PDF plus audit trail, searchable in seconds if there is an incident — not a box in the storeroom from three seasons ago.",
  },
  {
    icon: PartyPopper,
    title: "Party chaos, solved",
    body: "One event link or QR for the whole group. Optional guest list and live signed status — stop chasing fifteen WhatsApp threads.",
  },
];

const STEPS = [
  {
    n: "01",
    icon: CalendarPlus,
    title: "Create an event",
    body: "Pick your disclaimer template, name the party or session, set the date.",
  },
  {
    n: "02",
    icon: QrCode,
    title: "Share link or QR",
    body: "Send to parents before arrival, add to invites, or print on the door checklist.",
  },
  {
    n: "03",
    icon: Smartphone,
    title: "Parents sign on mobile",
    body: "Child name, guardian details, then sign — type, draw, or biometric on phone.",
  },
  {
    n: "04",
    icon: FolderOpen,
    title: "Event folder + door pack",
    body: "All consents grouped per event. Staff checklist shows who is still unsigned.",
  },
];

const TIERS = [
  {
    name: "Starter",
    forms: "250 forms / month",
    price: "£5",
    highlight: false,
    features: [
      "Event link + QR",
      "Door checklist PDF",
      "Up to 3 active events",
      "1 branded template",
    ],
  },
  {
    name: "Standard",
    forms: "1,000 forms / month",
    price: "£10",
    highlight: true,
    badge: "Most venues",
    features: [
      "Everything in Starter",
      "Unlimited active events",
      "Guest list CSV + invites",
      "Party link + live signed status",
      "Unlimited branded templates",
    ],
  },
  {
    name: "Scale",
    forms: "Unlimited* forms / month",
    price: "£25",
    highlight: false,
    features: [
      "Everything in Standard",
      "Multi-location (up to 5)",
      "Staff kiosk / tablet mode",
      "API + webhooks",
      "Priority support",
    ],
  },
];

const AUDIENCE = [
  "Soft play centres",
  "Farms & seasonal attractions",
  "Trampoline & jump zones",
  "Party rooms & hire venues",
  "School trip hosts",
];

const Venues = () => (
  <div data-testid="page-venues">
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-legal-grid opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700"
          data-testid="venues-eyebrow"
        >
          Soft play · Farms · Jump zones · Party rooms
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Parent consent before the party starts — not at the door.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Share one event link or QR. Parents sign your disclaimer on mobile
          before they arrive — or scan a walk-in QR in about two minutes. Every
          signed form lands in a searchable event folder with a full audit trail.
        </p>

        <div className="mt-8 inline-flex items-baseline gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <span className="text-sm text-slate-600">From</span>
          <span className="font-display text-2xl font-bold text-slate-900">
            £10
          </span>
          <span className="text-sm text-slate-500">/month · 1,000 signed forms</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/contact?use_case=venues" data-testid="venues-hero-cta">
            <Button className="rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link
            to="/bulk-sign"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            data-testid="venues-hero-bulk"
          >
            Also for bulk sign-in
          </Link>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Built for real venue ops
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-slate-900">
          Not “digital paperwork.” Less time at the door.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Searchable records when it matters. One link for the whole birthday
          party.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
              data-testid={`venues-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-bold text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        How it works
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900">
        From event setup to signed parent record in minutes.
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="t2s-feature-card rounded-xl border border-slate-200 bg-white p-8"
            data-testid={`venues-step-${s.n}`}
          >
            <div className="font-mono-ibm text-xs font-semibold text-blue-700">
              STEP {s.n}
            </div>
            <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-slate-900">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Simple pricing
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900">
          Venues treat disclaimers as overhead — so we priced it that way.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">No per-form anxiety.</p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? "border-blue-700 bg-slate-900 text-white shadow-lg"
                  : "border-slate-200 bg-white"
              }`}
              data-testid={`venues-tier-${tier.name.toLowerCase()}`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-700 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {tier.badge}
                </span>
              )}
              <h3
                className={`font-display text-xl font-bold ${
                  tier.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  tier.highlight ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {tier.forms}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={`font-display text-4xl font-bold ${
                    tier.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.highlight ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  / mo
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlight ? "text-blue-300" : "text-emerald-600"
                      }`}
                    />
                    <span
                      className={
                        tier.highlight ? "text-slate-100" : "text-slate-800"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          * Fair use ~10,000 forms/month. Annual plans: 2 months free. Extra
          1,000 forms = £10. EUR/USD available.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        Who it is for
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900">
        Small party venues first. Same rails for bulk sign-in.
      </h2>
      <div className="mt-10 flex flex-wrap gap-3">
        {AUDIENCE.map((a) => (
          <span
            key={a}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            {a}
          </span>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
          <div className="flex items-center gap-2 text-slate-900">
            <Ban className="h-4 w-4 text-slate-500" />
            <h3 className="font-display text-lg font-bold">What we are not</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            A ticketing or POS system — keep ROLLER, XEPOS, or Venue-OS for
            that. Your solicitor owns disclaimer wording. We provide signing,
            storage, and audit-grade records.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Need to send the same form to fifty people?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Clubs, school trips, volunteer packs, contractor inductions — same
            product, bulk send. Collect names, answers, and a signature in one
            pass.
          </p>
          <Link
            to="/bulk-sign"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            data-testid="venues-bulk-link"
          >
            See bulk sign-in <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-slate-500">
        Disclaimer templates remain customer-owned. Touch2Sign provides
        electronic signing infrastructure, storage, and audit trails — not legal
        advice or waiver content. Outreach notes about this module go out from{" "}
        <a
          href="https://touch2sign.info/venues/"
          className="font-medium text-blue-700 hover:text-blue-800"
        >
          touch2sign.info/venues
        </a>
        .
      </p>
    </section>

    <CTASection
      title="Piloting with UK activity venues now."
      subtitle="First venues get hands-on setup help. Reply for a 15-minute walkthrough — no hard sell."
      primaryLabel="Book a walkthrough"
      primaryHref="/contact?use_case=venues"
      secondaryLabel="Bulk sign-in"
      secondaryHref="/bulk-sign"
    />
  </div>
);

export default Venues;
