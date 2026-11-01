import { Language } from '../types';
import { BRAND_COLORS, DOMAIN, SITE_NAME } from './brand';

type L3 = Record<Language, string>;

/**
 * Everything brand/country/payment specific for the Reply Portal (orders, enquiries, emails).
 * No secrets here: SMTP credentials, the admin passcode and the database come from environment variables.
 */
export const REPLY = {
  /** Prefix of order numbers (EZV-XXXXXX) and of the database keys */
  orderPrefix: 'EZV',
  domain: DOMAIN,
  brand: {
    /** accent colour (buttons, highlights) */
    primary: BRAND_COLORS.accent,
    /** dark header band of emails and the admin shell */
    headerDark: BRAND_COLORS.dark,
  },
  currency: { code: 'CHF', symbol: 'CHF', locale: 'de-CH' },
  channels: {
    /** where order and enquiry notifications go (overridable with CONTACT_EMAIL / ORDER_EMAIL) */
    email: 'kontakt@e-bikes-zuverkaufen.ch',
    /** WhatsApp number in international format, e.g. 41791234567; empty hides every WhatsApp feature */
    whatsapp: '',
  },
  headerTagline: {
    de: 'Neue E-Bikes für die Schweiz',
    fr: 'Vélos électriques neufs pour la Suisse',
    it: 'E-bike nuove per la Svizzera',
  } as L3,
  /** Closing line of the payment terms. Deliberately makes no delivery-time promise. */
  dispatchLine: {
    de: 'Nach Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
    fr: 'Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
    it: 'Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna.',
  } as L3,
  /** Payment methods are data. The account details themselves are never stored here: the admin pastes them per order. */
  paymentMethods: [
    {
      id: 'bank-transfer',
      label: { de: 'Banküberweisung', fr: 'Virement bancaire', it: 'Bonifico bancario' } as L3,
      opening: {
        de: 'Bitte überweisen Sie {amount} per Banküberweisung auf das folgende Konto.',
        fr: 'Veuillez virer {amount} par virement bancaire sur le compte suivant.',
        it: 'Si prega di bonificare {amount} sul seguente conto.',
      } as L3,
      closing: {
        de: 'Nach der Überweisung können Sie Ihren Zahlungsbeleg über den Link unten hochladen.',
        fr: 'Après le virement, vous pouvez envoyer votre justificatif via le lien ci-dessous.',
        it: 'Dopo il bonifico potete caricare la ricevuta tramite il link qui sotto.',
      } as L3,
    },
  ],
};

export const REPLY_SITE_NAME = SITE_NAME;
