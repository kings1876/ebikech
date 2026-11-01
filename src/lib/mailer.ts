import nodemailer from 'nodemailer';
import { REPLY } from '../config/reply';

export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

export const isMailerConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

/** Where order / enquiry notifications go: env var first, then the address from the config. */
export const notifyAddress = (kind: 'contact' | 'order') =>
  (kind === 'order' ? process.env.ORDER_EMAIL : process.env.CONTACT_EMAIL) || process.env.CONTACT_EMAIL || REPLY.channels.email;

function transporter() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

/** Sends one or more messages in a single SMTP session. Never throws: returns {sent:false} when unconfigured or failing. */
export async function sendMailBatch(messages: MailOptions[]): Promise<{ sent: boolean; reason?: string }[]> {
  if (!isMailerConfigured()) return messages.map(() => ({ sent: false, reason: 'not-configured' }));
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const t = transporter();
  const out: { sent: boolean; reason?: string }[] = [];
  for (const m of messages) {
    try {
      await t.sendMail({ from, ...m });
      out.push({ sent: true });
    } catch (e) {
      out.push({ sent: false, reason: e instanceof Error ? e.message.slice(0, 120) : 'error' });
    }
  }
  return out;
}

export async function sendMail(m: MailOptions) {
  const [r] = await sendMailBatch([m]);
  return r;
}
