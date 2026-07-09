import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileSignature,
  Sparkles,
  Users,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronRight,
} from "lucide-react";

/**
 * Touch2Sign — Post-Payment Welcome Page (Refresh Branding)
 *
 * Design notes:
 *  - Palette: warm cream (#faf9f6) base, forest green (#2d5a27) primary,
 *    ink (#1c1a16) text, muted (#4a4540 / #9a9690), hairline borders.
 *  - Type: DM Serif Display (headline), DM Sans (body).
 *  - Editorial "quiet confirmation" tone — replaces celebratory 🎉 with a
 *    branded shield seal and small-caps eyebrow.
 *  - Standalone (no MarketingLayout / AppShell) so it lifts cleanly into
 *    the Next.js app at /billing/success. To port:
 *      1. Add 'use client' at top.
 *      2. Swap `react-router-dom` Link -> next/link.
 *      3. Replace `useLocation().search` with `useSearchParams()`.
 */

// --- Plan catalogue (keep in sync with pricing page / Stripe products) ---
const PLANS = {
  personal_monthly: {
    name: "Personal",
    cadence: "billed monthly",
    priceLabel: "£12 / month",
  },
  personal_annual: {
    name: "Personal",
    cadence: "billed annually",
    priceLabel: "£120 / year",
  },
  business_monthly: {
    name: "Business",
    cadence: "billed monthly",
    priceLabel: "£29 / seat / month",
  },
  business_annual: {
    name: "Business",
    cadence: "billed annually",
    priceLabel: "£290 / seat / year",
  },
};

const INCLUDED = [
  "Unlimited document sends",
  "Full eIDAS compliance — SES, AES, QES",
  "Sentinel AI on every signed document",
  "eWitness for UK deeds and LPAs",
  "SCCR audit trail on every signing",
];

const NEXT_STEPS = [
  {
    icon: FileSignature,
    title: "Send your first document",
    body: "Upload a PDF and route it for signature in under two minutes.",
    href: "/documents/new",
    cta: "Start a send",
  },
  {
    icon: Sparkles,
    title: "Meet Sentinel AI",
    body: "Ask questions about any signed document — risks, obligations, renewal dates.",
    href: "/sentinel",
    cta: "Open Sentinel",
  },
  {
    icon: Users,
    title: "Bring your team in",
    body: "Invite colleagues at no extra cost. Unlimited seats on Business.",
    href: "/settings/team",
    cta: "Invite team",
  },
];

// --- Brand mark: shield with sig-tick, refresh palette ---
const ShieldMark = ({ size = 44 }) => (
  <svg
    viewBox="0 0 44 44"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Touch2Sign"
    role="img"
  >
    <path
      d="M22 3 L37.5 8 V21.5 C37.5 30.6 30.6 37.2 22 41 C13.4 37.2 6.5 30.6 6.5 21.5 V8 Z"
      fill="#2d5a27"
    />
    <path
      d="M22 3 L37.5 8 V21.5 C37.5 30.6 30.6 37.2 22 41 C13.4 37.2 6.5 30.6 6.5 21.5 V8 Z"
      stroke="#1c3a17"
      strokeWidth="0.6"
    />
    <path
      d="M14 22.5 L19.5 28 L30.5 16.5"
      stroke="#faf9f6"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Sub-components ---------------------------------------------------------

const BrandLockup = () => (
  <Link
    to="/welcome"
    style={{
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
    data-testid="welcome-brand-lockup"
  >
    <ShieldMark size={28} />
    <span
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 20,
        color: "#1c1a16",
        letterSpacing: "-0.01em",
      }}
    >
      Touch2Sign
    </span>
  </Link>
);

const Seal = () => {
  // Subtle scale-in on mount for a "settled" feel (not celebratory).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <div
      style={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid rgba(28,26,22,0.08)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 32px -12px rgba(45,90,39,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 28px",
        transform: mounted ? "scale(1)" : "scale(0.92)",
        opacity: mounted ? 1 : 0,
        transition: "transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 420ms ease-out",
      }}
      aria-hidden="true"
    >
      <ShieldMark size={52} />
    </div>
  );
};

