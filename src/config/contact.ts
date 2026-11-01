// Business contact details shown on the contact page, footer and in schema markup.
// Leave a field empty to hide it. Fill these in before launch.
export const CONTACT = {
  /** Legal / trading name shown on the page */
  // TODO: PLACEHOLDER VALUES below are imaginary. Replace them with the real details before launch.
  businessName: 'Muster E-Bikes GmbH',
  email: 'kontakt@e-bikes-zuverkaufen.ch',
  phone: '', // hidden until a real number is added
  whatsapp: '', // international format without +, e.g. 41791234567
  address: { street: '', zip: '', city: '', country: '' }, // hidden until a real address is added
  hours: {
    de: 'Mo–Fr 09:00–18:00, Sa 09:00–16:00',
    fr: 'Lu–Ve 09:00–18:00, Sa 09:00–16:00',
    it: 'Lu–Ve 09:00–18:00, Sa 09:00–16:00',
  },
  /** Submissions are stored in the Reply Portal and emailed once SMTP_* (and the Redis database) are set in the Vercel project. */
  formEnabled: true,
};

export const hasContactDetails = () =>
  Boolean(CONTACT.email || CONTACT.phone || CONTACT.whatsapp || CONTACT.address.street || CONTACT.address.city);
