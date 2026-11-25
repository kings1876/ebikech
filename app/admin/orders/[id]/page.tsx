'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../../../src/components/admin/AdminPasscodeContext';
import { StatusBadge } from '../../../../src/components/admin/StatusBadge';
import { money } from '../../../../src/lib/order';
import { REPLY } from '../../../../src/config/reply';
import type { StoredOrder } from '../../../../src/lib/stores';

export default function OrderDetail() {
  const { api } = useAdmin();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const r = await api<{ order: StoredOrder }>(`/api/admin/orders/${encodeURIComponent(id)}/`);
      setOrder(r.status === 200 ? r.data.order : null);
    })();
  }, [api, id]);

  if (order === undefined) return <p className="text-sm text-slate-400">Loading …</p>;
  if (order === null) return <p className="text-sm text-slate-400">Order not found. <Link className="underline" href="/admin/orders/">Back to list</Link></p>;

  const card = 'rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2 text-sm';
  const h = 'text-xs font-bold uppercase tracking-wide text-slate-400';

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-black font-mono">{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <section className={card}>
          <div className={h}>Customer</div>
          <div className="font-semibold">{order.customerName}</div>
          <a className="block underline" href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a>
          <div>{order.customerPhone}</div>
          {order.address && <div className="whitespace-pre-line text-slate-300">{order.address}</div>}
          <div className="text-xs text-slate-500">Language: {order.lang} · Channel: {order.channel} · {new Date(order.createdAt).toLocaleString('en-GB')}</div>
        </section>
        <section className={card}>
          <div className={h}>Payment</div>
          <div className="text-2xl font-black" style={{ color: REPLY.brand.primary }}>{money(order.amountDue)}</div>
          <div className="text-slate-300">Payment method: {order.paymentMethod}</div>
          {order.paymentDetails && (
            <div className="text-xs text-slate-400">Payment details sent on {new Date(order.paymentDetails.sentAt).toLocaleString('en-GB')}</div>
          )}
          {order.status === 'payment-confirmed' && <div className="text-xs text-emerald-300">The customer has uploaded a payment receipt.</div>}
        </section>
      </div>

      <section className={card}>
        <div className={h}>Items</div>
        {order.items.map((i, n) => (
          <div key={n} className="flex justify-between gap-3">
            <span>
              {i.quantity} × {i.url ? <a className="underline" href={i.url} target="_blank" rel="noreferrer">{i.name}</a> : i.name}
            </span>
            <span>{money(i.lineTotal)}</span>
          </div>
        ))}
        {order.notes && (
          <>
            <div className={`${h} pt-2`}>Customer notes</div>
            <div className="whitespace-pre-line text-slate-300">{order.notes}</div>
          </>
        )}
      </section>

      <div className="flex gap-3 flex-wrap">
        <Link href={`/admin/send-payment-email/?id=${encodeURIComponent(order.orderNumber)}`} className="rounded-lg px-4 py-2.5 text-sm font-bold text-white" style={{ background: REPLY.brand.primary }}>
          {order.paymentDetails ? 'Resend payment details' : 'Send payment details'}
        </Link>
        <button
          onClick={async () => {
            if (!confirm('Delete this order permanently?')) return;
            await api(`/api/admin/orders/${encodeURIComponent(order.orderNumber)}/`, { method: 'DELETE' });
            router.push('/admin/orders/');
          }}
          className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-red-300 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
