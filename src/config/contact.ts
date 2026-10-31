// Business contact details shown on the contact page, footer and in schema markup.
// Leave a field empty to hide it. Fill these in before launch.
export const CONTACT = {
  /** Legal / trading name shown on the page */
  // TODO: PLACEHOLDER VALUES below are imaginary. Replace them with the real details before launch.
  businessName: 'Muster E-Bikes GmbH',
  email: 'kontakt@example.ch',
  phone: '+41 44 000 00 00',
  whatsapp: '', // international format without +, e.g. 41791234567
  address: { street: 'Musterstrasse 1', zip: '8000', city: 'Zürich', country: 'Schweiz' },
  hours: {
    de: 'Mo–Fr 09:00–18:00, Sa 09:00–16:00',
    fr: 'Lu–Ve 09:00–18:00, Sa 09:00–16:00',
    it: 'Lu–Ve 09:00–18:00, Sa 09:00–16:00',
  },
  /** The form only works once SMTP_* and CONTACT_EMAIL are set in the Vercel project. */
  formEnabled: false,
};

export const hasContactDetails = () =>
  Boolean(CONTACT.email || CONTACT.phone || CONTACT.whatsapp || CONTACT.address.street || CONTACT.address.city);
