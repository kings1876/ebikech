'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAdmin } from '../../../src/components/admin/AdminPasscodeContext';
import { REPLY } from '../../../src/config/reply';
import type { StoredEnquiry } from '../../../src/lib/stores';

function Composer() {
  const { api } = useAdmin();
  const id = useSearchParams().get('id') || '';
  const [enq, setEnq] = useState<StoredEnquiry | null | undefined>(undefined);
  const [reply, setReply] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const r = await api<{ enquiry: StoredEnquiry }>(`/api/admin/enquiries/${encodeURIComponent(id)}/`);
      setEnq(r.status === 200 ? r.data.enquiry : null);
    })();
  }, [api, id]);

  if (enq === undefined) return <p className="text-sm text-slate-400">Lädt …</p>;
  if (enq === null) return <p className="text-sm text-slate-400">Anfrage nicht gefunden.</p>;

  const send = async () => {
    setState('sending');
    setError('');
    const r = await api<{ error?: string }>('/api/admin/reply-enquiry/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: enq.id, reply }),
    });
    if (r.status === 200) setState('sent');
    else {
      setState('error');
      setError(r.data.error === 'not-configured' ? 'E-Mail-Versand ist noch nicht eingerichtet (SMTP_* in Vercel).' : `Senden fehlgeschlagen (${r.data.error || r.status}).`);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black">Antwort an {enq.name}</h1>
        <p className="text-sm text-slate-400 mt-1">{enq.email} · Sprache der Anfrage: {enq.lang}</p>
      </div>
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Ursprüngliche Nachricht</div>
        <div className="whitespace-pre-line text-slate-300">{enq.message}</div>
      </section>
      <div className="space-y-2">
        <label htmlFor="reply" className="text-sm font-semibold block">Ihre Antwort</label>
        <textarea id="reply" rows={9} value={reply} onChange={(e) => setReply(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none focus:ring-2" />
        <p className="text-xs text-slate-500">Die Antwort wird als E-Mail im Shop-Design gesendet, mit der ursprünglichen Nachricht darunter.</p>
      </div>
      {state === 'sent' && <p className="text-sm text-emerald-300" role="status">Gesendet. <Link className="underline" href="/admin/enquiries/">Zur Liste</Link></p>}
      {state === 'error' && <p className="text-sm text-red-300" role="alert">{error}</p>}
      <button onClick={send} disabled={reply.trim().length < 2 || state === 'sending'} className="rounded-lg px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 cursor-pointer" style={{ background: REPLY.brand.primary }}>
        {state === 'sending' ? 'Wird gesendet …' : 'Antwort senden'}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Lädt …</p>}>
      <Composer />
    </Suspense>
  );
}
