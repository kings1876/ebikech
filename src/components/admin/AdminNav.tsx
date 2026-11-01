'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { REPLY } from '../../config/reply';
import { SITE_NAME } from '../../config/brand';

const LINKS = [
  { href: '/admin/', label: 'Dashboard' },
  { href: '/admin/orders/', label: 'Bestellungen' },
  { href: '/admin/enquiries/', label: 'Anfragen' },
];

export function AdminNav({ onSignOut }: { onSignOut: () => void }) {
  const path = usePathname() || '';
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-5">
        <Link href="/admin/" className="font-black text-sm tracking-tight" style={{ color: REPLY.brand.primary }}>
          {SITE_NAME.de}
        </Link>
        <nav className="flex items-center gap-1 text-sm" aria-label="Admin">
          {LINKS.map((l) => {
            const active = l.href === '/admin/' ? path === '/admin/' || path === '/admin' : path.startsWith(l.href.slice(0, -1));
            return (
              <Link key={l.href} href={l.href} className={`px-3 py-1.5 rounded-lg font-semibold ${active ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={onSignOut} className="ml-auto text-xs font-semibold text-slate-400 hover:text-white cursor-pointer">
          Abmelden
        </button>
      </div>
    </header>
  );
}
