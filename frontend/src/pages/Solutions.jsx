import {
  Scale,
  Home as HomeIcon,
  Building2,
  Users,
  Handshake,
  FileSignature,
  Briefcase,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "@/components/CTASection";

const CASES = [
  {
    icon: Scale,
    title: "Solicitors & Legal",
    body: "Deed witnessing, engagement letters, statutory declarations. Sealed evidence packs your court will accept.",
    highlights: ["Remote deed witnessing", "SRA-friendly audit trail", "OneID verification"],
  },
  {
    icon: HomeIcon,
    title: "Conveyancing",
    body: "TR1 transfers, mortgage deeds, and completion documents — witnessed remotely with UK-compliant assurance.",
    highlights: ["TR1 / TP1 / DS1 templates", "Signatory-then-witness flow", "Land Registry-friendly PDFs"],
  },
  {
    icon: Building2,
    title: "Estate Agents",
    body: "Tenancy agreements, offer letters, memorandum of sale — signed in minutes, from any device.",
    highlights: ["Mobile-first signing", "Right-to-rent checks", "Chain-visible dashboards"],
  },
  {
    icon: Handshake,
    title: "Accountants",
    body: "Engagement letters, HMRC 64-8 authorisations, and filings. Fully audited and long-term archived.",
    highlights: ["Client onboarding kit", "64-8 & 648 workflows", "MTD ready"],
  },
  {
    icon: Users,
    title: "HR & Onboarding",
    body: "Offers, contracts, right-to-work, and policy acknowledgements — bulk-send with templates.",
    highlights: ["ATS & HRIS webhooks", "Bulk send", "Right-to-work checks"],
  },
  {
    icon: Briefcase,
    title: "Operations & Procurement",
    body: "NDAs, MSAs, SOWs, and DPAs — from draft to archive without leaving your CRM.",
    highlights: ["Salesforce / HubSpot", "Approval workflows", "SLA reminders"],
  },
  {
    icon: FileSignature,
    title: "Client Agreements",
    body: "Master service agreements, statements of work, and consent forms — signed, sealed, and archived.",
    highlights: ["Parallel & sequential routing", "Payments on signing", "Long-term archive"],
  },
  {
    icon: Landmark,
    title: "Finance & Lending",
    body: "Loan agreements, guarantor forms, and mandate letters with QES-grade assurance.",
    highlights: ["eIDAS QES ready", "AML-friendly evidence", "Escrow on completion"],
  },
];

const Solutions = () => (
  <div data-testid="page-solutions">
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Solutions
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          One platform. Every team that signs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Whether you&apos;re witnessing a TR1 or onboarding a new hire,
          Touch2Sign wraps your document in the right level of identity,
          evidence, and audit.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        {CASES.map((c) => (
          <div
            key={c.title}
            className="t2s-feature-card rounded-xl border border-slate-200 bg-white p-8"
            data-testid={`use-case-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
                <c.icon className="h-5 w-5" />
              </div>
              <Link
                to="/contact"
                className="text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                Talk to us →
              </Link>
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
              {c.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{c.body}</p>
            <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
              {c.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <CTASection
      title="Tell us how your team signs today."
      subtitle="We'll map Touch2Sign to your existing workflow — no rip-and-replace."
    />
  </div>
);

export default Solutions;
