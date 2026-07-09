import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileSignature,
  Fingerprint,
  Workflow,
  Upload,
  UserCheck,
  PenTool,
  ClipboardCheck,
  Scale,
  Building2,
  Users,
  Handshake,
  Home as HomeIcon,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ComplianceStrip from "@/components/ComplianceStrip";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

const PILLARS = [
  {
    icon: FileSignature,
    title: "eSignature",
    badge: "SES · AES · QES",
    description:
      "SES, AES, and QES-ready flows with ERSD disclosure and SCCR audit certificates on every document.",
    href: "/features",
  },
  {
    icon: Fingerprint,
    title: "Deed Witnessing",
    badge: "UK Focus",
    description:
      "Remote witnessing with identity verification, attestation declarations, and sealed evidence packs.",
    href: "/features",
  },
  {
    icon: Workflow,
    title: "Digital Transactions",
    badge: "End-to-end",
    description:
      "Compose, route, sign, pay, and store — one lifecycle from draft to archive.",
    href: "/features",
  },
];

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Upload or draft",
    body: "PDF upload, reusable templates, AI draft, or paste text.",
  },
  {
    n: "02",
    icon: ClipboardCheck,
    title: "Configure",
    body: "Recipients, signing order, fields, and identity rules.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Sign & witness",
    body: "OneID verification, eWitness attestation, and payment if needed.",
  },
  {
    n: "04",
    icon: PenTool,
    title: "Audit & store",
    body: "SCCR certificate, full audit trail, optional escrow release.",
  },
];

const SOLUTIONS = [
  { icon: Scale, title: "Solicitors & Legal", body: "Deed witnessing, engagement letters, statutory declarations." },
  { icon: HomeIcon, title: "Conveyancing", body: "TR1 transfers, mortgage deeds, and remote witnessing." },
  { icon: Building2, title: "Estate Agents", body: "Tenancy agreements, offer letters, memorandum of sale." },
  { icon: Handshake, title: "Accountants", body: "Engagement letters, HMRC authorisations, filings." },
  { icon: Users, title: "HR Onboarding", body: "Offers, contracts, right-to-work, policy acknowledgements." },
  { icon: FileSignature, title: "Client Agreements", body: "MSAs, SOWs, DPAs — signed, sealed, and archived." },
];

