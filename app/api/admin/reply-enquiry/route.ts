import { checkAdminPasscode } from '../../../../src/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '../../../../src/lib/stores';
import { sendMail } from '../../../../src/lib/mailer';
import { enquiryReplyEmail } from '../../../../src/utils/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin: email a reply to an enquiry and mark it as replied. */
export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  let body: { id?: unknown; reply?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  const reply = String(body.reply ?? '').trim().slice(0, 5000);
  if (typeof body.id !== 'string' || reply.length < 2) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  const enquiry = await getEnquiry(body.id);
  if (!enquiry) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });

  const sent = await sendMail({ to: enquiry.email, ...enquiryReplyEmail(enquiry, reply) });
  if (!sent.sent) return Response.json({ ok: false, error: sent.reason || 'send-failed' }, { status: sent.reason === 'not-configured' ? 503 : 502 });
  await markEnquiryReplied(enquiry.id);
  return Response.json({ ok: true });
}
