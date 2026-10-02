/**
 * Signflow app URL helpers for signup / checkout / sign-in from the marketing site.
 *
 * Production must set REACT_APP_SIGNFLOW_URL to the Signflow origin
 * (e.g. https://signflow.icit.co.uk:4443). Never rely on a localhost default in prod.
 */

const configured = (process.env.REACT_APP_SIGNFLOW_URL || "").trim();
const isProd = process.env.NODE_ENV === "production";

function isLocalhostUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/** Dev-only localhost fallback. Empty in production when env is missing. */
export const SIGNFLOW_URL =
  configured || (isProd ? "" : "http://localhost:4001");

function assertSignflowConfigured(context) {
  if (!SIGNFLOW_URL) {
    console.error(
      `[Touch2Sign] REACT_APP_SIGNFLOW_URL is not set (${context}). Set it to the Signflow app origin in production.`,
    );
    return false;
  }
  if (isProd && isLocalhostUrl(SIGNFLOW_URL)) {
    console.error(
      `[Touch2Sign] REACT_APP_SIGNFLOW_URL must not be localhost in production (${context}). Current: ${SIGNFLOW_URL}`,
    );
    return false;
  }
  return true;
}

function signflowOrigin() {
  return SIGNFLOW_URL.replace(/\/$/, "");
}

/** Absolute path on the Signflow app (returns "#" if misconfigured in prod). */
export function signflowPath(path = "/") {
  if (!assertSignflowConfigured("app navigation")) {
    return "#";
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${signflowOrigin()}${p}`;
}

export function signflowLoginUrl() {
  return signflowPath("/login");
}

export function signupCheckoutUrl(tier, billing = "annual") {
  if (!assertSignflowConfigured("checkout")) {
    return "#";
  }
  const t = String(tier).toLowerCase();
  return `${signflowOrigin()}/login?mode=signup&plan=${encodeURIComponent(t)}&billing=${encodeURIComponent(billing)}`;
}
