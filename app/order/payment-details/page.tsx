'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { CopyField } from '../../../src/components/CopyField';
import { REPLY } from '../../../src/config/reply';
import { SITE_NAME } from '../../../src/config/brand';
import { money } from '../../../src/lib/order';
import { Language } from '../../../src/types';

interface Details { orderNumber: string; amountDue: number; lang: Language; opening: string; closing: string; fields: { label: string; value: string }[]; terms: string[]; status: string }

const T = {
  de: { title: 'Zahlungsdetails', order: 'Bestellnummer', due: 'Zu zahlender Betrag', copy: 'Kopieren', copied: 'Kopiert', paid: 'Ich habe bezahlt – Beleg hochladen', missing: 'Zu dieser Bestellnummer liegen noch keine Zahlungsdetails vor. Bitte warten Sie auf unsere E-Mail.', loading: 'Wird geladen …' },
  fr: { title: 'Détails de paiement', order: 'Numéro de commande', due: 'Montant à payer', copy: 'Copier', copied: 'Copié', paid: 'J’ai payé – envoyer le justificatif', missing: 'Aucun détail de paiement n’est encore disponible pour ce numéro de commande. Veuillez attendre notre e-mail.', loading: 'Chargement …' },
  it: { title: 'Dettagli di pagamento', order: 'Numero d’ordine', due: 'Importo da pagare', copy: 'Copia', copied: 'Copiato', paid: 'Ho pagato – carica la ricevuta', missing: 'Per questo numero d’ordine non sono ancora disponibili dettagli di pagamento. Attendete la nostra e-mail.', loading: 'Caricamento …' },
} as const;

function View() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const qLang = params.get('lang');
  const [lang, setLang] = useState<Language>(qLang === 'fr' || qLang === 'it' ? qLang : 'de');
  const [data, setData] = useState<Details | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/order/payment-details/?id=${encodeURIComponent(id)}`);
        const j = r.ok ? ((await r.json()) as Details) : null;
        if (j) setLang(j.lang);
        setData(j);
      } catch {
        setData(null);
      }
    })();
  }, [id]);

  const t = T[lang];
  return (
    <div className="space-y-5">
      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: REPLY.brand.primary }}>{SITE_NAME[lang]}</div>
      <h1 className="text-3xl font-black tracking-tight">{t.title}</h1>
      {data === undefined && <p className="text-sm text-slate-500">{t.loading}</p>}
      {data === null && <p className="text-sm text-slate-600">{t.missing}</p>}
      {data && (
        <>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-1">
            <div className="text-xs text-slate-500">{t.order}: <span className="font-mono font-bold text-slate-900">{data.orderNumber}</span></div>
            <div className="text-xs text-slate-500">{t.due}</div>
            <div className="text-3xl font-black" style={{ color: REPLY.brand.primary }}>{money(data.amountDue)}</div>
          </div>
          <p className="text-sm text-slate-700">{data.opening}</p>
          <div className="space-y-2">
            {data.fields.map((f, i) => (
              <CopyField key={i} label={f.label} value={f.value} copyLabel={t.copy} copiedLabel={t.copied} />
            ))}
          </div>
          <p className="text-sm text-slate-700">{data.closing}</p>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            {data.terms.map((l) => (
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
