import { Product, Language } from '../types';
import { BRANDS } from '../data/brands';
import { I18N } from '../data/i18n';
import { X, SlidersHorizontal, Calendar } from './icons';
import { localizeSpec } from '../utils/productText';

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
        <div className="k7 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="k8">
              {comparedProducts.length}
            </span>
            <div className="text-xs">
              <span className="font-bold">{t.modelsCount}</span>
              <span className="k9">{t.maxFour}</span>
            </div>
          </div>

          <div className="k10">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="k11"
                title={p.name}
              >
                {p.brandId.slice(0, 2).toUpperCase()}
              </div>
            ))}
          </div>

          <button
            onClick={() => onClose()} // toggle handled by parent
            className="k12"
          >
            {t.viewCompare}
          </button>
        </div>
      )}

      {/* Full Comparison Modal */}
      {isOpen && (
        <div className="k13">
          <div className="k14 animate-in zoom-in-95">
            {/* Header */}
            <div className="k15">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-red-500" />
                <div>
                  <h2 className="k16">
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
                  className="k17"
                >
                  {t.clearAll}
                </button>
                <button
                  onClick={onClose}
                  className="k18"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table Grid */}
            <div className="k19">
              <table className="k20">
                <thead>
                  <tr className="k21">
                    <th className="k22">
                      {lang === 'fr' ? 'Modèle' : lang === 'it' ? 'Modello' : 'Modell'}
                    </th>
                    {comparedProducts.map((p) => {
                      const brand = BRANDS.find((b) => b.id === p.brandId);
                      return (
                        <th key={p.id} className="k23 group">
                          <button
                            onClick={() => onRemove(p.id)}
                            className="k24"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="k25">
                            {brand?.name} {brand?.isSwiss && '🇨🇭'}
                          </div>
                          <div className="k26">
                            {p.name}
                          </div>
                          <div className="k27">
                            CHF {p.priceCHF.toLocaleString('de-CH')}.-
                          </div>
                          <div className="mt-3">
                            <button
                              onClick={() => onBookTestRide(p)}
                              className="k28"
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
                <tbody className="k29">
                  {/* Speed & Class */}
                  <tr>
                    <td className="k30">{t.categorySpeed}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-medium">
                        <span className={`k613 ${
                          p.speedMaxKmH === 45 ? 'k614' : 'k615'
                        }`}>
                          {p.speedMaxKmH} km/h ({p.speedClass})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Motor */}
                  <tr>
                    <td className="k30">{t.motorTorque}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="font-bold text-slate-900">{p.motorModel}</div>
                        {p.torqueNm ? <div className="k31">{p.torqueNm} Nm</div> : null}
                      </td>
                    ))}
                  </tr>

                  {/* Battery & Range */}
                  <tr>
                    <td className="k30">{t.batteryRange}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="font-bold text-slate-900">{p.batteryWh} Wh</div>
                        {p.rangeKmEst ? (<div className="k32">{t.rangeEst}: {p.rangeKmEst.min === p.rangeKmEst.max ? p.rangeKmEst.max : `${p.rangeKmEst.min} - ${p.rangeKmEst.max}`} km</div>) : null}
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="k30">{t.weightMaterial}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="font-bold">{p.weightKg ? `${p.weightKg} kg` : '-'}</span> ({localizeSpec(p.frameMaterial, lang)})
                      </td>
                    ))}
                  </tr>

                  {/* Frame & Sizes */}
                  <tr>
                    <td className="k30">{t.frameSizes}</td>
                    {comparedProducts.map((p) => {
                      const fLabel =
                        p.frameType === 'step-through'
                          ? tFilter.stepThrough
                          : p.frameType === 'trapeze'
                          ? tFilter.trapeze
                          : tFilter.diamond;
                      return (
                        <td key={p.id} className="p-3">
                          <div className="k33">
                            {fLabel}
                          </div>
                          <div className="k34">
                            {p.frameSizes.join(', ')}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Gears & Brakes */}
                  <tr>
                    <td className="k30">{t.gearsBrakes}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 space-y-1">
                        <div><strong className="text-slate-800">{lang === 'fr' ? 'Dérailleur :' : lang === 'it' ? 'Cambio :' : 'Schaltung:'}</strong> {localizeSpec(p.specs.gears, lang)}</div>
                        <div><strong className="text-slate-800">{lang === 'fr' ? 'Freins :' : lang === 'it' ? 'Freni :' : 'Bremsen:'}</strong> {localizeSpec(p.specs.brakes, lang)}</div>
                      </td>
                    ))}
                  </tr>

                  </tbody>
              </table>
            </div>

            {/* Bottom Footer Action */}
            <div className="k35">
              <div className="text-xs text-slate-500">
                {t.pedalFreeTip}
              </div>
              <button
                onClick={onClose}
                className="k36"
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
