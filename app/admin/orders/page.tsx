'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useAdmin } from '../../../src/components/admin/AdminPasscodeContext';
import { StatusBadge } from '../../../src/components/admin/StatusBadge';
import { money } from '../../../src/lib/order';
import type { StoredOrder } from '../../../src/lib/stores';

export default function OrdersPage() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);

  const load = useCallback(async () => {
    const r = await api<{ orders: StoredOrder[] }>('/api/admin/orders/');
    setOrders(r.data.orders || []);
  }, [api]);
  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string) => {
    if (!confirm(`Bestellung ${id} endgültig löschen?`)) return;
    await api(`/api/admin/orders/${encodeURIComponent(id)}/`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Bestellungen</h1>
      {orders === null && <p className="text-sm text-slate-400">Lädt …</p>}
      {orders?.length === 0 && <p className="text-sm text-slate-500">Noch keine Bestellungen.</p>}
      <div className="space-y-2">
        {orders?.map((o) => (
          <div key={o.orderNumber} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <Link href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="flex-1 min-w-0 hover:opacity-90">
              <div className="font-mono text-sm">{o.orderNumber}</div>
              <div className="text-xs text-slate-400 truncate">
                {o.customerName} · {o.items.map((i) => i.name).join(', ')} · {money(o.amountDue)} · {new Date(o.createdAt).toLocaleDateString('de-CH')}
              </div>
            </Link>
            <StatusBadge status={o.status} />
            <button onClick={() => remove(o.orderNumber)} className="text-xs text-slate-500 hover:text-red-300 cursor-pointer" aria-label={`Bestellung ${o.orderNumber} löschen`}>
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
