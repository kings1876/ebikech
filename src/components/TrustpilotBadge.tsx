import { Language } from '../types';

interface TrustpilotBadgeProps {
  score: number;
  reviewCount: number;
  badgeText?: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function TrustpilotStarIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Authentic Trustpilot Star outline with dark green interior */}
      <path
        fill="#00b67a"
        d="M12 0l3.09 9.51h10l-8.09 5.88 3.09 9.51-8-5.88-8 5.88 3.09-9.51-8.09-5.88h10z"
      />
      <path
        fill="#005128"
        d="M12 19.02l-4.94 3.63 1.91-5.88 4.97-3.61-4.97-3.66h6.14l1.9-5.87v15.39z"
      />
    </svg>
  );
}

export function TrustpilotBadge({
  score,
  reviewCount,
  badgeText = 'Hervorragend',
  size = 'md',
  showCount = true,
}: TrustpilotBadgeProps) {
  if (size === 'sm') {
    return (
      <div className="k231">
        <TrustpilotStarIcon className="w-3 h-3" />
        <span className="k232">{score.toFixed(1)}</span>
        <span className="text-slate-400">Trustpilot</span>
        {showCount && <span className="text-slate-500 font-mono">({reviewCount})</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* 5 Green Star Blocks (Trustpilot Brand Style) */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="k233"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="text-xs">
        <span className="font-bold text-slate-900 mr-1">{badgeText}</span>
        <span className="k234">{score.toFixed(1)}</span>
        <span className="k235">
          sur <strong className="text-slate-900 font-semibold">Trustpilot</strong> ({reviewCount})
        </span>
      </div>
    </div>
  );
}
