import { Link } from "react-router-dom";
import {
  ArrowRight,
  Send,
  ListChecks,
  FileSpreadsheet,
  Users,
  School,
  HardHat,
  HeartHandshake,
  ClipboardSignature,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";

const STEPS = [
  {
    n: "01",
    title: "One template",
    body: "Upload your PDF or paste the wording. Add the fields you actually need: name, date of birth, emergency contact, tick-boxes, signature.",
  },
  {
    n: "02",
    title: "Bulk send",
    body: "Paste a list, upload a CSV, or share one link. Everyone gets the same form — you keep one folder of signed copies.",
  },
  {
    n: "03",
    title: "They fill and sign",
    body: "On a phone. Two minutes, not a printer-and-scan loop. Reminders for the unsigned without you chasing WhatsApp.",
  },
  {
    n: "04",
    title: "Searchable pack",
    body: "Filter who signed, export a CSV of answers, download the signed PDFs. Audit trail on every record.",
  },
];

const USES = [
  {
    icon: School,
    title: "School trips & clubs",
    body: "Parent consent, medical notes, photo permissions — sent once to the whole year group.",
  },
  {
    icon: Users,
    title: "Party & event guest lists",
    body: "Same rails as Venue Disclaimers: one link, live signed status, door checklist.",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer & membership packs",
    body: "Codes of conduct, DBS acknowledgements, season-start forms without a paper mountain.",
  },
  {
    icon: HardHat,
    title: "Contractor & site induction",
    body: "Send the same H&S briefing to a crew. Know who has (and has not) signed before they arrive.",
  },
  {
    icon: ClipboardSignature,
    title: "Simple agreements",
    body: "NDAs, photo release, terms of hire, register-of-interest — SES-grade signature, stored.",
  },
  {
    icon: FileSpreadsheet,
    title: "Anything with a list",
    body: "If you currently email a PDF and hope it comes back, this is the replacement.",
  },
];

const BulkSign = () => (
  <div data-testid="page-bulk-sign">
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-legal-grid opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700"
          data-testid="bulk-eyebrow"
        >
          Bulk sign-in · simple documents
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Send one form to fifty people. Get the info and the signature back.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Built for the paperwork that is not a deed and not a CRM workflow —
          consent, register, induction, hire terms. Same Touch2Sign audit trail.
          Priced like venue overhead: from £10/month for 1,000 forms.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/contact?use_case=bulk" data-testid="bulk-hero-cta">
            <Button className="rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
              Talk to us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link
            to="/venues"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            data-testid="bulk-hero-venues"
          >
            Party venue disclaimers
          </Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        How it works
      </p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-slate-900">
        Template, list, signed folder.
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-xl border border-slate-200 bg-white p-8"
            data-testid={`bulk-step-${s.n}`}
          >
            <div className="font-mono-ibm text-xs font-semibold text-blue-700">
              STEP {s.n}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
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
          Use cases
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-slate-900">
          If it is a simple form and a list of people, it belongs here.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {USES.map((u) => (
            <article
              key={u.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
              data-testid={`bulk-use-${u.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
                <u.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                {u.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{u.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Why not DocuSign for this
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900">
            Envelope pricing is the wrong tool for a guest list.
          </h2>
          <p className="mt-4 text-slate-600">
            You do not need QES, a sales-assisted rollout, or £2 a signature to
            get a parent to confirm a medical note. You need a link, a reminder,
            and a folder you can search on Saturday morning.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {[
              "Same £5 / £10 / £25 venue pricing — no per-envelope surprise",
              "CSV in, signed PDFs and answers out",
              "Live unsigned list so you know who still needs chasing",
              "Audit trail without enterprise theatre",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Send className="h-4 w-4 text-blue-700" />
              Year 4 trip · consent pack
            </div>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
              41 / 48 signed
            </span>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { name: "A. Chen", status: "Signed", meta: "Asthma inhaler noted" },
              { name: "M. Okonkwo", status: "Signed", meta: "Photo OK" },
              { name: "L. Patel", status: "Unsigned", meta: "Reminder sent 2h ago" },
              { name: "J. Hughes", status: "Signed", meta: "Vegetarian meal" },
              { name: "S. Byrne", status: "Unsigned", meta: "Opened, not signed" },
            ].map((row) => (
              <li
                key={row.name}
                className="flex items-center justify-between border-b border-slate-100 pb-3"
              >
                <div>
                  <div className="font-medium text-slate-900">{row.name}</div>
                  <div className="text-xs text-slate-500">{row.meta}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    row.status === "Signed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <ListChecks className="h-3.5 w-3.5" />
            Export CSV · Download signed PDFs · Resend unsigned
          </div>
        </div>
      </div>
    </section>

    <CTASection
      title="Got a form and a list?"
      subtitle="Send us a sample PDF and a rough headcount. We’ll tell you if bulk sign-in is the fit — or if you need the full legal platform."
      primaryLabel="Send a sample"
      primaryHref="/contact?use_case=bulk"
      secondaryLabel="Venue disclaimers"
      secondaryHref="/venues"
    />
  </div>
);

export default BulkSign;
