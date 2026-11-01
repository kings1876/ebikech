import { useState } from 'react';
import { Language } from '../types';
import { CANTON_SUBSIDIES } from '../data/cantonSubsidies';
import { Coins, ChevronRight, ArrowRight } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {I18N[lang].pdp.home}
        </NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-900">
          {lang === 'fr' ? 'Subventions cantonales' : lang === 'it' ? 'Incentivi cantonali' : 'Kantonale Förderbeiträge'}
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>{t.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          {t.h1}
        </h1>

        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* Canton Filter Buttons */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          {t.filterCanton}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCanton('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              selectedCanton === 'all'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.allCantons} ({CANTON_SUBSIDIES.length})
          </button>
          {CANTON_SUBSIDIES.map((c) => (
            <button
              key={c.cantonCode}
              onClick={() => setSelectedCanton(c.cantonCode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                selectedCanton === c.cantonCode
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.cantonCode} · {c.cantonName.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Subsidies Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSubsidies.map((s) => (
          <div
            key={s.cantonCode}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500/60 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {lang === 'fr' ? 'Canton' : lang === 'it' ? 'Cantone' : 'Kanton'} {s.cantonCode}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  {s.cantonName}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-emerald-600 font-mono">
                  {s.amountCHF}
                </span>
                <span className="text-[10px] text-slate-400 block">{t.subsidyLabel}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-slate-800">{t.eligibleTypes}:</strong>
                <div className="text-slate-600 mt-0.5">{s.eligibleTypes}</div>
              </div>

              <div>
                <strong className="text-slate-800">{t.requirements}:</strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {s.conditions[lang]}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {t.officialPortal} {s.officialLinkText}
              </span>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                <span>{t.matchingModels}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Steps to get the subsidy */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-black text-slate-900">
          {t.stepsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center mb-2">
              1
            </div>
            <strong className="block text-slate-900">{t.step1Title}</strong>
            <p className="text-slate-500">
              {t.step1Desc}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center mb-2">
              2
            </div>
            <strong className="block text-slate-900">{t.step2Title}</strong>
            <p className="text-slate-500">
              {t.step2Desc}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center mb-2">
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
