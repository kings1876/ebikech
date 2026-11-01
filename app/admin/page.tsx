'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../src/components/admin/AdminPasscodeContext';
import { StatusBadge } from '../../src/components/admin/StatusBadge';
import { money } from '../../src/lib/order';
import type { StoredEnquiry, StoredOrder } from '../../src/lib/stores';

export default function AdminHome() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [storeConfigured, setStoreConfigured] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [o, e] = await Promise.all([
        api<{ orders: StoredOrder[]; storeConfigured: boolean }>('/api/admin/orders/'),
        api<{ enquiries: StoredEnquiry[] }>('/api/admin/enquiries/'),
      ]);
      setOrders(o.data.orders || []);
      setEnquiries(e.data.enquiries || []);
      setStoreConfigured(o.data.storeConfigured !== false);
      setLoaded(true);
    })();
  }, [api]);

  const pending = orders.filter((o) => o.status === 'pending').length;
  const fresh = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black">Dashboard</h1>

      {loaded && !storeConfigured && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          Die Datenbank ist noch nicht verbunden. Anfragen und Bestellungen werden per E-Mail zugestellt, erscheinen hier aber erst, wenn in Vercel unter
          Storage eine Upstash-Redis-Datenbank mit dem Projekt verbunden ist.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/orders/" className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-600">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Bestellungen</div>
          <div className="text-4xl font-black mt-1">{loaded ? orders.length : '–'}</div>
          <div className="text-sm text-amber-300 mt-1">{loaded ? `${pending} offen` : ''}</div>
        </Link>
        <Link href="/admin/enquiries/" className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-600">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Anfragen</div>
          <div className="text-4xl font-black mt-1">{loaded ? enquiries.length : '–'}</div>
          <div className="text-sm text-amber-300 mt-1">{loaded ? `${fresh} neu` : ''}</div>
        </Link>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Neueste Bestellungen</h2>
        {orders.slice(0, 5).map((o) => (
          <Link key={o.orderNumber} href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 hover:border-slate-600">
            <div>
              <div className="font-mono text-sm">{o.orderNumber}</div>
              <div className="text-xs text-slate-400">{o.customerName} · {money(o.amountDue)}</div>
            </div>
            <StatusBadge status={o.status} />
          </Link>
        ))}
        {loaded && orders.length === 0 && <p className="text-sm text-slate-500">Noch keine Bestellungen.</p>}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Neueste Anfragen</h2>
        {enquiries.slice(0, 5).map((e) => (
          <Link key={e.id} href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 hover:border-slate-600">
            <div className="min-w-0">
              <div className="text-sm font-semibold">{e.name}</div>
              <div className="text-xs text-slate-400 truncate">{e.message}</div>
            </div>
            <StatusBadge status={e.status} />
          </Link>
        ))}
        {loaded && enquiries.length === 0 && <p className="text-sm text-slate-500">Noch keine Anfragen.</p>}
      </section>
    </div>
  );
}
