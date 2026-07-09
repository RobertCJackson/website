import { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { fetchDocuments } from "@/lib/api";

const COLUMNS = [
  { key: "Draft", title: "Draft", tone: "border-slate-200" },
  { key: "Sent", title: "Awaiting signer", tone: "border-blue-200" },
  { key: "Awaiting Witness", title: "Awaiting witness", tone: "border-amber-200" },
  { key: "Signed", title: "Signed", tone: "border-emerald-200" },
  { key: "Witnessed", title: "Witnessed", tone: "border-indigo-200" },
];

const AppSignatures = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchDocuments()
      .then((r) => setDocs(r.data.documents || []))
      .catch(() => setDocs([]));
  }, []);

  const grouped = COLUMNS.reduce((acc, c) => {
    acc[c.key] = docs.filter((d) => d.status === c.key);
    return acc;
  }, {});

  return (
    <div className="space-y-6" data-testid="signatures-page">
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Signatures &amp; workflows
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Track every document through draft, signing, witnessing, and archive.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className={`flex flex-col rounded-xl border ${col.tone} bg-white`}
            data-testid={`kanban-col-${col.key.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <h3 className="font-display text-sm font-semibold text-slate-900">
                {col.title}
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {grouped[col.key]?.length || 0}
              </span>
            </div>
            <div className="flex-1 space-y-3 p-4">
              {(grouped[col.key] || []).map((d) => (
                <div
                  key={d.id}
                  className="cursor-grab rounded-lg border border-slate-200 bg-white p-3 transition-shadow hover:shadow-sm"
                  data-testid={`kanban-card-${d.id}`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono-ibm text-slate-500">{d.id}</span>
                    <GripVertical className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div className="mt-1 text-sm font-medium leading-snug text-slate-900">
                    {d.title}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <StatusBadge status={d.status} />
                    <span className="text-[11px] text-slate-500">{d.assurance}</span>
                  </div>
                </div>
              ))}
              {(grouped[col.key] || []).length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  Nothing here.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSignatures;
