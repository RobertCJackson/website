import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitDemoRequest } from "@/lib/api";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    team_size: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Please fill in your name, work email and company.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await submitDemoRequest({
        ...form,
        team_size: form.team_size || null,
      });
      setSuccess(true);
      toast.success(data.message || "Demo request received.");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Something went wrong — please email hello@touch2sign.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="page-contact">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Book a demo
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            See Touch2Sign on your documents.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Tell us a little about your team and we&apos;ll set up a 30-minute
            walk-through — including remote deed witnessing on a sample TR1 if
            that&apos;s useful.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {success ? (
              <div
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
                data-testid="demo-success-panel"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
                  Thanks — we&apos;ll be in touch.
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  A member of our team will reach out shortly to schedule your
                  Touch2Sign demo. In the meantime, feel free to explore our{" "}
                  <a href="/features" className="font-semibold text-blue-700">
                    features
                  </a>{" "}
                  and{" "}
                  <a href="/security" className="font-semibold text-blue-700">
                    security posture
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                data-testid="demo-form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name*</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Ada Lovelace"
                      className="mt-1.5"
                      data-testid="demo-form-name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Work email*</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="ada@company.co.uk"
                      className="mt-1.5"
                      data-testid="demo-form-email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company*</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={handleChange("company")}
                      placeholder="Ashford Legal LLP"
                      className="mt-1.5"
                      data-testid="demo-form-company"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="team_size">Team size</Label>
                    <Select
                      value={form.team_size}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, team_size: v }))
                      }
                    >
                      <SelectTrigger
                        id="team_size"
                        className="mt-1.5"
                        data-testid="demo-form-team-size"
                      >
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_SIZES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+44 20 7000 0000"
                      className="mt-1.5"
                      data-testid="demo-form-phone"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange("message")}
                      placeholder="Tell us what you'd like to see — deed witnessing, HR onboarding, integrations…"
                      rows={4}
                      className="mt-1.5"
                      data-testid="demo-form-message"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <p className="text-xs text-slate-500">
                    By submitting you agree to our privacy policy. We&apos;ll
                    respond within one working day.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-md bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-70"
                    data-testid="demo-form-submit"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </span>
                    ) : (
                      "Book my demo"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Talk to a human.
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Prefer email or a quick call? Our team responds within one
                working day.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">Email</div>
                    <a
                      href="mailto:hello@touch2sign.com"
                      className="text-slate-600 hover:text-blue-700"
                    >
                      hello@touch2sign.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">Sales</div>
                    <span className="text-slate-600">+44 20 7946 0000</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">
                      Registered office
                    </div>
                    <span className="text-slate-600">
                      Touch2Sign Ltd, London EC2A, United Kingdom
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
                <div className="font-mono-ibm text-slate-500">
                  eIDAS QES · UK ECA 2000 · UK DIATF · PAdES · SCCR
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
