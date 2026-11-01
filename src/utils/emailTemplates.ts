import { Language } from '../types';
import { REPLY } from '../config/reply';
import { SITE_NAME } from '../config/brand';
import { SITE_URL } from './site';
import { escapeHtml as esc, money, paymentMethodParts, paymentTermsHtml, paymentTermsLines } from '../lib/order';
import type { StoredEnquiry, StoredOrder } from '../lib/stores';

// Light emails only: white card, dark header band, brand colour as accent. Dark email bodies get force-inverted by Gmail/Zoho.
const C = { page: '#F2F4F0', card: '#FFFFFF', ink: '#1B2320', soft: '#6A746E', faint: '#9AA39D', rule: '#E2E5DF' };
const ACCENT = REPLY.brand.primary;
const HEADER = REPLY.brand.headerDark;

const label = (t: string) => `<div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${C.soft};margin:0 0 3px 0">${esc(t)}</div>`;
const field = (l: string, valueHtml: string, mb = 14) => `<div style="margin:0 0 ${mb}px 0">${label(l)}<div style="font-size:14px;color:${C.ink};line-height:1.5">${valueHtml}</div></div>`;
const divider = `<div style="height:1px;background:${C.rule};margin:18px 0"></div>`;
const callout = (inner: string) => `<div style="background:#FBF6F5;border-left:3px solid ${ACCENT};border-radius:6px;padding:12px 14px;margin:16px 0;font-size:13px;color:${C.ink}"><ul style="margin:0;padding-left:18px">${inner}</ul></div>`;
const button = (href: string, text: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${HEADER};color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:700;padding:11px 20px;border-radius:999px;margin:4px 8px 4px 0">${esc(text)} &rarr;</a>`;

function shell({ eyebrow, title, meta, body }: { eyebrow: string; title: string; meta?: string; body: string }) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${C.page}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif">
<tr><td style="background:${HEADER};padding:22px 26px">
  <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${ACCENT}">${esc(eyebrow)}</div>
  <div style="font-size:22px;font-weight:700;color:#FFFFFF;margin-top:6px">${esc(title)}</div>
  ${meta ? `<div style="font-size:12px;color:#B8BFC7;margin-top:6px">${esc(meta)}</div>` : ''}
</td></tr>
<tr><td style="height:3px;background:${ACCENT};line-height:3px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:24px 26px;color:${C.ink};font-size:14px;line-height:1.55">${body}</td></tr>
<tr><td style="background:#FAFAF8;padding:14px 26px;font-size:11px;color:${C.faint};border-top:1px solid ${C.rule}">${esc(SITE_NAME.de)} &middot; ${esc(REPLY.domain)}</td></tr>
</table></td></tr></table></body></html>`;
}

const T = {
  de: { thanks: 'Vielen Dank für Ihre Bestellanfrage', order: 'Bestellnummer', amount: 'Betrag', items: 'Ihre Auswahl', next: 'So geht es weiter', nextText: 'Wir prüfen Ihre Anfrage und senden Ihnen in Kürze eine weitere E-Mail mit den Zahlungsdetails. Bitte überweisen Sie erst nach Erhalt dieser E-Mail.', hi: 'Guten Tag', pay: 'Zahlungsdetails', view: 'Zahlungsdetails anzeigen & kopieren', paid: 'Ich habe bezahlt – Bestätigung hochladen', reply: 'Antworten', amountDue: 'Zu zahlender Betrag', question: 'Haben Sie Fragen? Antworten Sie einfach auf diese E-Mail.', yourMsg: 'Ihre Nachricht', answer: 'Antwort' },
  fr: { thanks: 'Merci pour votre demande de commande', order: 'Numéro de commande', amount: 'Montant', items: 'Votre sélection', next: 'Prochaines étapes', nextText: 'Nous examinons votre demande et vous enverrons sous peu un autre e-mail avec les détails de paiement. Veuillez ne payer qu’après avoir reçu cet e-mail.', hi: 'Bonjour', pay: 'Détails de paiement', view: 'Afficher et copier les détails de paiement', paid: 'J’ai payé – envoyer la confirmation', reply: 'Répondre', amountDue: 'Montant à payer', question: 'Des questions ? Répondez simplement à cet e-mail.', yourMsg: 'Votre message', answer: 'Réponse' },
  it: { thanks: 'Grazie per la vostra richiesta d’ordine', order: 'Numero d’ordine', amount: 'Importo', items: 'La vostra selezione', next: 'Prossimi passi', nextText: 'Esaminiamo la vostra richiesta e vi invieremo a breve un’altra e-mail con i dettagli di pagamento. Si prega di pagare solo dopo aver ricevuto quell’e-mail.', hi: 'Buongiorno', pay: 'Dettagli di pagamento', view: 'Mostra e copia i dettagli di pagamento', paid: 'Ho pagato – carica conferma', reply: 'Rispondere', amountDue: 'Importo da pagare', question: 'Domande? Rispondete semplicemente a questa e-mail.', yourMsg: 'Il vostro messaggio', answer: 'Risposta' },
} as const;

const itemsHtml = (o: StoredOrder) =>
  o.items.map((i) => `<div style="margin:0 0 4px 0">${esc(i.quantity)} &times; ${esc(i.name)} &ndash; ${esc(money(i.lineTotal))}</div>`).join('');

const dashboardUrl = (path: string) => `${SITE_URL}${path}`;

// ---- to the shop ---------------------------------------------------------------------------------
export function orderNotificationEmail(o: StoredOrder) {
  const body =
    field('Bestellnummer', esc(o.orderNumber)) +
    field('Betrag', `<strong>${esc(money(o.amountDue))}</strong>`) +
    field('Kunde', `${esc(o.customerName)}<br>${esc(o.customerEmail)}<br>${esc(o.customerPhone || '')}`) +
    (o.address ? field('Adresse', esc(o.address).replace(/\n/g, '<br>')) : '') +
    field('Artikel', itemsHtml(o)) +
    (o.notes ? field('Hinweise', esc(o.notes).replace(/\n/g, '<br>')) : '') +
    field('Sprache / Kanal', `${esc(o.lang)} / ${esc(o.channel)}`) +
    divider +
    button(dashboardUrl(`/admin/orders/${encodeURIComponent(o.orderNumber)}/`), 'Im Dashboard antworten');
  return { subject: `Neue Bestellanfrage ${o.orderNumber} – ${money(o.amountDue)}`, text: `Neue Bestellanfrage ${o.orderNumber} von ${o.customerName} (${o.customerEmail}), ${money(o.amountDue)}.`, html: shell({ eyebrow: 'Neue Bestellanfrage', title: o.orderNumber, meta: new Date(o.createdAt).toLocaleString('de-CH'), body }) };
}

export function enquiryNotificationEmail(e: StoredEnquiry) {
  const kind = e.type === 'testride' ? 'Probefahrt-/Beratungsanfrage' : e.type === 'wholesale' ? 'Händleranfrage' : 'Kontaktanfrage';
  const meta = Object.entries(e.meta || {}).map(([k, v]) => field(k, esc(v))).join('');
  const body =
    field('Name', esc(e.name)) + field('E-Mail', esc(e.email)) + (e.phone ? field('Telefon', esc(e.phone)) : '') + meta +
    field('Sprache', esc(e.lang)) + divider + field('Nachricht', esc(e.message).replace(/\n/g, '<br>'), 18) +
    button(dashboardUrl(`/admin/enquiries/${encodeURIComponent(e.id)}/`), 'Im Dashboard antworten');
  return { subject: `[${kind}] ${e.name}`, text: `${kind} von ${e.name} (${e.email}):\n\n${e.message}`, html: shell({ eyebrow: kind, title: e.name, meta: e.id, body }) };
}

export function paymentConfirmationNotification(orderNumber: string, note: string, customerEmail: string) {
  const body = field('Bestellnummer', esc(orderNumber)) + field('Kunde', esc(customerEmail)) + (note ? field('Hinweis', esc(note)) : '') +
    field('Beleg', 'Der Zahlungsbeleg ist im Anhang.') + button(dashboardUrl(`/admin/orders/${encodeURIComponent(orderNumber)}/`), 'Bestellung öffnen');
  return { subject: `Zahlungsbestätigung ${orderNumber}`, text: `Der Kunde meldet die Zahlung für ${orderNumber}.`, html: shell({ eyebrow: 'Zahlung gemeldet', title: orderNumber, body }) };
}

// ---- to the customer -----------------------------------------------------------------------------
/** Sent for every order request. Deliberately contains no bank details: those follow only after we reply from the portal. */
export function orderConfirmationEmail(o: StoredOrder) {
  const t = T[o.lang];
  const body =
    `<p style="margin:0 0 16px 0">${t.hi} ${esc(o.customerName)},</p>` +
    field(t.order, esc(o.orderNumber)) + field(t.amount, `<strong>${esc(money(o.amountDue))}</strong>`) + field(t.items, itemsHtml(o)) +
    divider + `<div style="font-weight:700;margin:0 0 6px 0">${t.next}</div><div>${t.nextText}</div>` +
    `<p style="margin:18px 0 0 0;color:${C.soft};font-size:13px">${t.question}</p>`;
  return { subject: `${t.thanks} ${o.orderNumber}`, text: `${t.thanks} ${o.orderNumber}\n\n${t.nextText}`, html: shell({ eyebrow: SITE_NAME[o.lang], title: t.thanks, meta: o.orderNumber, body }) };
}

export function paymentDetailsEmail(o: StoredOrder, methodId: string, fields: { label: string; value: string }[]) {
  const t = T[o.lang];
  const parts = paymentMethodParts(methodId, o.amountDue, o.orderNumber, o.lang);
  const detailsUrl = `${SITE_URL}/order/payment-details/?id=${encodeURIComponent(o.orderNumber)}&lang=${o.lang}`;
  const confirmUrl = `${SITE_URL}/order/confirm-payment/?id=${encodeURIComponent(o.orderNumber)}&lang=${o.lang}`;
  const body =
    `<p style="margin:0 0 16px 0">${t.hi} ${esc(o.customerName)},</p>` +
    field(t.order, esc(o.orderNumber)) + field(t.amountDue, `<strong style="font-size:18px;color:${ACCENT}">${esc(money(o.amountDue))}</strong>`) + divider +
    `<p style="margin:0 0 12px 0">${esc(parts.opening)}</p>` +
    fields.map((f) => field(f.label, `<span style="font-family:Consolas,Menlo,monospace">${esc(f.value)}</span>`, 10)).join('') +
    `<p style="margin:12px 0 0 0">${esc(parts.closing)}</p>` +
    callout(paymentTermsHtml(o.orderNumber, o.lang)) +
    button(detailsUrl, t.view) + button(confirmUrl, t.paid) + button(`mailto:${REPLY.channels.email}?subject=${encodeURIComponent(o.orderNumber)}`, t.reply);
  const text = [`${t.pay} ${o.orderNumber} – ${money(o.amountDue)}`, '', parts.opening, ...fields.map((f) => `${f.label}: ${f.value}`), parts.closing, '', ...paymentTermsLines(o.orderNumber, o.lang)].join('\n');
  return { subject: `${t.pay} ${o.orderNumber} – ${money(o.amountDue)}`, text, html: shell({ eyebrow: SITE_NAME[o.lang], title: t.pay, meta: o.orderNumber, body }) };
}

export function enquiryReplyEmail(e: StoredEnquiry, reply: string) {
  const t = T[e.lang];
  const body =
    `<p style="margin:0 0 16px 0">${t.hi} ${esc(e.name)},</p>` +
    `<div style="white-space:pre-wrap">${esc(reply)}</div>` + divider +
    field(t.yourMsg, `<span style="color:${C.soft}">${esc(e.message).replace(/\n/g, '<br>')}</span>`);
  return { subject: `${t.answer}: ${e.name}`, text: `${reply}\n\n---\n${e.message}`, html: shell({ eyebrow: SITE_NAME[e.lang], title: t.answer, meta: e.id, body }) };
}
