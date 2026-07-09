import { useEffect, useState } from "react";
import { Fingerprint, Plus, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { fetchVerifications } from "@/lib/api";

const ASSURANCE_COLOR = {
  Low: "text-slate-600",
  Medium: "text-blue-700",
  High: "text-emerald-700",
};

const AppVerification = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchVerifications()
      .then((r) => setItems(r.data.verifications || []))
      .catch(() => setItems([]));
  }, []);

  const passRate = items.length
    ? Math.round(
        (items.filter((i) => i.status === "Verified").length / items.length) * 100,
      )
    : 0;

  return (
    <div className="space-y-6" data-testid="verification-page">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Identity verification
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            UK DIATF-certified checks via OneID. Sealed into every SCCR audit
            certificate.
          </p>
        </div>
        <Button
          className="rounded-md bg-blue-700 text-white hover:bg-blue-800"
          data-testid="new-verification-btn"
        >
          <Plus className="mr-1.5 h-4 w-4" /> New verification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total checks
          </div>
          <div className="mt-3 font-display text-3xl font-bold text-slate-900">
            {items.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">Last 30 days</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Pass rate
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="font-display text-3xl font-bold text-slate-900">
              {passRate}%
            </div>
            <div className="text-xs font-semibold text-emerald-700">Healthy</div>
          </div>
          <div className="mt-1 text-xs text-slate-500">DIATF Medium baseline</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Providers
          </div>
          <div className="mt-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-700" />
            <span className="font-display text-lg font-semibold text-slate-900">
              OneID
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500">UK DIATF · Medium &amp; High</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="font-display text-base font-semibold text-slate-900">
            Recent verifications
          </h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
            data-testid="refresh-verifications"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" data-testid="verifications-table">
            <thead className="border-b-2 border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Signer</th>
                <th className="px-6 py-3 font-semibold">Method</th>
                <th className="px-6 py-3 font-semibold">Assurance</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Ref</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {items.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  data-testid={`ver-row-${v.id}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{v.signer}</div>
                    <div className="text-xs text-slate-500">{v.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-slate-400" />
                      {v.method}
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-semibold ${ASSURANCE_COLOR[v.assurance] || "text-slate-700"}`}>
                    {v.assurance}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-6 py-4 font-mono-ibm text-xs text-slate-500">
                    {v.id}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                    Loading verifications…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppVerification;
