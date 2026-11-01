import { checkAdminPasscode } from '../../../../src/lib/adminAuth';
import { findMethod, isValidOrderNumber, parsePaymentDetail } from '../../../../src/lib/order';
import { getOrder, markOrderSent } from '../../../../src/lib/stores';
import { sendMail } from '../../../../src/lib/mailer';
import { paymentDetailsEmail } from '../../../../src/utils/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin: parse the pasted payment detail into fields, email them to the customer and mark the order as sent. */
export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  let body: { orderNumber?: unknown; methodId?: unknown; detail?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (!isValidOrderNumber(body.orderNumber)) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  const order = await getOrder(body.orderNumber);
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  const fields = parsePaymentDetail(String(body.detail ?? '').slice(0, 2000));
  if (!fields.length) return Response.json({ ok: false, error: 'no-details' }, { status: 400 });
  const methodId = findMethod(String(body.methodId || '')).id;

  const mail = paymentDetailsEmail(order, methodId, fields);
  const sent = await sendMail({ to: order.customerEmail, ...mail });
  if (!sent.sent) return Response.json({ ok: false, error: sent.reason || 'send-failed' }, { status: sent.reason === 'not-configured' ? 503 : 502 });
  await markOrderSent(order.orderNumber, { methodId, fields, sentAt: new Date().toISOString() });
  return Response.json({ ok: true, fields });
}
