import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  Fingerprint,
  CheckCircle2,
  ArrowRight,
  Signature,
  Eye,
  ShieldCheck,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { fetchDashboardStats, fetchDocuments } from "@/lib/api";

const STAT_ICON = {
  documents: FileText,
  pending: Clock,
  verifications: Fingerprint,
  completed: CheckCircle2,
};

const ACTIVITY_ICON = {
  witness: ShieldCheck,
  signature: Signature,
  verification: Fingerprint,
  audit: ShieldCheck,
  view: Eye,
};

const relTime = (iso) => {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins || 1}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const AppDashboard = () => {
  const [stats, setStats] = useState({ stats: [], activity: [] });
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDashboardStats()
      .then((r) => setStats(r.data))
      .catch(() => setStats({ stats: [], activity: [] }));
    fetchDocuments()
      .then((r) => setDocuments(r.data.documents || []))
      .catch(() => setDocuments([]));
  }, []);

  return (
    <div className="space-y-8" data-testid="dashboard-page">
      {/* Welcome */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Good afternoon, James
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Here&apos;s what&apos;s waiting on Ashford Legal LLP today.
          </p>
        </div>
        <Link
          to="/app/documents"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
          data-testid="dashboard-view-all-documents"
        >
          View all documents <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.stats.map((s) => {
          const Icon = STAT_ICON[s.key] || FileText;
          return (
            <div
              key={s.key}
              className="rounded-xl border border-slate-200 bg-white p-6"
              data-testid={`stat-${s.key}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 font-display text-3xl font-bold text-slate-900">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{s.delta}</div>
            </div>
          );
        })}
      </div>

      {/* Recent documents + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h3 className="font-display text-base font-semibold text-slate-900">
              Recent documents
            </h3>
            <Link
              to="/app/documents"
              className="text-xs font-semibold text-blue-700 hover:text-blue-800"
              data-testid="dashboard-open-documents"
            >
              Open all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left" data-testid="dashboard-documents-table">
              <thead className="border-b border-slate-200 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Document</th>
                  <th className="px-6 py-3 font-semibold">ID</th>
                  <th className="px-6 py-3 font-semibold">Assurance</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {documents.slice(0, 5).map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{d.title}</div>
                      <div className="text-xs text-slate-500">{d.type}</div>
                    </td>
                    <td className="px-6 py-4 font-mono-ibm text-xs text-slate-500">
                      {d.id}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{d.assurance}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {relTime(d.updated_at)}
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                      Loading documents…
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="font-display text-base font-semibold text-slate-900">
              Activity
            </h3>
          </div>
          <ul className="divide-y divide-slate-100" data-testid="activity-feed">
            {stats.activity.map((a) => {
              const Icon = ACTIVITY_ICON[a.kind] || Signature;
              return (
                <li key={a.id} className="flex items-start gap-3 px-6 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-slate-900">
                      <span className="font-semibold">{a.actor}</span> {a.event}
                    </div>
                    <div className="mt-0.5 font-mono-ibm text-[11px] text-slate-500">
                      {a.doc} · {relTime(a.when)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
