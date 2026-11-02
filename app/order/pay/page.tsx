'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { CopyField } from '../../../src/components/CopyField';
import { CRYPTO, REPLY } from '../../../src/config/reply';
import { SITE_NAME } from '../../../src/config/brand';
import { findCoin, money } from '../../../src/lib/order';
import { Language } from '../../../src/types';

interface PayData {
  orderNumber: string;
  customerName: string;
  amountDue: number;
  lang: Language;
  discountPct: number;
  coin: { symbol: string; label: string; network: string; address: string };
}

const T = {
  de: {
    title: 'Mit Kryptowährung bezahlen', order: 'Bestellnummer', due: 'Zu zahlender Betrag', loading: 'Wird geladen …',
    discount: (p: number) => `${p} % Krypto-Rabatt ist bereits abgezogen. Senden Sie den Gegenwert dieses Frankenbetrags in {coin} zum Kurs bei Ihrer Zahlung.`,
    hi: (n: string) => `Guten Tag ${n}, senden Sie Ihre Zahlung an diese Adresse:`, addr: (c: string, n: string) => `Unsere ${c}-Adresse · ${n}`,
    check: (a: string, b: string, c: string) => `Prüfen Sie, dass sie mit ${a} beginnt und mit ${b} endet. Senden Sie nur ${c} über dieses Netzwerk; andere Coins oder Netzwerke gehen verloren.`,
    showQr: 'QR-Code anzeigen', hideQr: 'QR-Code ausblenden', qrAlt: (c: string) => `QR-Code unserer ${c}-Adresse`, generating: 'Wird erstellt …',
    terms: (id: string) => [`Nennen Sie die Bestellnummer ${id} im Zahlungshinweis, sofern Ihr Wallet das zulässt.`, 'Nach dem Senden tippen Sie auf «Ich habe bezahlt» und laden einen Screenshot oder die Transaktions-ID hoch.', REPLY.dispatchLine.de],
    paid: 'Ich habe bezahlt', copy: 'Kopieren', copied: 'Kopiert',
    missing: 'Zu dieser Bestellnummer gibt es keine Krypto-Zahlung. Bitte schreiben Sie uns mit Ihrer Bestellnummer an',
  },
  fr: {
    title: 'Payer en cryptomonnaie', order: 'Numéro de commande', due: 'Montant à payer', loading: 'Chargement …',
    discount: (p: number) => `La remise crypto de ${p} % est déjà déduite. Envoyez l’équivalent de ce montant en francs en {coin}, au cours du moment du paiement.`,
    hi: (n: string) => `Bonjour ${n}, envoyez votre paiement à cette adresse :`, addr: (c: string, n: string) => `Notre adresse ${c} · ${n}`,
    check: (a: string, b: string, c: string) => `Vérifiez qu’elle commence par ${a} et se termine par ${b}. N’envoyez que du ${c} sur ce réseau ; d’autres coins ou réseaux seraient perdus.`,
    showQr: 'Afficher le code QR', hideQr: 'Masquer le code QR', qrAlt: (c: string) => `Code QR de notre adresse ${c}`, generating: 'Création …',
    terms: (id: string) => [`Indiquez le numéro de commande ${id} dans la note de paiement si votre wallet le permet.`, 'Après l’envoi, touchez « J’ai payé » et envoyez une capture d’écran ou l’ID de transaction.', REPLY.dispatchLine.fr],
    paid: 'J’ai payé', copy: 'Copier', copied: 'Copié',
    missing: 'Aucun paiement crypto n’existe pour ce numéro de commande. Veuillez nous écrire avec votre numéro de commande à',
  },
  it: {
    title: 'Pagare in criptovaluta', order: 'Numero d’ordine', due: 'Importo da pagare', loading: 'Caricamento …',
    discount: (p: number) => `Lo sconto crypto del ${p}% è già detratto. Inviate il controvalore di questo importo in franchi in {coin}, al cambio del momento del pagamento.`,
    hi: (n: string) => `Buongiorno ${n}, inviate il pagamento a questo indirizzo:`, addr: (c: string, n: string) => `Il nostro indirizzo ${c} · ${n}`,
    check: (a: string, b: string, c: string) => `Verificate che inizi con ${a} e finisca con ${b}. Inviate solo ${c} su questa rete; altre monete o reti andrebbero perse.`,
    showQr: 'Mostra codice QR', hideQr: 'Nascondi codice QR', qrAlt: (c: string) => `Codice QR del nostro indirizzo ${c}`, generating: 'Creazione …',
    terms: (id: string) => [`Indicate il numero d’ordine ${id} nella nota di pagamento se il vostro wallet lo permette.`, 'Dopo l’invio toccate «Ho pagato» e caricate uno screenshot o l’ID della transazione.', REPLY.dispatchLine.it],
    paid: 'Ho pagato', copy: 'Copia', copied: 'Copiato',
    missing: 'Per questo numero d’ordine non esiste un pagamento crypto. Scriveteci con il numero d’ordine a',
  },
} as const;