const Eyebrow = ({ children }) => (
  <div
    style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#2d5a27",
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

const IncludedCard = ({ plan }) => (
  <section
    style={{
      background: "#ffffff",
      border: "1px solid rgba(28,26,22,0.09)",
      borderRadius: 16,
      padding: "26px 28px 22px",
      boxShadow: "0 1px 2px rgba(28,26,22,0.03), 0 8px 24px -16px rgba(28,26,22,0.08)",
    }}
    aria-labelledby="included-title"
  >
    {/* Card head: plan meta */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        paddingBottom: 18,
        borderBottom: "1px solid rgba(28,26,22,0.08)",
        marginBottom: 18,
      }}
    >
      <div>
        <div
          id="included-title"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#9a9690",
            marginBottom: 6,
          }}
        >
          Your plan
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: "#1c1a16",
            lineHeight: 1.2,
          }}
        >
          {plan.name}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#4a4540",
            marginTop: 4,
          }}
        >
          {plan.cadence}
        </div>
      </div>
      <div
        style={{
          textAlign: "right",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#2d5a27",
            background: "#e8f0e6",
            border: "1px solid #c6ddc5",
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2d5a27",
              display: "inline-block",
            }}
          />
          Active
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "#4a4540",
          }}
        >
          {plan.priceLabel}
        </div>
      </div>
    </div>

    {/* Included list */}
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {INCLUDED.map((item, i) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0",
            borderBottom:
              i === INCLUDED.length - 1
                ? "none"
                : "1px dashed rgba(28,26,22,0.08)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#1c1a16",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#e8f0e6",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Check size={13} strokeWidth={2.8} color="#2d5a27" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </section>
);

const NextStepCard = ({ step }) => {
  const [hover, setHover] = useState(false);
  const Icon = step.icon;
  return (
    <Link
      to={step.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-testid={`next-step-${step.title.toLowerCase().replace(/\s+/g, "-")}`}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
        background: "#ffffff",
        border: "1px solid rgba(28,26,22,0.09)",
        borderRadius: 14,
        padding: "22px 22px 20px",
        minHeight: 190,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover
          ? "0 12px 32px -16px rgba(28,26,22,0.18)"
          : "0 1px 2px rgba(28,26,22,0.03)",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        borderColor: hover ? "rgba(45,90,39,0.35)" : "rgba(28,26,22,0.09)",
      }}
    >
      <div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#f3f1ec",
            border: "1px solid rgba(28,26,22,0.06)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: "#2d5a27",
          }}
        >
          <Icon size={19} strokeWidth={1.75} />
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 18,
            color: "#1c1a16",
            lineHeight: 1.25,
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#4a4540",
            lineHeight: 1.55,
          }}
        >
          {step.body}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: "#2d5a27",
        }}
      >
        {step.cta}
        <ChevronRight
          size={15}
          strokeWidth={2.2}
          style={{
            transform: hover ? "translateX(3px)" : "translateX(0)",
            transition: "transform 200ms ease",
          }}
        />
      </div>
    </Link>
  );
};

const TrustStrip = () => {
  const items = ["eIDAS", "SES · AES · QES", "UK ECA 2000", "SCCR audit", "GDPR"];
  return (
    <div
      style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {items.map((label) => (
        <span
          key={label}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#4a4540",
            background: "#ffffff",
            border: "1px solid rgba(28,26,22,0.08)",
            borderRadius: 999,
            padding: "6px 12px",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ShieldCheck size={12} strokeWidth={2} color="#2d5a27" />
          {label}
        </span>
      ))}
    </div>
  );
};

// --- Page -------------------------------------------------------------------

