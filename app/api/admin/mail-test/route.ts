import { checkAdminPasscode } from '../../../../src/lib/adminAuth';
import { isMailerConfigured, notifyAddress, sendMail } from '../../../../src/lib/mailer';
import { REPLY } from '../../../../src/config/reply';
import { escapeHtml } from '../../../../src/lib/order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin: send one test email and report the exact SMTP result (no secrets in the answer). */
export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  let body: { to?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    /* default recipient */
  }
  const to = typeof body.to === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.to) ? body.to : notifyAddress('order');
  const info = {
    to,
    from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER || '',
  };
  if (!isMailerConfigured()) return Response.json({ ok: false, error: 'not-configured', ...info }, { status: 503 });
  const when = new Date().toISOString();
  const r = await sendMail({
    to,
    subject: `Test-E-Mail ${REPLY.orderPrefix}`,
    text: `Dies ist eine Test-E-Mail des Reply Portals (${when}).`,
    html: `<p>Dies ist eine Test-E-Mail des Reply Portals (${escapeHtml(when)}).</p>`,
  });
  return Response.json({ ok: r.sent, error: r.sent ? undefined : r.reason || 'send-failed', ...info }, { status: r.sent ? 200 : 502 });
}
