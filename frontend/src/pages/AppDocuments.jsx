import { useEffect, useState } from "react";
import { Plus, Filter, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { fetchDocuments } from "@/lib/api";

const FILTERS = ["All", "Draft", "Sent", "Signed", "Witnessed", "Archived"];

const AppDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchDocuments()
      .then((r) => setDocs(r.data.documents || []))
      .catch(() => setDocs([]));
  }, []);

  const filtered = docs.filter((d) => {
    const okFilter = filter === "All" || d.status === filter;
    const okQuery = query
      ? (d.title + d.id).toLowerCase().includes(query.toLowerCase())
      : true;
    return okFilter && okQuery;
  });

  return (
    <div className="space-y-6" data-testid="documents-page">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Documents
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {docs.length} documents across your workspace.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-md border-slate-300 text-slate-700"
            data-testid="documents-export-btn"
          >
            <Download className="mr-1.5 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            className="rounded-md bg-blue-700 text-white hover:bg-blue-800"
            data-testid="documents-new-btn"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New document
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-4">
          <div className="mr-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Filter className="h-3.5 w-3.5" /> Filter
          </div>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-testid={`filter-${f.toLowerCase()}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === f
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto w-full max-w-xs">
            <Input
              placeholder="Search title or ID…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 text-sm"
              data-testid="documents-search-input"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" data-testid="documents-table">
            <thead className="border-b-2 border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Document</th>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-6 py-3 font-semibold">Recipients</th>
                <th className="px-6 py-3 font-semibold">Assurance</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  data-testid={`doc-row-${d.id}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{d.title}</div>
                    <div className="text-xs text-slate-500">{d.type}</div>
                  </td>
                  <td className="px-6 py-4 font-mono-ibm text-xs text-slate-500">
                    {d.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {d.recipients.slice(0, 3).map((r, i) => (
                        <span
                          key={i}
                          title={r}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-[10px] font-semibold text-white ring-2 ring-white"
                        >
                          {r
                            .split("@")[0]
                            .split(/[.\-_]/)
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </span>
                      ))}
                      {d.recipients.length > 3 && (
                        <span className="text-xs text-slate-500">
                          +{d.recipients.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{d.assurance}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                      data-testid={`doc-actions-${d.id}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                    No documents match this filter.
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

export default AppDocuments;
