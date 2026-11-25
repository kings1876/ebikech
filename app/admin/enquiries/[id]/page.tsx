'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../../../src/components/admin/AdminPasscodeContext';
import { StatusBadge } from '../../../../src/components/admin/StatusBadge';
import { REPLY } from '../../../../src/config/reply';
import type { StoredEnquiry } from '../../../../src/lib/stores';

// the contact form stores these keys in German
const META_LABEL: Record<string, string> = { Betreff: 'Subject', Modell: 'Model', Kanton: 'Canton', Wunschdatum: 'Preferred date' };

export default function EnquiryDetail() {
  const { api } = useAdmin();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [enq, setEnq] = useState<StoredEnquiry | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const r = await api<{ enquiry: StoredEnquiry }>(`/api/admin/enquiries/${encodeURIComponent(id)}/`);
      setEnq(r.status === 200 ? r.data.enquiry : null);
    })();
  }, [api, id]);

  if (enq === undefined) return <p className="text-sm text-slate-400">Loading …</p>;
  if (enq === null) return <p className="text-sm text-slate-400">Enquiry not found. <Link className="underline" href="/admin/enquiries/">Back to list</Link></p>;

  const card = 'rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2 text-sm';
  const h = 'text-xs font-bold uppercase tracking-wide text-slate-400';
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-black">{enq.name}</h1>
        <StatusBadge status={enq.status} />
      </div>
      <section className={card}>
        <div className={h}>Contact</div>
        <a className="underline block" href={`mailto:${enq.email}`}>{enq.email}</a>
        {enq.phone && <div>{enq.phone}</div>}
        <div className="text-xs text-slate-500">{enq.id} · Language: {enq.lang} · {new Date(enq.createdAt).toLocaleString('en-GB')}</div>
        {Object.entries(enq.meta || {}).map(([k, v]) => (
          <div key={k}><span className="text-slate-400">{META_LABEL[k] || k}: </span>{v}</div>
        ))}
      </section>
      <section className={card}>
        <div className={h}>Message</div>
        <div className="whitespace-pre-line text-slate-200">{enq.message}</div>
      </section>
      <div className="flex gap-3 flex-wrap">
        <Link href={`/admin/reply-enquiry/?id=${encodeURIComponent(enq.id)}`} className="rounded-lg px-4 py-2.5 text-sm font-bold text-white" style={{ background: REPLY.brand.primary }}>
          Reply
        </Link>
        <button
          onClick={async () => {
            if (!confirm('Delete this enquiry permanently?')) return;
            await api(`/api/admin/enquiries/${encodeURIComponent(enq.id)}/`, { method: 'DELETE' });
            router.push('/admin/enquiries/');
          }}
          className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-red-300 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
