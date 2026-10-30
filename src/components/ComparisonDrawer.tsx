import { Product, Language } from '../types';
import { BRANDS } from '../data/brands';
import { I18N } from '../data/i18n';
import { X, SlidersHorizontal, Calendar } from 'lucide-react';

interface ComparisonDrawerProps {
  comparedProducts: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookTestRide: (product: Product) => void;
}

export function ComparisonDrawer({
  comparedProducts,
  onRemove,
  onClear,
  isOpen,
  onClose,
  lang,
  onBookTestRide,
}: ComparisonDrawerProps) {
  if (comparedProducts.length === 0) return null;

  const t = I18N[lang].compare;
  const tFilter = I18N[lang].filter;

  return (
    <>
      {/* Floating Bottom Bar (visible when bikes are selected) */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-3 px-4 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center">
              {comparedProducts.length}
            </span>
            <div className="text-xs">
              <span className="font-bold">{t.modelsCount}</span>
              <span className="text-slate-400 block text-[10px]">{t.maxFour}</span>
            </div>
          </div>

          <div className="flex -space-x-2 overflow-hidden px-1">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-300"
                title={p.name}
              >
                {p.brandId.slice(0, 2).toUpperCase()}
              </div>
            ))}
          </div>

          <button
            onClick={() => onClose()} // toggle handled by parent
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            {t.viewCompare}
          </button>
        </div>
      )}

      {/* Full Comparison Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-red-500" />
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight">
                    {t.modalTitle} ({comparedProducts.length}/4)
                  </h2>
                  <p className="text-xs text-slate-400">
                    {t.modalSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClear}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.clearAll}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table Grid */}
            <div className="p-4 sm:p-6 overflow-x-auto flex-1 divide-y divide-slate-100">
              <table className="w-full min-w-[700px] border-collapse text-xs">
                <thead>
                  <tr className="align-top border-b border-slate-200">
                    <th className="w-44 p-3 text-left font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                      {lang === 'fr' ? 'Modèle' : lang === 'it' ? 'Modello' : 'Modell'}
                    </th>
                    {comparedProducts.map((p) => {
                      const brand = BRANDS.find((b) => b.id === p.brandId);
                      return (
                        <th key={p.id} className="p-3 text-left font-semibold text-slate-900 w-64 relative group">
                          <button
                            onClick={() => onRemove(p.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer text-slate-400"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                            {brand?.name} {brand?.isSwiss && '🇨🇭'}
                          </div>
                          <div className="text-sm font-black text-slate-900 leading-snug pr-6">
                            {p.name}
                          </div>
                          <div className="text-lg font-black text-red-600 font-mono mt-2">
                            CHF {p.priceCHF.toLocaleString('de-CH')}.-
                          </div>
                          <div className="mt-3">
                            <button
                              onClick={() => onBookTestRide(p)}
                              className="w-full py-1.5 px-2 bg-slate-900 hover:bg-red-600 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{t.bookTestRide}</span>
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {/* Speed & Class */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.categorySpeed}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-medium">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.speedMaxKmH === 45 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {p.speedMaxKmH} km/h ({p.speedClass})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* TCS Test Score */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.tcsScore}</td>
                    {comparedProducts.map((p) => {
                      const tcs = p.testVerdicts.find((v) => v.source === 'TCS');
                      return (
                        <td key={p.id} className="p-3">
                          {tcs ? (
                            <div>
                              <span className="font-bold text-red-600 text-xs">{tcs.scoreText}</span>
                              <div className="text-[10px] text-slate-500 mt-0.5">{tcs.summary[lang]?.slice(0, 75)}...</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">
                              {lang === 'fr' ? 'Test en cours' : lang === 'it' ? 'Test in corso' : 'Laborprüfung anstehend'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Trustpilot Verified Reviews */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">Trustpilot (Verifiziert)</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00b67a]" />
                          <span className="font-bold font-mono text-slate-900 text-xs">
                            {p.trustpilotStats?.score || 4.7} / 5
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            {p.trustpilotStats?.badgeText[lang] || 'Hervorragend'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {p.trustpilotStats?.reviewCount || 38} {lang === 'fr' ? 'commandes vérifiées' : lang === 'it' ? 'ordini verificati' : 'verifizierte Käufe'}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Motor */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.motorTorque}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="font-bold text-slate-900">{p.motorModel}</div>
                        <div className="text-slate-500 font-mono mt-0.5">{p.torqueNm} Nm</div>
                      </td>
                    ))}
                  </tr>

                  {/* Battery & Range */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.batteryRange}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="font-bold text-slate-900">{p.batteryWh} Wh</div>
                        <div className="text-emerald-700 text-[11px] mt-0.5">
                          {t.rangeEst}: {p.rangeKmEst.min} – {p.rangeKmEst.max} km
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.weightMaterial}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="font-bold">{p.weightKg} kg</span> ({p.frameMaterial})
                      </td>
                    ))}
                  </tr>

                  {/* Frame & Sizes */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.frameSizes}</td>
                    {comparedProducts.map((p) => {
                      const fLabel =
                        p.frameType === 'step-through'
                          ? tFilter.stepThrough
                          : p.frameType === 'trapeze'
                          ? tFilter.trapeze
                          : tFilter.diamond;
                      return (
                        <td key={p.id} className="p-3">
                          <div className="capitalize font-semibold text-slate-800">
                            {fLabel}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                            {p.frameSizes.join(', ')}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Gears & Brakes */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.gearsBrakes}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 space-y-1">
                        <div><strong className="text-slate-800">{lang === 'fr' ? 'Dérailleur :' : lang === 'it' ? 'Cambio :' : 'Schaltung:'}</strong> {p.specs.gears}</div>
                        <div><strong className="text-slate-800">{lang === 'fr' ? 'Freins :' : lang === 'it' ? 'Freni :' : 'Bremsen:'}</strong> {p.specs.brakes}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Stock Availability */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50">{t.dealers}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {p.inStockSwissDealers} {I18N[lang].card.dealersInStock}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {t.pedalFreeTip}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
