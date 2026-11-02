'use client';

import { useSyncExternalStore } from 'react';

/** The shopping cart: product slugs with a quantity, kept in this browser (localStorage) and shared by every component. */
export interface CartLine { slug: string; quantity: number }

/** Matches what the order endpoint accepts: at most 5 different bikes, 3 of each. */
export const MAX_LINES = 5;
export const MAX_QTY = 3;

const KEY = 'ebike-cart';
const EMPTY: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || '[]');
    if (Array.isArray(raw)) {
      lines = raw
        .filter((l) => l && typeof l.slug === 'string')
        .slice(0, MAX_LINES)
        .map((l) => ({ slug: l.slug, quantity: Math.min(MAX_QTY, Math.max(1, Math.round(Number(l.quantity) || 1))) }));
    }
  } catch {
    // storage unavailable or damaged: start with an empty cart
  }
}

function commit(next: CartLine[]) {
  lines = next.length ? next : EMPTY;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // the cart still works for this visit
  }
  listeners.forEach((l) => l());
}

export const cart = {
  add(slug: string, quantity = 1) {
    load();
    const found = lines.find((l) => l.slug === slug);
    if (found) commit(lines.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l)));
    else if (lines.length < MAX_LINES) commit([...lines, { slug, quantity: Math.min(MAX_QTY, quantity) }]);
  },
  setQuantity(slug: string, quantity: number) {
    load();
    if (quantity <= 0) return this.remove(slug);
    commit(lines.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)));
  },
  remove(slug: string) {
    load();
    commit(lines.filter((l) => l.slug !== slug));
  },
  clear() {
    load();
    commit([]);
  },
  isFull() {
    load();
    return lines.length >= MAX_LINES;
  },
};

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      cb();
    }
  };
  window.addEventListener('storage', onStorage); // another tab changed the cart
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

/** The cart lines. Empty on the server and during hydration, the stored cart right after. */
export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, () => { load(); return lines; }, () => EMPTY);
}
