import { useState } from 'react';
import { Language } from '../types';
import { CANTON_SUBSIDIES } from '../data/cantonSubsidies';
import { Coins, ChevronRight, ArrowRight } from '../components/icons';
import { buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import { NavLink } from '../components/NavLink';

interface CantonSubsidiesViewProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function CantonSubsidiesView({ lang, onNavigate }: CantonSubsidiesViewProps) {
  const [selectedCanton, setSelectedCanton] = useState<string>('all');
  const t = I18N[lang].subsidies;

  const filteredSubsidies = selectedCanton === 'all'
    ? CANTON_SUBSIDIES
    : CANTON_SUBSIDIES.filter((s) => s.cantonCode === selectedCanton);

  return (
    <div className="k331">
      {/* Breadcrumb Trail */}
      <div className="k294">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="k295"
        >
          {I18N[lang].pdp.home}
        </NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-900">
          {lang === 'fr' ? 'Subventions cantonales' : lang === 'it' ? 'Incentivi cantonali' : 'Kantonale Förderbeiträge'}
        </span>
      </div>

      {/* Header Banner */}
      <div className="k332">
        <div className="k333">
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>{t.badge}</span>
        </div>

        <h1 className="k334">
          {t.h1}
        </h1>

        <p className="k335">
          {t.desc}
        </p>
      </div>

      {/* Canton Filter Buttons */}
      <div className="space-y-3">
        <label className="k336">
          {t.filterCanton}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCanton('all')}
            className={`k661 ${
              selectedCanton === 'all'
                ? 'k662'
                : 'k663'
            }`}
          >
            {t.allCantons} ({CANTON_SUBSIDIES.length})
          </button>
          {CANTON_SUBSIDIES.map((c) => (
            <button
              key={c.cantonCode}
              onClick={() => setSelectedCanton(c.cantonCode)}
              className={`k661 ${
                selectedCanton === c.cantonCode
                  ? 'k664'
                  : 'k663'
              }`}
            >
              {c.cantonCode} · {c.cantonName.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Subsidies Cards Grid */}
      <div className="k337">
        {filteredSubsidies.map((s) => (
          <div
            key={s.cantonCode}
            className="k338"
          >
            <div className="k339">
              <div>
                <span className="k340">
                  {lang === 'fr' ? 'Canton' : lang === 'it' ? 'Cantone' : 'Kanton'} {s.cantonCode}
                </span>
                <h2 className="k341">
                  {s.cantonName}
                </h2>
              </div>
              <div className="text-right">
                <span className="k342">
                  {s.amountCHF}
                </span>
                <span className="k343">{t.subsidyLabel}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-slate-800">{t.eligibleTypes}:</strong>
                <div className="text-slate-600 mt-0.5">{s.eligibleTypes}</div>
              </div>

              <div>
                <strong className="text-slate-800">{t.requirements}:</strong>
                <p className="k344">
                  {s.conditions[lang]}
                </p>
              </div>
            </div>

            <div className="k345">
              <span className="k346">
                {t.officialPortal} {s.officialLinkText}
              </span>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="k347"
              >
                <span>{t.matchingModels}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Steps to get the subsidy */}
      <div className="k348">
        <h2 className="k130">
          {t.stepsTitle}
        </h2>
        <div className="k349">
          <div className="k350">
            <div className="k351">
              1
            </div>
            <strong className="block text-slate-900">{t.step1Title}</strong>
            <p className="text-slate-500">
              {t.step1Desc}
            </p>
          </div>

          <div className="k350">
            <div className="k351">
              2
            </div>
            <strong className="block text-slate-900">{t.step2Title}</strong>
            <p className="text-slate-500">
              {t.step2Desc}
            </p>
          </div>

          <div className="k350">
            <div className="k351">
              3
            </div>
            <strong className="block text-slate-900">{t.step3Title}</strong>
            <p className="text-slate-500">
              {t.step3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
