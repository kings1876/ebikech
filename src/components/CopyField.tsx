'use client';

import { useState } from 'react';
import { Check, Copy } from './icons';

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
    <div className="k37">
      <div className="min-w-0">
        <div className="k38">{label}</div>
        <div className="k39">{value}</div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label}: ${copied ? copiedLabel : copyLabel}`}
        className="k40"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
