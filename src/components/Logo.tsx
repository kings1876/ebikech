import { BRAND_COLORS } from '../config/brand';

/** Logo mark: a wheel ring with a lightning bolt on a rounded red square. Mirrors public/logo.svg. */
export function LogoMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill={BRAND_COLORS.accent} />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M35.5 15 22.5 35.5h8.2L28.5 49 41.5 28.5h-8.2z" fill="#fff" />
    </svg>
  );
}
