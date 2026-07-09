import { ShieldCheck } from "lucide-react";

const BADGES = [
  "eIDAS QES (eID Easy)",
  "UK ECA 2000",
  "UK DIATF (OneID)",
  "PAdES embedded signatures",
  "SCCR audit reports",
];

const ComplianceStrip = ({ variant = "light" }) => {
  const isDark = variant === "dark";
  return (
    <section
      className={`${isDark ? "bg-slate-900" : "bg-slate-50"} border-y ${
        isDark ? "border-slate-800" : "border-slate-200"
      }`}
      data-testid="compliance-strip"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-8 lg:px-8">
        <div
          className={`mr-2 hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider md:flex ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Built to comply</span>
        </div>
        {BADGES.map((b) => (
          <span
            key={b}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-200"
                : "border-slate-200 bg-white text-slate-700"
            }`}
            data-testid={`compliance-badge-${b.split(" ")[0].toLowerCase()}`}
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ComplianceStrip;
