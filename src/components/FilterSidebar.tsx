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
import { RotateCcw, Filter, ShieldAlert, Check } from './icons';
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
    <aside className="k41">
      {/* Top Header & Reset */}
      <div className="k42">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h2 className="k43">
            {t.title}
          </h2>
        </div>

        {hasAnyFilter && (
          <button
            onClick={handleReset}
            className="k44"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.reset}</span>
          </button>
        )}
      </div>

      {/* SEO Facet Notice */}
      {hasAnyFilter && (
        <div className="k45">
          <ShieldAlert className="k46" />
          <div>
            <strong className="block font-semibold">{t.seoNoticeTitle}</strong>
            {t.seoNoticeDesc}
          </div>
        </div>
      )}

      {/* 1. Speed Class */}
      <div className="space-y-2">
        <label className="k47">
          {t.speedClassTitle}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ ...filters, speedClass: toggleArrayItem(filters.speedClass, 'e-bike-25') })}
            className={`k616 ${
              filters.speedClass?.includes('e-bike-25')
                ? 'k617'
                : 'k618'
            }`}
          >
            25 km/h
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, speedClass: toggleArrayItem(filters.speedClass, 'e-bike-45') })}
            className={`k616 ${
              filters.speedClass?.includes('e-bike-45')
                ? 'k619'
                : 'k618'
            }`}
          >
            45 km/h (S-Pedelec)
          </button>
        </div>
      </div>

      {/* 2. Motor Brand */}
      <div className="space-y-2">
        <label className="k47">
          {t.motorTitle}
        </label>
        <div className="space-y-1">
          {MOTOR_OPTIONS.map((m) => {
            const checked = filters.motor?.includes(m.id);
            return (
              <label
                key={m.id}
                className="k48"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, motor: toggleArrayItem(filters.motor, m.id) })}
                  className="k49"
                />
                <span className={checked ? 'k620' : ''}>{m.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Battery Capacity */}
      <div className="space-y-2">
        <label className="k47">
          {t.batteryTitle}
        </label>
        <div className="space-y-1">
          {BATTERY_OPTIONS.map((b) => {
            const checked = filters.batteryWh?.includes(b.id);
            return (
              <label
                key={b.id}
                className="k48"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, batteryWh: toggleArrayItem(filters.batteryWh, b.id) })}
                  className="k49"
                />
                <span className={checked ? 'k620' : ''}>{b.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Price in CHF */}
      <div className="space-y-2">
        <label className="k47">
          {t.priceTitle}
        </label>
        <div className="space-y-1">
          {PRICE_OPTIONS.map((p) => {
            const checked = filters.price?.includes(p.id);
            return (
              <label
                key={p.id}
                className="k48"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, price: toggleArrayItem(filters.price, p.id) })}
                  className="k49"
                />
                <span className={checked ? 'k620' : ''}>{p.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Frame Type */}
      <div className="space-y-2">
        <label className="k47">
          {t.frameTypeTitle}
        </label>
        <div className="space-y-1">
          {frameTypeOptions.map((f) => {
            const checked = filters.frameType?.includes(f.id);
            return (
              <label
                key={f.id}
                className="k48"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, frameType: toggleArrayItem(filters.frameType, f.id) })}
                  className="k49"
                />
                <span className={checked ? 'k620' : ''}>{f.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 6. Frame Size */}
      <div className="space-y-2">
        <label className="k47">
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
                className={`k621 ${
                  active
                    ? 'k622'
                    : 'k618'
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
        <label className="k47">
          {t.useCaseTitle}
        </label>
        <div className="space-y-1">
          {useCaseOptions.map((u) => {
            const checked = filters.useCase?.includes(u.id);
            return (
              <label
                key={u.id}
                className="k48"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ ...filters, useCase: toggleArrayItem(filters.useCase, u.id) })}
                  className="k49"
                />
                <span className={checked ? 'k620' : ''}>{u.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 8. Minimum Test Score Filter (only when products carry test verdicts) */}
      {ALL_PRODUCTS.some((p) => p.testVerdicts.length > 0) && (
      <div className="k50">
        <label className="k47">
          {t.tcsScoreTitle}
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, minScore: filters.minScore === 80 ? undefined : 80 })}
            className={`k623 ${
              filters.minScore === 80
                ? 'k624'
                : 'k618'
            }`}
          >
            <span>{t.tcsOnlyHigh}</span>
            {filters.minScore === 80 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>
      )}

      {/* 9. Trustpilot Verified Score Filter */}
      <div className="k50">
        <label className="k47">
          Trustpilot & Verifizierte Rezensionen
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, minTrustScore: filters.minTrustScore === 4.7 ? undefined : 4.7 })}
            className={`k623 ${
              filters.minTrustScore === 4.7
                ? 'k625'
                : 'k626'
            }`}
          >
            <span className="k51">
              <span className="k52" />
              <span>TrustScore ≥ 4.7 ({lang === 'fr' ? 'Excellent' : lang === 'it' ? 'Eccellente' : 'Hervorragend'})</span>
            </span>
            {filters.minTrustScore === 4.7 && <Check className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        </div>
      </div>

      {/* Active Results Count indicator */}
      <div className="k53">
        <div className="text-xs text-slate-400">{t.foundModels}</div>
        <div className="k54">{totalFiltered}</div>
      </div>
    </aside>
  );
}