const Welcome = () => {
  const location = useLocation();
  const plan = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get("plan") || "personal_annual";
    return PLANS[key] || PLANS.personal_annual;
  }, [location.search]);

  // Inject DM Serif Display + DM Sans (safe if already present)
  useEffect(() => {
    const id = "touch2sign-welcome-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap";
    document.head.appendChild(link);
  }, []);

  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  return (
    <main
      data-testid="welcome-page"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(80% 60% at 50% -10%, #f1efe6 0%, #faf9f6 55%, #faf9f6 100%)",
        fontFamily: "'DM Sans', sans-serif",
        color: "#1c1a16",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 24px 80px",
      }}
    >
      {/* Top brand row */}
      <header
        style={{
          width: "100%",
          maxWidth: 1080,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 56,
        }}
      >
        <BrandLockup />
        <Link
          to="/signin"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#4a4540",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Not you? <span style={{ color: "#1c1a16", fontWeight: 600 }}>Switch account</span>
        </Link>
      </header>

      {/* Hero */}
      <section
        style={{
          width: "100%",
          maxWidth: 620,
          textAlign: "center",
          marginBottom: 44,
        }}
      >
        <Seal />
        <Eyebrow>Plan activated · Payment confirmed</Eyebrow>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(34px, 5vw, 44px)",
            fontWeight: 400,
            color: "#1c1a16",
            margin: "0 0 14px",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          Welcome to Touch2Sign.
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "#4a4540",
            lineHeight: 1.65,
            margin: "0 auto",
            maxWidth: 500,
          }}
        >
          Your{" "}
          <em
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              color: "#1c1a16",
              fontSize: 17,
            }}
          >
            {plan.name}
          </em>{" "}
          plan is active — everything is unlocked and ready to use. A receipt is on its
          way to your inbox.
        </p>

        {/* Primary CTAs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginTop: 32,
          }}
        >
          <Link
            to="/dashboard"
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            data-testid="welcome-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 26px",
              minWidth: 260,
              background: primaryHover ? "#264d21" : "#2d5a27",
              color: "#ffffff",
              borderRadius: 10,
              fontSize: 14.5,
              fontWeight: 600,
              letterSpacing: "0.01em",
              textDecoration: "none",
              boxShadow: primaryHover
                ? "0 12px 24px -12px rgba(45,90,39,0.55)"
                : "0 6px 16px -10px rgba(45,90,39,0.45)",
              transition: "background 180ms ease, box-shadow 180ms ease, transform 180ms ease",
              transform: primaryHover ? "translateY(-1px)" : "translateY(0)",
            }}
          >
            Open your dashboard
            <ArrowRight
              size={16}
              strokeWidth={2.2}
              style={{
                transform: primaryHover ? "translateX(3px)" : "translateX(0)",
                transition: "transform 180ms ease",
              }}
            />
          </Link>
          <Link
            to="/documents/new"
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
            data-testid="welcome-cta-secondary"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              color: secondaryHover ? "#1c1a16" : "#4a4540",
              textDecoration: "none",
              padding: "6px 4px",
              borderBottom: secondaryHover
                ? "1px solid rgba(28,26,22,0.4)"
                : "1px solid transparent",
              transition: "color 160ms ease, border-color 160ms ease",
            }}
          >
            or send your first document
          </Link>
        </div>
      </section>

      {/* Content grid */}
      <section
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <IncludedCard plan={plan} />

        {/* What's next */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 14,
              paddingLeft: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9a9690",
              }}
            >
              What's next
            </div>
            <Link
              to="/help"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#4a4540",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Help centre <ChevronRight size={13} strokeWidth={2.2} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {NEXT_STEPS.map((step) => (
              <NextStepCard key={step.title} step={step} />
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Footer meta */}
      <footer
        style={{
          marginTop: 48,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "#9a9690",
          textAlign: "center",
          lineHeight: 1.7,
        }}
      >
        Need a VAT receipt or to change your plan?{" "}
        <Link
          to="/settings/billing"
          style={{ color: "#4a4540", textDecoration: "underline" }}
        >
          Manage billing
        </Link>
        .
        <br />
        Touch2Sign Ltd · Registered in England &amp; Wales · touch2sign.com · touch2sign.co.uk
      </footer>
    </main>
  );
};

export default Welcome;
