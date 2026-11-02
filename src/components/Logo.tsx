/** Logo mark: a wheel ring with a lightning bolt on a rounded red square. Mirrors public/logo.svg (drawn by .logomark in index.css). */
export function LogoMark({ className = 'w-9 h-9' }: { className?: string }) {
  return <span className={`logomark ${className}`} />;
}