const Home = () => (
  <div data-testid="page-home">
    {/* ---------------- HERO ---------------- */}
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-legal-grid opacity-70" />
      <div className="absolute inset-0 bg-cobalt-glow" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
        <div className="lg:col-span-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 backdrop-blur"
            data-testid="hero-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            eSignature · Deed Witnessing · Digital Transactions
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Sign and witness deeds —
            <span className="block text-blue-700">without the paperwork.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            UK-compliant eSignatures and remote deed witnessing in one platform.
            Built for solicitors, conveyancers, and growing UK businesses that
            need trusted, auditable digital signing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact" data-testid="hero-book-demo-btn">
              <Button className="rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              to="/signin"
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
              data-testid="hero-signin-btn"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8 max-w-lg">
            <div>
              <div className="font-display text-2xl font-bold text-slate-900">100%</div>
              <div className="mt-1 text-xs text-slate-500">Audit trail on every document</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-slate-900">UK</div>
              <div className="mt-1 text-xs text-slate-500">Deed witnessing built-in</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-slate-900">Minutes</div>
              <div className="mt-1 text-xs text-slate-500">Not days to complete</div>
            </div>
          </div>
        </div>

        {/* Product panel mock */}
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="font-mono-ibm text-[11px] text-slate-500">
                  app.touch2sign.com — Compose
                </div>
                <div className="h-4 w-4" />
              </div>

              <div className="grid gap-3 md:grid-cols-5">
                <div className="col-span-2 rounded-md border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Recipients
                  </div>
                  <div className="mt-3 space-y-2">
                    {["James Hughes · Signer", "OneID · Witness", "Rachel Beaumont · Signer"].map((r, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-md bg-white p-2 ring-1 ring-slate-200">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-[10px] font-semibold text-white">
                          {r.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="text-xs text-slate-700">{r}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-3 rounded-md border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      TR1 · Freehold Transfer
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      Awaiting Witness
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {[92, 78, 84, 62, 90, 55, 88].map((w, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full bg-slate-100"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-dashed border-blue-300 bg-blue-50/40 p-2 text-center">
                      <div className="text-[10px] font-semibold text-blue-700">SIGN HERE</div>
                      <div className="mt-1 h-6 rounded bg-white ring-1 ring-blue-200" />
                    </div>
                    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-2 text-center">
                      <div className="text-[10px] font-semibold text-slate-500">WITNESS</div>
                      <div className="mt-1 h-6 rounded bg-white ring-1 ring-slate-200" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-md bg-slate-900 px-3 py-2 text-[11px] text-slate-200">
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-mono-ibm">SHA-256 sealed · SCCR</span>
                </div>
                <span className="text-slate-400">Session · 2m 14s</span>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:block">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="font-semibold text-slate-900">OneID verified</div>
                  <div className="text-[11px] text-slate-500">Medium assurance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ComplianceStrip />

    {/* ---------------- PILLARS ---------------- */}
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Platform
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Three pillars. One platform.
        </h2>
        <p className="mt-4 text-slate-600">
          The only platform built for eSignatures and legally compliant remote
          deed witnessing.
        </p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <FeatureCard
            key={p.title}
            icon={p.icon}
            title={p.title}
            description={p.description}
            badge={p.badge}
            href={p.href}
            testId={`pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
          />
        ))}
      </div>
    </section>

    {/* ---------------- HOW IT WORKS ---------------- */}
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Lifecycle
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How it works
            </h2>
          </div>
          <Link
            to="/features"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            data-testid="workflow-see-more"
          >
            See full workflow <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="t2s-feature-card rounded-xl border border-slate-200 bg-white p-8"
              data-testid={`workflow-step-${s.n}`}
            >
              <div className="font-mono-ibm text-xs font-semibold text-blue-700">
                {s.n}
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
      </div>
    </section>

    {/* ---------------- SOLUTIONS ---------------- */}
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Solutions
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Built for UK legal, property &amp; finance teams
        </h2>
        <p className="mt-4 text-slate-600">
          Every workflow — from statutory declarations to HR onboarding — sealed
          with an SCCR audit certificate.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s) => (
          <div
            key={s.title}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-300"
            data-testid={`solution-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-slate-900">
                {s.title}
              </div>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ---------------- AUDIT / COMPLIANCE HIGHLIGHT ---------------- */}
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Compliance
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Complete audit trail on every document.
          </h2>
          <p className="mt-4 text-slate-600">
            ERSD disclosure, SCCR certificates, tamper-evident PDFs, and CSV
            audit exports — built in, not bolted on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/security"
              className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              data-testid="explore-security-btn"
            >
              Trust &amp; Security
            </Link>
            <Link
              to="/features"
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
              data-testid="see-signature-btn"
            >
              See eSignature
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="font-display text-sm font-semibold text-slate-900">
              Audit trail
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
            </span>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "ERSD accepted", meta: "2026-07-01 14:32 UTC", tag: "compliance" },
              { label: "OneID verified", meta: "Medium assurance", tag: "verification" },
              { label: "Signature applied", meta: "Device biometric", tag: "signature" },
              { label: "Witness attestation", meta: "5 declarations signed", tag: "witness" },
              { label: "SCCR generated", meta: "SHA-256 sealed", tag: "audit" },
            ].map((row) => (
              <li key={row.label} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div className="flex flex-1 items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-medium text-slate-900">{row.label}</div>
                  <div className="font-mono-ibm text-xs text-slate-500">{row.meta}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
);

export default Home;
