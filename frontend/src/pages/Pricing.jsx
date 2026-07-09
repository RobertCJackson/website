import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";

const TIERS = [
  {
    name: "Starter",
    price: "£29",
    unit: "per user / month",
    tag: "For small firms getting started",
    cta: { label: "Book a demo", href: "/contact" },
    highlight: false,
    features: [
      { label: "Up to 3 users", ok: true },
      { label: "50 documents / user / month", ok: true },
      { label: "SES + AES signatures", ok: true },
      { label: "SCCR audit certificates", ok: true },
      { label: "OneID identity verification", ok: false },
      { label: "Remote deed witnessing", ok: false },
      { label: "SSO / SAML", ok: false },
    ],
  },
  {
    name: "Business",
    price: "£69",
    unit: "per user / month",
    tag: "Most popular — for growing UK teams",
    cta: { label: "Book a demo", href: "/contact" },
    highlight: true,
    features: [
      { label: "Unlimited users", ok: true },
      { label: "Unlimited documents", ok: true },
      { label: "SES · AES · QES ready", ok: true },
      { label: "SCCR + ERSD disclosure", ok: true },
      { label: "OneID identity verification", ok: true },
      { label: "Remote deed witnessing", ok: true },
      { label: "CRM connectors + webhooks", ok: true },
      { label: "SSO / SAML", ok: false },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual contract",
    tag: "For regulated & multi-entity organisations",
    cta: { label: "Talk to sales", href: "/contact" },
    highlight: false,
    features: [
      { label: "Unlimited everything", ok: true },
      { label: "SSO / SAML + SCIM", ok: true },
      { label: "Custom data residency", ok: true },
      { label: "Dedicated CSM & SLA", ok: true },
      { label: "eIDAS QES bundle", ok: true },
      { label: "Custom retention & archive", ok: true },
      { label: "Escrow on completion", ok: true },
    ],
  },
];

const FAQS = [
  {
    q: "Do you offer a free trial?",
    a: "Yes — every plan comes with a 14-day trial including OneID and deed witnessing sandbox.",
  },
  {
    q: "Which plan includes remote deed witnessing?",
    a: "Deed witnessing is included from the Business plan onwards. Starter is signature-only.",
  },
  {
    q: "Can I mix seat counts across the year?",
    a: "Yes — Business and Enterprise plans support flexible seat counts with monthly true-up.",
  },
  {
    q: "How is data stored?",
    a: "All documents and audit records are stored in UK-based data centres with encrypted long-term archive.",
  },
];

const Pricing = () => (
  <div data-testid="page-pricing">
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Pricing
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Straightforward plans. Enterprise-grade evidence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Pick the plan that fits how your team signs today — upgrade or scale
          seats whenever you need. All plans include SCCR audit certificates.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-2xl border p-8 transition-colors ${
              tier.highlight
                ? "border-blue-700 bg-slate-900 text-white shadow-lg"
                : "border-slate-200 bg-white"
            }`}
            data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`font-display text-xl font-bold ${
                  tier.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {tier.name}
              </h3>
              {tier.highlight && (
                <span className="rounded-full bg-blue-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}
            </div>
            <p
              className={`mt-2 text-sm ${
                tier.highlight ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {tier.tag}
            </p>
            <div className="mt-6 flex items-baseline gap-2">
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
                {tier.unit}
              </span>
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {tier.features.map((f) => (
                <li key={f.label} className="flex items-start gap-2">
                  {f.ok ? (
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlight ? "text-blue-300" : "text-emerald-600"
                      }`}
                    />
                  ) : (
                    <X
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlight ? "text-slate-500" : "text-slate-300"
                      }`}
                    />
                  )}
                  <span
                    className={`${
                      f.ok
                        ? tier.highlight
                          ? "text-slate-100"
                          : "text-slate-800"
                        : tier.highlight
                          ? "text-slate-500"
                          : "text-slate-400"
                    }`}
                  >
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link to={tier.cta.href} data-testid={`pricing-cta-${tier.name.toLowerCase()}`}>
                <Button
                  className={`w-full rounded-md py-2.5 text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-white text-slate-900 hover:bg-slate-100"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  {tier.cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-slate-900">
          Pricing FAQs
        </h2>
        <dl className="mt-10 space-y-6">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="rounded-xl border border-slate-200 bg-white p-6"
              data-testid={`faq-${f.q.slice(0, 12).toLowerCase().replace(/\s+/g, "-")}`}
            >
              <dt className="font-display text-base font-semibold text-slate-900">
                {f.q}
              </dt>
              <dd className="mt-2 text-sm text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <CTASection
      title="Not sure which plan fits?"
      subtitle="Send us a couple of sample documents and we'll recommend the right assurance level and seat count."
    />
  </div>
);

export default Pricing;
