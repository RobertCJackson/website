import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = ({
  title = "Ready to transform how you sign?",
  subtitle = "Book a live demo with our team, or explore a sandbox account tailored to your use case.",
  primaryLabel = "Book a demo",
  primaryHref = "/contact",
  secondaryLabel = "Sign In",
  secondaryHref = "/signin",
}) => (
  <section className="relative overflow-hidden bg-slate-900" data-testid="cta-section">
    <div className="absolute inset-0 bg-navy-grid opacity-70" />
    <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Talk to sales
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-slate-300">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to={primaryHref} data-testid="cta-primary">
            <Button className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              {primaryLabel}
            </Button>
          </Link>
          <Link
            to={secondaryHref}
            className="rounded-md border border-slate-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-slate-500"
            data-testid="cta-secondary"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
