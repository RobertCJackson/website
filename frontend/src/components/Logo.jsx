/**
 * Touch2Sign brand mark (placeholder).
 * Shield outline + document + fingerprint arcs + straight stylus, navy/cobalt.
 * Cursor will swap this for the approved SVG when the brand kit is dropped in.
 */
export const Touch2SignMark = ({ className = "h-8 w-8", "data-testid": testId }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    data-testid={testId || "touch2sign-mark"}
    aria-label="Touch2Sign logo"
  >
    {/* Shield */}
    <path
      d="M20 2.5 L34 7 V19.5 C34 27.8 27.8 33.8 20 37.5 C12.2 33.8 6 27.8 6 19.5 V7 Z"
      fill="#0A192F"
      stroke="#0A192F"
      strokeWidth="1"
    />
    {/* Document */}
    <rect x="12" y="10" width="12" height="15" rx="1.4" fill="#FFFFFF" />
    <path
      d="M22 10 L22 13 L24 13"
      stroke="#CBD5E1"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
    <line x1="14.5" y1="14.5" x2="21" y2="14.5" stroke="#CBD5E1" strokeWidth="1" />
    <line x1="14.5" y1="17" x2="21" y2="17" stroke="#CBD5E1" strokeWidth="1" />
    <line x1="14.5" y1="19.5" x2="19" y2="19.5" stroke="#CBD5E1" strokeWidth="1" />
    {/* Fingerprint arcs */}
    <g stroke="#1D4ED8" strokeWidth="1.1" fill="none" strokeLinecap="round">
      <path d="M17 24 Q20 21 23 24" />
      <path d="M16.2 26 Q20 22 23.8 26" />
      <path d="M15.6 28 Q20 23 24.4 28" />
    </g>
    {/* Straight stylus */}
    <line
      x1="27.5"
      y1="12"
      x2="21.5"
      y2="24.5"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="27.7" cy="11.7" r="1.4" fill="#3B82F6" />
  </svg>
);

const Logo = ({ variant = "dark", showWordmark = true, className = "" }) => {
  const textColor = variant === "light" ? "text-white" : "text-slate-900";
  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid="touch2sign-logo">
      <Touch2SignMark className="h-8 w-8" />
      {showWordmark && (
        <span
          className={`font-display text-[1.15rem] font-bold tracking-tight ${textColor}`}
        >
          Touch<span className="text-blue-700">2</span>Sign
        </span>
      )}
    </div>
  );
};

export default Logo;
