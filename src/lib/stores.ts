import { Language } from '../types';
import { REPLY } from '../config/reply';
import { getRedis, isStoreConfigured } from './redis';
import type { PaymentField } from './order';

export { isStoreConfigured };

export type OrderStatus = 'pending' | 'payment-sent' | 'payment-confirmed';

export interface StoredOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  items: { name: string; quantity: number; lineTotal: number; url?: string }[];
  amountDue: number;
  paymentMethod: string;
  notes?: string;
  lang: Language;
  status: OrderStatus;
  channel: 'whatsapp' | 'email';
  createdAt: string;
  paymentDetails?: { methodId: string; fields: PaymentField[]; sentAt: string };
}

export interface StoredEnquiry {
  id: string;
  type: 'contact' | 'testride' | 'wholesale';
  name: string;
  email: string;
  phone?: string;
  message: string;
  meta?: Record<string, string>;
  lang: Language;
  status: 'new' | 'replied';
  createdAt: string;
}

const prefix = REPLY.orderPrefix.toLowerCase();
const ORDERS = `${prefix}:orders`;
const ENQUIRIES = `${prefix}:enquiries`;

const parse = <T,>(v: unknown): T => (typeof v === 'string' ? JSON.parse(v) : (v as T));
const newestFirst = <T extends { createdAt: string }>(a: T[]) => a.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());

// ---- orders -------------------------------------------------------------------------------------
export async function saveOrder(order: StoredOrder) {
  const r = getRedis();
  if (r) await r.hset(ORDERS, { [order.orderNumber]: JSON.stringify(order) });
}
export async function listOrders(): Promise<StoredOrder[]> {
  const r = getRedis();
  if (!r) return [];
  const all = await r.hgetall(ORDERS);
  return all ? newestFirst(Object.values(all).map((v) => parse<StoredOrder>(v))) : [];
}
export async function getOrder(orderNumber: string): Promise<StoredOrder | null> {
  const r = getRedis();
  if (!r) return null;
  const raw = await r.hget(ORDERS, orderNumber);
  return raw ? parse<StoredOrder>(raw) : null;
}
export async function markOrderSent(orderNumber: string, paymentDetails?: StoredOrder['paymentDetails']) {
  const o = await getOrder(orderNumber);
  if (!o) return;
  o.status = 'payment-sent';
  if (paymentDetails) o.paymentDetails = paymentDetails;
  await saveOrder(o);
}
export async function markPaymentConfirmed(orderNumber: string) {
  const o = await getOrder(orderNumber);
  if (!o) return;
  o.status = 'payment-confirmed';
  await saveOrder(o);
}
export async function deleteOrder(orderNumber: string) {
  const r = getRedis();
  if (r) await r.hdel(ORDERS, orderNumber);
}

// ---- enquiries ----------------------------------------------------------------------------------
export async function saveEnquiry(e: StoredEnquiry) {
  const r = getRedis();
  if (r) await r.hset(ENQUIRIES, { [e.id]: JSON.stringify(e) });
}
export async function listEnquiries(): Promise<StoredEnquiry[]> {
  const r = getRedis();
  if (!r) return [];
  const all = await r.hgetall(ENQUIRIES);
  return all ? newestFirst(Object.values(all).map((v) => parse<StoredEnquiry>(v))) : [];
}
export async function getEnquiry(id: string): Promise<StoredEnquiry | null> {
  const r = getRedis();
  if (!r) return null;
  const raw = await r.hget(ENQUIRIES, id);
  return raw ? parse<StoredEnquiry>(raw) : null;
}
export async function markEnquiryReplied(id: string) {
  const e = await getEnquiry(id);
  if (!e) return;
  e.status = 'replied';
  await saveEnquiry(e);
}
export async function deleteEnquiry(id: string) {
  const r = getRedis();
  if (r) await r.hdel(ENQUIRIES, id);
}
