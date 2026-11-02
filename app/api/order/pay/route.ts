import { findCoin, isValidOrderNumber } from '../../../../src/lib/order';
import { getOrder } from '../../../../src/lib/stores';
import { CRYPTO } from '../../../../src/config/reply';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Public: the order number is the access token. Returns what the crypto payment page shows: the amount the customer was
 * quoted at checkout and the shop's receiving address for the coin they chose (public by nature, from src/config/reply.ts).
 */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!isValidOrderNumber(id)) return Response.json({ ok: false }, { status: 400 });
  const o = await getOrder(id);
  const coin = o && findCoin(o.paymentMethod);
  if (!o || !coin) return Response.json({ ok: false }, { status: 404 });
  return Response.json(
    {
      ok: true,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      amountDue: o.amountDue,
      lang: o.lang,
      status: o.status,
      discountPct: CRYPTO.discountPct,
      coin: { symbol: coin.symbol, label: coin.label, network: coin.network, address: coin.address },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
