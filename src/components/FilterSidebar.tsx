import {
  FacetFilters,
  SpeedClass,
  MotorBrand,
  BatteryBracket,
  FrameType,
  FrameSize,
  PriceBracket,
  UseCase,
  Language,
} from '../types';
import { I18N } from '../data/i18n';
import { RotateCcw, Filter, ShieldAlert, Check } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';

interface FilterSidebarProps {
  filters: FacetFilters;
  onChange: (newFilters: FacetFilters) => void;
  lang: Language;
  totalFiltered: number;
}

const MOTOR_OPTIONS: { id: MotorBrand; label: string }[] = [
  { id: 'Bosch', label: 'Bosch (Smart System / CX / Speed)' },
  { id: 'Shimano Steps', label: 'Shimano Steps (EP801 / EP6)' },
  { id: 'Yamaha', label: 'Yamaha (SyncDrive / PW-X3)' },
  { id: 'Specialized', label: 'Specialized Turbo (Rx Tune / SL)' },
  { id: 'Stromer CYRO', label: 'Stromer CYRO / SYNO Nabenmotor' },
  { id: 'Fazua', label: 'Fazua (Ride 60)' },
  { id: 'TQ', label: 'TQ / maxon BIKEDRIVE (Swiss Air)' },
  { id: 'Mahle', label: 'Mahle SmartBike' },
];

const BATTERY_OPTIONS: { id: BatteryBracket; label: string }[] = [
  { id: '<500', label: '< 500 Wh' },
  { id: '500-625', label: '500 – 625 Wh' },
  { id: '625-750', label: '625 – 750 Wh' },
  { id: '>750', label: '> 750 Wh' },
];

const FRAME_SIZE_OPTIONS: FrameSize[] = ['XS', 'S', 'M', 'L', 'XL'];

const PRICE_OPTIONS: { id: PriceBracket; label: string }[] = [
  { id: '<2000', label: '< CHF 2’000.-' },
  { id: '2000-3500', label: 'CHF 2’000 – 3’500.-' },
  { id: '3500-5000', label: 'CHF 3’500 – 5’000.-' },
  { id: '>5000', label: '> CHF 5’000.-' },
];

