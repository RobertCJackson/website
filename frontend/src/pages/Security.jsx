import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Server,
  ScrollText,
  UserCheck,
  Eye,
} from "lucide-react";
import ComplianceStrip from "@/components/ComplianceStrip";
import CTASection from "@/components/CTASection";

const CONTROLS = [
  {
    icon: Lock,
    title: "Encryption at rest & in transit",
    body: "AES-256 encryption at rest, TLS 1.3 in transit. UK-hosted primary and DR regions.",
  },
  {
    icon: ScrollText,
    title: "SCCR audit certificates",
    body: "Every completed document ships with a SHA-256 sealed audit certificate and full event trail.",
  },
  {
    icon: UserCheck,
    title: "UK DIATF identity assurance",
    body: "OneID-powered identity verification with selfie liveness and document authentication.",
  },
  {
    icon: FileCheck2,
    title: "PAdES embedded signatures",
    body: "Signatures are cryptographically bound to the PDF — validated by any conformant reader.",
  },
  {
    icon: KeyRound,
    title: "Granular permissions",
    body: "SSO (SAML/OIDC), role-based access, and per-workspace document scopes.",
  },
  {
    icon: Server,
    title: "UK data residency",
    body: "All customer data stored and processed in the UK. No cross-region replication without consent.",
  },
];

const Security = () => (
  <div data-testid="page-security">
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Security &amp; Compliance
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Built for regulated UK teams that can&apos;t leave anything to chance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              From ERSD disclosure through SCCR-sealed evidence packs, every
              layer of Touch2Sign is engineered for auditability, legal
              defensibility, and enterprise trust.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="h-4 w-4 text-blue-700" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Frameworks
                </span>
              </div>
              <ul className="mt-4 space-y-2 font-mono-ibm text-xs text-slate-700">
                <li>· eIDAS QES (eID Easy)</li>
                <li>· UK ECA 2000</li>
                <li>· UK DIATF (OneID)</li>
                <li>· PAdES B-LTA embedded signatures</li>
                <li>· SCCR audit reports</li>
                <li>· UK GDPR &amp; DPA 2018</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ComplianceStrip />

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        Controls &amp; safeguards
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CONTROLS.map((c) => (
          <div
            key={c.title}
            className="t2s-feature-card rounded-xl border border-slate-200 bg-white p-8"
            data-testid={`control-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-slate-900">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{c.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Ongoing assurance
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
            Independently reviewed. Continuously monitored.
          </h2>
        </div>
        <div className="lg:col-span-2 grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, title: "24/7 monitoring", body: "SIEM + on-call SRE rota." },
            { icon: Server, title: "99.95% uptime", body: "Multi-AZ, tested DR." },
            { icon: FileCheck2, title: "Annual pen-tests", body: "CREST-accredited firm." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-slate-800 bg-slate-950 p-6"
            >
              <c.icon className="h-5 w-5 text-blue-300" />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection
      title="Need a security review pack?"
      subtitle="We'll send our SOC-style questionnaire, DPA, sub-processor list, and pen-test summary within one working day."
      primaryLabel="Request security pack"
    />
  </div>
);

export default Security;
