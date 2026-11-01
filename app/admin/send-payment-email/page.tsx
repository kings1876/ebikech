'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAdmin } from '../../../src/components/admin/AdminPasscodeContext';
import { REPLY } from '../../../src/config/reply';
import { money, parsePaymentDetail, paymentMethodParts, paymentTermsLines } from '../../../src/lib/order';
import type { StoredOrder } from '../../../src/lib/stores';

function Composer() {
  const { api } = useAdmin();
  const id = useSearchParams().get('id') || '';
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);
  const [methodId, setMethodId] = useState(REPLY.paymentMethods[0].id);
  const [detail, setDetail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const r = await api<{ order: StoredOrder }>(`/api/admin/orders/${encodeURIComponent(id)}/`);
      const o = r.status === 200 ? r.data.order : null;
      setOrder(o);
      if (o?.paymentDetails) {
        setMethodId(o.paymentDetails.methodId);
        setDetail(o.paymentDetails.fields.map((f) => `${f.label}: ${f.value}`).join('\n'));
      }
    })();
  }, [api, id]);

  if (order === undefined) return <p className="text-sm text-slate-400">Lädt …</p>;
  if (order === null) return <p className="text-sm text-slate-400">Bestellung nicht gefunden.</p>;

  const fields = parsePaymentDetail(detail);
  const parts = paymentMethodParts(methodId, order.amountDue, order.orderNumber, order.lang);
  const input = 'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none focus:ring-2';

  const send = async () => {
    setState('sending');
    setError('');
    const r = await api<{ error?: string }>('/api/admin/send-payment-email/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ orderNumber: order.orderNumber, methodId, detail }),
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
        <h1 className="text-2xl font-black">Zahlungsdetails senden</h1>
        <p className="text-sm text-slate-400 mt-1">
          <span className="font-mono">{order.orderNumber}</span> · {order.customerName} ({order.customerEmail}) · {money(order.amountDue)} · Sprache {order.lang}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="method" className="text-sm font-semibold block">Zahlungsart</label>
        <select id="method" value={methodId} onChange={(e) => setMethodId(e.target.value)} className={input}>
          {REPLY.paymentMethods.map((m) => (
            <option key={m.id} value={m.id}>{m.label.de}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="detail" className="text-sm font-semibold block">Zahlungsangaben einfügen</label>
        <textarea
          id="detail"
          rows={7}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder={'Kontoinhaber: …\nIBAN: CH…\nBank: …\nReferenz: ' + order.orderNumber}
          className={`${input} font-mono`}
        />
        <p className="text-xs text-slate-500">Eine Angabe pro Zeile, am besten als «Bezeichnung: Wert». Jede Zeile wird beim Kunden zu einem einzeln kopierbaren Feld.</p>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3 text-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Vorschau (Sprache des Kunden: {order.lang})</div>
        <p>{parts.opening}</p>
        {fields.length === 0 && <p className="text-slate-500">Noch keine Zahlungsangaben.</p>}
        {fields.map((f, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-slate-400 min-w-32">{f.label}</span>
            <span className="font-mono break-all">{f.value}</span>
          </div>
        ))}
        <p>{parts.closing}</p>
        <ul className="list-disc pl-5 text-slate-300 space-y-1">
          {paymentTermsLines(order.orderNumber, order.lang).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      {state === 'sent' && <p className="text-sm text-emerald-300" role="status">Gesendet. Die Bestellung ist jetzt «Zahlungsdetails gesendet». <Link className="underline" href={`/admin/orders/${encodeURIComponent(order.orderNumber)}/`}>Zur Bestellung</Link></p>}
      {state === 'error' && <p className="text-sm text-red-300" role="alert">{error}</p>}
      <button
        onClick={send}
        disabled={!fields.length || state === 'sending'}
        className="rounded-lg px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 cursor-pointer"
        style={{ background: REPLY.brand.primary }}
      >
        {state === 'sending' ? 'Wird gesendet …' : 'E-Mail an Kunden senden'}
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
