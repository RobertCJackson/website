import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { signflowLoginUrl } from "@/lib/signflow";

/**
 * Marketing sign-in entry — credentials live in Signflow.
 * Do not accept email/password here or grant /app access.
 */
const SignIn = () => {
  const loginUrl = signflowLoginUrl();

  return (
    <div
      className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2"
      data-testid="page-signin"
    >
      <div className="flex items-center justify-center px-6 py-16 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sign in to Touch2Sign
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Continue in Signflow to access documents, verifications, and signing
            workflows.
          </p>

          <div className="mt-8 space-y-4" data-testid="signin-redirect">
            <a href={loginUrl} data-testid="signin-continue" className="block">
              <Button className="w-full rounded-md bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                Continue to Signflow
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <a
              href={loginUrl}
              data-testid="signin-sso"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <Lock className="h-4 w-4" />
              Continue with SSO (SAML)
            </a>

            <p className="text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/contact"
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Book a demo
              </Link>
              {" · "}
              <Link
                to="/pricing"
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Start a trial
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 bg-navy-grid opacity-40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo variant="light" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-300" /> UK DIATF ·
              eIDAS QES
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
              Sign, witness, and archive — with evidence you can defend.
            </h2>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Every completed document ships with an SCCR audit certificate,
              ERSD disclosure, and tamper-evident PDF.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {["eIDAS QES", "UK DIATF", "PAdES", "SCCR", "OneID"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-[11px] font-semibold text-slate-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
