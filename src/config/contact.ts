// Business contact details shown on the contact page, footer and in schema markup.
// Leave a field empty to hide it. Fill these in before launch.
export const CONTACT = {
  /** Legal / trading name shown on the page */
  businessName: '',
  email: '',
  phone: '',
  whatsapp: '', // international format without +, e.g. 41791234567
  address: { street: '', zip: '', city: '', country: 'Schweiz' },
  hours: { de: '', fr: '', it: '' }, // e.g. "Mo-Fr 09:00-18:00"
  /** The form only works once SMTP_* and CONTACT_EMAIL are set in the Vercel project. */
  formEnabled: false,
};

export const hasContactDetails = () =>
  Boolean(CONTACT.email || CONTACT.phone || CONTACT.whatsapp || CONTACT.address.street || CONTACT.address.city);