type Saved = { methodId: string; amountDue: number; customerName: string; lang: Language };

function View() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const qLang = params.get('lang');
  const [lang, setLang] = useState<Language>(qLang === 'fr' || qLang === 'it' ? qLang : 'de');
  const [data, setData] = useState<PayData | null | undefined>(undefined);
  const [showQr, setShowQr] = useState(true);
  const [qr, setQr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/order/pay/?id=${encodeURIComponent(id)}`);
        if (r.ok) {
          const j = (await r.json()) as PayData;
          setLang(j.lang);
          setData(j);
          return;
        }
      } catch {
        // fall through to the copy saved by the checkout in this browser
      }
      // The order database may be unavailable: show what checkout saved here, with the address from the site configuration.
      try {
        const s = JSON.parse(sessionStorage.getItem(`pay:${id}`) || 'null') as Saved | null;
        const coin = s && findCoin(s.methodId);
        if (s && coin) {
          setLang(s.lang);
          setData({ orderNumber: id, customerName: s.customerName, amountDue: s.amountDue, lang: s.lang, discountPct: CRYPTO.discountPct, coin: { symbol: coin.symbol, label: coin.label, network: coin.network, address: coin.address } });
          return;
        }
      } catch {
        // ignore
      }
      setData(null);
    })();
  }, [id]);

  const address = data?.coin.address;
  useEffect(() => {
    if (!showQr || !address || qr) return;
    // loaded on demand so the QR library is not part of any other page
    import('qrcode').then((m) => m.toDataURL(address, { margin: 1, width: 240, errorCorrectionLevel: 'M' })).then(setQr).catch(() => setQr(''));
  }, [showQr, address, qr]);

  const t = T[lang];
  return (
    <div className="space-y-5">
      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: REPLY.brand.primary }}>{SITE_NAME[lang]}</div>
      <h1 className="text-3xl font-black tracking-tight">{t.title}</h1>
      {data === undefined && <p className="text-sm text-slate-500">{t.loading}</p>}
      {data === null && (
        <p className="text-sm text-slate-600">
          {t.missing} <a className="underline" href={`mailto:${REPLY.channels.email}`}>{REPLY.channels.email}</a>.
        </p>
      )}
      {data && address && (
        <>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-1">
            <div className="text-xs text-slate-500">{t.order}: <span className="font-mono font-bold text-slate-900">{data.orderNumber}</span> · {data.coin.label}</div>
            <div className="text-xs text-slate-500">{t.due}</div>
            <div className="text-3xl font-black" style={{ color: REPLY.brand.primary }}>{money(data.amountDue)}</div>
            {data.discountPct > 0 && <p className="text-xs text-slate-500 pt-1">{t.discount(data.discountPct).replace('{coin}', data.coin.symbol)}</p>}
          </div>
          {data.customerName && <p className="text-sm text-slate-700">{t.hi(data.customerName)}</p>}
          <CopyField label={t.addr(data.coin.symbol, data.coin.network)} value={address} copyLabel={t.copy} copiedLabel={t.copied} />
          <p className="text-xs text-slate-600">{t.check(address.slice(0, 6), address.slice(-6), data.coin.symbol)}</p>
          <button
            type="button"
            onClick={() => setShowQr((v) => !v)}
            aria-expanded={showQr}
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold min-h-11 hover:border-slate-500"
          >
            {showQr ? t.hideQr : t.showQr}
          </button>
          {showQr && (
            <div className="inline-block rounded-2xl bg-white border border-slate-200 p-4">
              {qr ? <img src={qr} width={240} height={240} alt={t.qrAlt(data.coin.symbol)} /> : <p className="w-60 h-60 flex items-center justify-center text-sm text-slate-500">{t.generating}</p>}
            </div>
          )}
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            {t.terms(data.orderNumber).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <Link href={`/order/confirm-payment/?id=${encodeURIComponent(data.orderNumber)}&lang=${lang}`} className="inline-flex items-center rounded-full px-5 py-3 text-sm font-bold text-white min-h-11" style={{ background: REPLY.brand.headerDark }}>
            {t.paid}
          </Link>
        </>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <View />
    </Suspense>
  );
}
