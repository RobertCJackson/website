import { ArrowUpRight } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, badge, href, testId }) => {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="t2s-feature-card group block h-full rounded-xl border border-slate-200 bg-white p-8"
      data-testid={testId}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </div>
        {badge && (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
      {href && (
        <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-700 group-hover:text-blue-800">
          Learn more <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      )}
    </Wrapper>
  );
};

export default FeatureCard;