export function FilterSidebar({
  filters,
  onChange,
  lang,
  totalFiltered,
}: FilterSidebarProps) {
  const t = I18N[lang].filter;

  const frameTypeOptions: { id: FrameType; label: string }[] = [
    { id: 'diamond', label: t.diamond },
    { id: 'step-through', label: t.stepThrough },
    { id: 'trapeze', label: t.trapeze },
  ];

  const useCaseOptions: { id: UseCase; label: string }[] = [
    { id: 'commute', label: t.commute },
    { id: 'touring', label: t.touring },
    { id: 'family', label: t.family },
    { id: 'senior', label: t.senior },
    { id: 'beginner', label: t.beginner },
  ];

  // Toggle helper
  const toggleArrayItem = <T,>(current: T[] | undefined, item: T): T[] => {
    const list = current ? [...current] : [];
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(item);
    }
    return list;
  };

  const hasAnyFilter = Boolean(
    filters.speedClass?.length ||
    filters.motor?.length ||
    filters.batteryWh?.length ||
    filters.frameType?.length ||
    filters.frameSize?.length ||
    filters.price?.length ||
    filters.useCase?.length ||
    filters.minScore ||
    filters.minTrustScore
  );

  const handleReset = () => {
    onChange({});
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 space-y-6">
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h2 className="font-bold text-sm text-slate-900">
            {t.title}
          </h2>
        </div>

        {hasAnyFilter && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.reset}</span>
          </button>
        )}
      </div>

      {/* SEO Facet Notice */}
      {hasAnyFilter && (
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">{t.seoNoticeTitle}</strong>
            {t.seoNoticeDesc}
          </div>
        </div>
      )}

      {/* 1. Speed Class */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.speedClassTitle}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ ...filters, speedClass: toggleArrayItem(filters.speedClass, 'e-bike-25') })}
            className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
              filters.speedClass?.includes('e-bike-25')
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            25 km/h
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, speedClass: toggleArrayItem(filters.speedClass, 'e-bike-45') })}
            className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
              filters.speedClass?.includes('e-bike-45')
                ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            45 km/h (S-Pedelec)
          </button>
        </div>
      </div>

      {/* 2. Motor Brand */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.motorTitle}
        </label>
        <div className="space-y-1">
          {MOTOR_OPTIONS.map((m) => {
            const checked = filters.motor?.includes(m.id);
            return (
              <label
                key={m.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, motor: toggleArrayItem(filters.motor, m.id) })}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className={checked ? 'font-semibold text-slate-900' : ''}>{m.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Battery Capacity */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.batteryTitle}
        </label>
        <div className="space-y-1">
          {BATTERY_OPTIONS.map((b) => {
            const checked = filters.batteryWh?.includes(b.id);
            return (
              <label
                key={b.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, batteryWh: toggleArrayItem(filters.batteryWh, b.id) })}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className={checked ? 'font-semibold text-slate-900' : ''}>{b.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Price in CHF */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.priceTitle}
        </label>
        <div className="space-y-1">
          {PRICE_OPTIONS.map((p) => {
            const checked = filters.price?.includes(p.id);
            return (
              <label
                key={p.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, price: toggleArrayItem(filters.price, p.id) })}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className={checked ? 'font-semibold text-slate-900' : ''}>{p.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Frame Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.frameTypeTitle}
        </label>
        <div className="space-y-1">
          {frameTypeOptions.map((f) => {
            const checked = filters.frameType?.includes(f.id);
            return (
              <label
                key={f.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, frameType: toggleArrayItem(filters.frameType, f.id) })}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className={checked ? 'font-semibold text-slate-900' : ''}>{f.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 6. Frame Size */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.frameSizeTitle}
        </label>
        <div className="flex gap-1.5">
          {FRAME_SIZE_OPTIONS.map((size) => {
            const active = filters.frameSize?.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onChange({ ...filters, frameSize: toggleArrayItem(filters.frameSize, size) })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Use Case */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.useCaseTitle}
        </label>
        <div className="space-y-1">
          {useCaseOptions.map((u) => {
            const checked = filters.useCase?.includes(u.id);
            return (
              <label
                key={u.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, useCase: toggleArrayItem(filters.useCase, u.id) })}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span className={checked ? 'font-semibold text-slate-900' : ''}>{u.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 8. Minimum Test Score Filter (only when products carry test verdicts) */}
      {ALL_PRODUCTS.some((p) => p.testVerdicts.length > 0) && (
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {t.tcsScoreTitle}
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, minScore: filters.minScore === 80 ? undefined : 80 })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between border transition-colors cursor-pointer ${
              filters.minScore === 80
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{t.tcsOnlyHigh}</span>
            {filters.minScore === 80 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>
      )}

      {/* 9. Trustpilot Verified Score Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          Trustpilot & Verifizierte Rezensionen
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, minTrustScore: filters.minTrustScore === 4.7 ? undefined : 4.7 })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between border transition-colors cursor-pointer ${
              filters.minTrustScore === 4.7
                ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                : 'bg-emerald-50/50 text-emerald-950 border-emerald-200/80 hover:bg-emerald-100/60'
            }`}
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00b67a]" />
              <span>TrustScore ≥ 4.7 ({lang === 'fr' ? 'Excellent' : lang === 'it' ? 'Eccellente' : 'Hervorragend'})</span>
            </span>
            {filters.minTrustScore === 4.7 && <Check className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        </div>
      </div>

      {/* Active Results Count indicator */}
      <div className="p-3 bg-slate-900 text-white rounded-xl text-center">
        <div className="text-xs text-slate-400">{t.foundModels}</div>
        <div className="text-xl font-black font-mono text-red-400">{totalFiltered}</div>
      </div>
    </aside>
  );
}
