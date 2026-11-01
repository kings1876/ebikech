import { isValidOrderNumber } from '../../../../src/lib/order';
import { getOrder, markPaymentConfirmed } from '../../../../src/lib/stores';
import { notifyAddress, sendMail } from '../../../../src/lib/mailer';
import { paymentConfirmationNotification } from '../../../../src/utils/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];

/** Public: the customer reports a payment and uploads the receipt. Never returns order data. */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const id = form.get('id');
  const file = form.get('file');
  const note = String(form.get('note') ?? '').slice(0, 500);
  if (!isValidOrderNumber(id) || !(file instanceof File) || !file.size) return Response.json({ ok: false }, { status: 400 });
  if (file.size > MAX_BYTES || !TYPES.includes(file.type)) return Response.json({ ok: false, error: 'file' }, { status: 400 });

  const order = await getOrder(id);
  if (order && order.status === 'pending') return Response.json({ ok: false }, { status: 409 }); // payment details were not sent yet

  const mail = paymentConfirmationNotification(id, note, order?.customerEmail || '');
  const sent = await sendMail({
    to: notifyAddress('order'),
    ...mail,
    replyTo: order?.customerEmail,
    attachments: [{ filename: file.name.replace(/[^\w.\-]+/g, '_').slice(0, 80) || 'beleg', content: Buffer.from(await file.arrayBuffer()), contentType: file.type }],
  });
  if (order) await markPaymentConfirmed(id);
  if (!sent.sent && !order) return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  return Response.json({ ok: true });
}
