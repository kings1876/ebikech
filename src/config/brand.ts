import { Language } from '../types';

// Site identity: the brand is named after the domain (e-bikes-zuverkaufen.ch).
export const DOMAIN = 'e-bikes-zuverkaufen.ch';

/** Full brand name per language */
export const SITE_NAME: Record<Language, string> = {
  de: 'E-Bikes zu verkaufen',
  fr: 'E-Bikes à vendre',
  it: 'E-Bike in vendita',
};

/** Wordmark split into a bold lead and a lighter, accent-coloured tail */
export const WORDMARK: Record<Language, { lead: string; tail: string }> = {
  de: { lead: 'E-Bikes', tail: 'zu verkaufen' },
  fr: { lead: 'E-Bikes', tail: 'à vendre' },
  it: { lead: 'E-Bike', tail: 'in vendita' },
};

export const TAGLINE: Record<Language, string> = {
  de: 'Neue E-Bikes für die Schweiz',
  fr: 'Vélos électriques neufs pour la Suisse',
  it: 'E-bike nuove per la Svizzera',
};

/** Brand colours (kept in sync with the logo assets in scripts/build-brand-assets.mjs) */
export const BRAND_COLORS = {
  accent: '#dc2626', // red-600, the Swiss red used across the UI
  dark: '#0f172a', // slate-900
};
