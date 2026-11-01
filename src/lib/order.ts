import { Language } from '../types';
import { REPLY } from '../config/reply';

// ---- order numbers --------------------------------------------------------------------------------
/** Order number minted in the browser before submit, so the same number appears in the email and the dashboard. */
export function makeOrderNumber(prefix: string = REPLY.orderPrefix): string {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  // no 0/O/1/I/L: can be read over the phone or off a screenshot without confusion
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? Array.from(crypto.getRandomValues(new Uint8Array(2)))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (const b of bytes) r += alphabet[b % alphabet.length];
  return `${prefix}-${t}${r}`;
}

export const ORDER_NUMBER_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`);
export const isValidOrderNumber = (s: unknown): s is string => typeof s === 'string' && ORDER_NUMBER_RE.test(s);

export function makeEnquiryId(): string {
  return `ENQ-${(Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase()}`;
}

// ---- money ----------------------------------------------------------------------------------------
export function money(amount: number): string {
  const n = new Intl.NumberFormat(REPLY.currency.locale, { maximumFractionDigits: 0 }).format(Math.round(amount));
  return `${REPLY.currency.symbol} ${n}`;
}

// ---- payment details: one pasted blob, split into copyable fields -----------------------------------
export interface PaymentField { label: string; value: string }

const KNOWN_LABELS = [
  'account name', 'account number', 'sort code', 'bank name', 'branch code', 'routing number',
  'beneficiary name', 'beneficiary', 'swift code', 'swift', 'bic code', 'bic', 'iban',
  'wallet address', 'wallet', 'network', 'memo', 'destination tag', 'tag', 'paypal email', 'paypal.me',
  'paypal', 'payment link', 'reference',
  // German / French / Italian labels used for Swiss bank details
  'kontoinhaber', 'empfänger', 'bank', 'zahlungsreferenz', 'referenz', 'titulaire', 'banque', 'référence',
  'intestatario', 'banca', 'riferimento',
].sort((a, b) => b.length - a.length);

const LABEL_PATTERN = new RegExp(`^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`, 'i');
const titleCase = (s: string) => s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

/**
 * 1. "Label: value" on a line (any label works, so a new payment rail needs no code change)
 * 2. no colon, but the line starts with a known label word
 * 3. otherwise the whole line becomes one field called "Detail"
 */
export function parsePaymentDetail(text: string): PaymentField[] {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const colon = line.indexOf(':');
    if (colon > 0 && colon < line.length - 1) return { label: line.slice(0, colon).trim(), value: line.slice(colon + 1).trim() };
    const m = line.match(LABEL_PATTERN);
    if (m) return { label: titleCase(m[1]), value: m[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

// ---- payment methods and terms -------------------------------------------------------------------
export const findMethod = (id: string) => REPLY.paymentMethods.find((m) => m.id === id) || REPLY.paymentMethods[0];

const fill = (tpl: string, vars: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

export function paymentMethodParts(methodId: string, amount: number, ref: string, lang: Language) {
  const m = findMethod(methodId);
  const vars = { amount: money(amount), ref };
  return { label: m.label[lang], opening: fill(m.opening[lang], vars), closing: fill(m.closing[lang], vars) };
}

const TERMS: Record<Language, (ref: string) => string[]> = {
  de: (ref) => [
    'Die Bestellung ist erst nach Zahlungseingang verbindlich bestätigt.',
    `Verwenden Sie als Zahlungsreferenz die Bestellnummer ${ref}.`,
    REPLY.dispatchLine.de,
  ],
  fr: (ref) => [
    'La commande n’est confirmée de façon définitive qu’après réception du paiement.',
    `Indiquez le numéro de commande ${ref} comme référence de paiement.`,
    REPLY.dispatchLine.fr,
  ],
  it: (ref) => [
    'L’ordine è confermato in modo definitivo solo dopo il ricevimento del pagamento.',
    `Indicare il numero d’ordine ${ref} come riferimento del pagamento.`,
    REPLY.dispatchLine.it,
  ],
};

/** One source for the email, the customer page and the admin preview, so they can never drift apart. */
export const paymentTermsLines = (ref: string, lang: Language) => TERMS[lang](ref);

export const escapeHtml = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export const paymentTermsHtml = (ref: string, lang: Language) =>
  paymentTermsLines(ref, lang).map((l) => `<li style="margin:0 0 6px 0">${escapeHtml(l)}</li>`).join('');
