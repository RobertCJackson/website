/** Signflow app URL for signup / checkout from marketing site */
export const SIGNFLOW_URL =
  process.env.REACT_APP_SIGNFLOW_URL || "http://localhost:4001";

export function signupCheckoutUrl(tier, billing = "annual") {
  const t = String(tier).toLowerCase();
  return `${SIGNFLOW_URL.replace(/\/$/, "")}/login?mode=signup&plan=${encodeURIComponent(t)}&billing=${encodeURIComponent(billing)}`;
}
