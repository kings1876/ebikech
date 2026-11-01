'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** One payment-detail row with a tap-to-copy button (email clients cannot run scripts, so this lives on a real page). */
export function CopyField({ label, value, copyLabel = 'Kopieren', copiedLabel = 'Kopiert' }: { label: string; value: string; copyLabel?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the value stays selectable on screen
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
        <div className="font-mono text-sm text-slate-900 break-all select-all">{value}</div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label}: ${copied ? copiedLabel : copyLabel}`}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer min-h-10"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
