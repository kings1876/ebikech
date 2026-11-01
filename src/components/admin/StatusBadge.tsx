const STYLES: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Offen', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'payment-sent': { label: 'Zahlungsdetails gesendet', cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'payment-confirmed': { label: 'Zahlung gemeldet', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  new: { label: 'Neu', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  replied: { label: 'Beantwortet', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STYLES[status] || { label: status, cls: 'bg-slate-700 text-slate-200 border-slate-600' };
  return <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>;
}
