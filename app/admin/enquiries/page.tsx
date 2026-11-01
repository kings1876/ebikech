'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../../src/components/admin/AdminPasscodeContext';
import { StatusBadge } from '../../../src/components/admin/StatusBadge';
import type { StoredEnquiry } from '../../../src/lib/stores';

const FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'contact', label: 'Kontakt' },
  { id: 'testride', label: 'Probefahrt' },
  { id: 'new', label: 'Neu' },
  { id: 'replied', label: 'Beantwortet' },
] as const;

const TYPE_LABEL: Record<string, string> = { contact: 'Kontakt', testride: 'Probefahrt', wholesale: 'Händler' };

export default function EnquiriesPage() {
  const { api } = useAdmin();
  const [list, setList] = useState<StoredEnquiry[] | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all');

  useEffect(() => {
    (async () => {
      const r = await api<{ enquiries: StoredEnquiry[] }>('/api/admin/enquiries/');
      setList(r.data.enquiries || []);
    })();
  }, [api]);

  const shown = (list || []).filter((e) => filter === 'all' || e.status === filter || e.type === filter);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Anfragen</h1>
      <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filter">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${filter === f.id ? 'bg-white text-slate-900 border-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {list === null && <p className="text-sm text-slate-400">Lädt …</p>}
      {list && shown.length === 0 && <p className="text-sm text-slate-500">Keine Anfragen in dieser Ansicht.</p>}
      <div className="space-y-2">
        {shown.map((e) => (
          <Link key={e.id} href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 hover:border-slate-600">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{e.name} <span className="text-xs font-normal text-slate-500">· {TYPE_LABEL[e.type] || e.type} · {new Date(e.createdAt).toLocaleDateString('de-CH')}</span></div>
              <div className="text-xs text-slate-400 truncate">{e.message}</div>
            </div>
            <StatusBadge status={e.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
