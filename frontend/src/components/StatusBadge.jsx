const STATUS_STYLES = {
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  Sent: "bg-blue-50 text-blue-700 border-blue-100",
  Signed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Witnessed: "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Awaiting Witness": "bg-amber-50 text-amber-700 border-amber-100",
  "Awaiting signer": "bg-amber-50 text-amber-700 border-amber-100",
  Archived: "bg-slate-100 text-slate-500 border-slate-200",
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "In progress": "bg-blue-50 text-blue-700 border-blue-100",
  Failed: "bg-rose-50 text-rose-700 border-rose-100",
};

const StatusBadge = ({ status, className = "" }) => {
  const style = STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style} ${className}`}
      data-testid={`status-badge-${status.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
};

export default StatusBadge;
