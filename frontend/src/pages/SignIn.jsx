import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder auth — Cursor will hook up the real login flow. For now
    // we jump straight into the branded app shell.
    navigate("/app");
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2" data-testid="page-signin">
      <div className="flex items-center justify-center px-6 py-16 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sign in to Touch2Sign
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Access your documents, verifications, and signing workflows.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-5"
            data-testid="signin-form"
          >
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@company.co.uk"
                className="mt-1.5"
                data-testid="signin-email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-xs font-medium text-blue-700 hover:text-blue-800"
                  data-testid="signin-forgot"
                >
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="mt-1.5"
                data-testid="signin-password"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <Checkbox
                checked={remember}
                onCheckedChange={(v) => setRemember(Boolean(v))}
                data-testid="signin-remember"
              />
              Keep me signed in on this device
            </label>

            <Button
              type="submit"
              className="w-full rounded-md bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              data-testid="signin-submit"
            >
              Sign in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs uppercase tracking-wider text-slate-400">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
              data-testid="signin-sso"
              onClick={() => navigate("/app")}
            >
              <Lock className="h-4 w-4" />
              Continue with SSO (SAML)
            </button>

            <p className="text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link to="/contact" className="font-semibold text-blue-700 hover:text-blue-800">
                Book a demo
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 bg-navy-grid opacity-40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo variant="light" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-300" /> UK DIATF · eIDAS QES
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
