import {
  FileSignature,
  Fingerprint,
  Workflow,
  ShieldCheck,
  FileText,
  KeyRound,
  Users,
  ClipboardCheck,
  Landmark,
  Lock,
  Timer,
  ScrollText,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import ComplianceStrip from "@/components/ComplianceStrip";
import CTASection from "@/components/CTASection";

const GROUPS = [
  {
    label: "eSignature",
    icon: FileSignature,
    features: [
      { icon: FileText, title: "Templates & fields", body: "Reusable templates, drag-drop fields, signing order and conditional routing." },
      { icon: KeyRound, title: "SES · AES · QES", body: "Choose the right assurance level per document, from simple SES to eIDAS QES." },
      { icon: ScrollText, title: "ERSD disclosure", body: "Electronic record & signature disclosures presented and captured on every signer." },
    ],
  },
  {
    label: "Deed Witnessing",
    icon: Fingerprint,
    features: [
      { icon: Users, title: "Remote witnessing", body: "Signatory completes, then a witness verifies via OTP and OneID before attesting." },
      { icon: ShieldCheck, title: "Attestation pack", body: "Witness attestation declarations signed and bundled into a sealed evidence pack." },
      { icon: ClipboardCheck, title: "OneID verification", body: "UK DIATF-certified identity assurance with selfie liveness and document checks." },
    ],
  },
  {
    label: "Digital Transactions",
    icon: Workflow,
    features: [
      { icon: Landmark, title: "Payments & escrow", body: "Collect fees, deposits, or completion monies with optional escrow release." },
      { icon: Timer, title: "Automations", body: "Reminders, deadlines, and CRM webhooks keep everyone moving without chasing." },
      { icon: Lock, title: "Long-term archive", body: "Tamper-evident PDFs, PAdES embedded signatures, and 7-year archive retention." },
    ],
  },
];

const Features = () => (
  <div data-testid="page-features">
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Features
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Every capability your legal, HR and ops teams need to sign with confidence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Touch2Sign combines eSignatures, remote deed witnessing, identity
          verification and payments into one auditable lifecycle.
        </p>
      </div>
    </section>

    <ComplianceStrip />

    <div className="space-y-16 py-24">
      {GROUPS.map((group) => (
        <section key={group.label} className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-white">
              <group.icon className="h-4 w-4" />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {group.label}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {group.features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.body}
                testId={`feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>

    <CTASection
      title="See it on your own documents."
      subtitle="Bring a real deed or contract to your demo — we'll walk through witnessing, signatures, and audit output live."
    />
  </div>
);

export default Features;
