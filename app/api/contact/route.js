import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (s, max) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (body?.website) return Response.json({ ok: true });

  const name = clean(body?.name, 120);
  const email = clean(body?.email, 160);
  const phone = clean(body?.phone, 40);
  const subject = clean(body?.subject, 80) || 'Anfrage';
  const message = String(body?.message ?? '').trim().slice(0, 4000);
  const lang = ['de', 'fr', 'it'].includes(body?.lang) ? body.lang : 'de';

  if (!name || !isEmail(email) || message.length < 10 || body?.consent !== true) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const text = [`Name: ${name}`, `E-Mail: ${email}`, phone ? `Telefon: ${phone}` : null, `Sprache: ${lang}`, '', message]
      .filter((l) => l !== null)
      .join('\n');
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <p><strong>Name:</strong> ${esc(name)}<br><strong>E-Mail:</strong> ${esc(email)}${phone ? `<br><strong>Telefon:</strong> ${esc(phone)}` : ''}<br><strong>Sprache:</strong> ${esc(lang)}</p>
      <p style="white-space:pre-wrap">${esc(message)}</p></div>`;

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Kontaktformular] ${subject} - ${name}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'send-failed' }, { status: 502 });
  }
}
