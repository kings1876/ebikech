import { isValidOrderNumber, paymentMethodParts, paymentTermsLines } from '../../../../src/lib/order';
import { getOrder } from '../../../../src/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public: the order number is the access token. Only returns what the customer's own payment email already contained. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!isValidOrderNumber(id)) return Response.json({ ok: false }, { status: 400 });
  const o = await getOrder(id);
  if (!o || !o.paymentDetails) return Response.json({ ok: false }, { status: 404 });
  const parts = paymentMethodParts(o.paymentDetails.methodId, o.amountDue, o.orderNumber, o.lang);
  return Response.json({
    ok: true,
    orderNumber: o.orderNumber,
    amountDue: o.amountDue,
    lang: o.lang,
    opening: parts.opening,
    closing: parts.closing,
    fields: o.paymentDetails.fields,
    terms: paymentTermsLines(o.orderNumber, o.lang),
    status: o.status,
  });
}
