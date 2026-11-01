import { ALL_PRODUCTS } from '../../../src/data/products';
import { CATEGORIES } from '../../../src/data/categories';
import { Language } from '../../../src/types';
import { REPLY } from '../../../src/config/reply';
import { SITE_URL } from '../../../src/utils/site';
import { buildLocalizedUrl } from '../../../src/utils/routes';
import { isValidOrderNumber, makeEnquiryId } from '../../../src/lib/order';
import { getOrder, saveEnquiry, saveOrder, isStoreConfigured, StoredEnquiry, StoredOrder } from '../../../src/lib/stores';
import { isMailerConfigured, notifyAddress, sendMailBatch } from '../../../src/lib/mailer';
import { enquiryNotificationEmail, orderConfirmationEmail, orderNotificationEmail } from '../../../src/utils/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (s: unknown, max: number) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const text = (s: unknown, max: number) => String(s ?? '').trim().slice(0, max);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const LANGS: Language[] = ['de', 'fr', 'it'];

/**
 * One handler for every public form: contact, test-ride/consultation request and order request (formName).
 * Saves to the Reply Portal database (best effort) and emails the shop; for orders the customer also gets a confirmation
 * without bank details. Responds 503 only when neither the database nor SMTP is configured.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (body?.website) return Response.json({ ok: true }); // honeypot

  const lang: Language = LANGS.includes(body?.lang as Language) ? (body.lang as Language) : 'de';
  const name = clean(body?.name, 120);
  const email = clean(body?.email, 160);
  const phone = clean(body?.phone, 40);
  const formName = body?.formName === 'order' ? 'order' : body?.formName === 'testride' ? 'testride' : 'contact';

  if (!name || !isEmail(email) || body?.consent !== true) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  if (!isStoreConfigured() && !isMailerConfigured()) return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });

  const now = new Date().toISOString();

  // ---- order request ------------------------------------------------------------------------------
  if (formName === 'order') {
    const orderNumber = body?.orderNumber;
    if (!isValidOrderNumber(orderNumber)) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
    const address = text(body?.address, 400);
    if (!phone || address.length < 8) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

    // price and name come from the catalogue, never from the browser
    const rawItems = Array.isArray(body?.items) ? (body.items as { slug?: unknown; quantity?: unknown }[]).slice(0, 5) : [];
    const items: StoredOrder['items'] = [];
    for (const it of rawItems) {
      const p = ALL_PRODUCTS.find((x) => x.slug === it.slug);
      if (!p) continue;
      const quantity = Math.min(3, Math.max(1, Math.round(Number(it.quantity) || 1)));
      const category = CATEGORIES.find((c) => c.id === p.categoryId);
      items.push({ name: p.name, quantity, lineTotal: p.priceCHF * quantity, url: `${SITE_URL}${buildLocalizedUrl(lang, { lang, view: 'product', category, productSlug: p.slug })}` });
    }
    if (!items.length) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

    if (isStoreConfigured() && (await getOrder(orderNumber))) return Response.json({ ok: false, error: 'duplicate' }, { status: 409 });

    const order: StoredOrder = {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address,
      items,
      amountDue: items.reduce((s, i) => s + i.lineTotal, 0),
      paymentMethod: REPLY.paymentMethods[0].id,
      notes: text(body?.notes, 1000) || undefined,
      lang,
      status: 'pending',
      channel: 'email',
      createdAt: now,
    };

    let saved = false;
    try { await saveOrder(order); saved = isStoreConfigured(); } catch { /* best effort: the email below still reaches the shop */ }

    const shop = orderNotificationEmail(order);
    const customer = orderConfirmationEmail(order);
    const results = await sendMailBatch([
      { to: notifyAddress('order'), replyTo: email, ...shop },
      { to: email, replyTo: REPLY.channels.email, ...customer }, // fires for every order request
    ]);
    if (!saved && !results[0].sent) return Response.json({ ok: false, error: 'send-failed' }, { status: 502 });
    return Response.json({ ok: true, orderNumber });
  }

  // ---- contact / test-ride enquiry ----------------------------------------------------------------
  const message = text(body?.message, 4000);
  if (message.length < 10) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  const meta: Record<string, string> = {};
  if (clean(body?.subject, 80)) meta['Betreff'] = clean(body.subject, 80);
  for (const k of ['product', 'canton', 'preferredDate']) if (clean(body?.[k], 160)) meta[k === 'product' ? 'Modell' : k === 'canton' ? 'Kanton' : 'Wunschdatum'] = clean(body[k], 160);

  const enquiry: StoredEnquiry = { id: makeEnquiryId(), type: formName === 'testride' ? 'testride' : 'contact', name, email, phone: phone || undefined, message, meta, lang, status: 'new', createdAt: now };
  let saved = false;
  try { await saveEnquiry(enquiry); saved = isStoreConfigured(); } catch { /* best effort */ }
  const [sent] = await sendMailBatch([{ to: notifyAddress('contact'), replyTo: email, ...enquiryNotificationEmail(enquiry) }]);
  if (!saved && !sent.sent) return Response.json({ ok: false, error: 'send-failed' }, { status: 502 });
  return Response.json({ ok: true });
}
