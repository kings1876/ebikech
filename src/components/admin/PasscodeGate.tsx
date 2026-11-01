'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { REPLY } from '../../config/reply';
import { AdminPasscodeContext, AdminSession } from './AdminPasscodeContext';

const KEY = 'ezv-admin-passcode';
const read = () => {
  try {
    return localStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
};
const write = (v: string) => {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {
    // private browsing: the passcode simply has to be entered again next time
  }
};

type State = 'checking' | 'locked' | 'open' | 'not-configured';

/** Lock screen for every /admin page. The passcode is verified by calling the orders endpoint with it. */
export function PasscodeGate({ children }: { children: (signOut: () => void) => React.ReactNode }) {
  const [passcode, setPasscode] = useState('');
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('checking');
  const [error, setError] = useState('');

  const verify = useCallback(async (code: string) => {
    if (!code) {
      setState('locked');
      return;
    }
    try {
      const r = await fetch('/api/admin/orders/', { headers: { 'x-admin-passcode': code } });
      if (r.status === 503) setState('not-configured');
      else if (r.ok) {
        setPasscode(code);
        write(code);
        setState('open');
        setError('');
      } else {
        write('');
        setState('locked');
        if (input) setError('Falscher Zugangscode.');
      }
    } catch {
      setState('locked');
      setError('Verbindung fehlgeschlagen.');
    }
  }, [input]);

  useEffect(() => {
    verify(read());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(() => {
    write('');
    setPasscode('');
    setInput('');
    setState('locked');
  }, []);

  const session: AdminSession = useMemo(
    () => ({
      passcode,
      api: async (path, init) => {
        const r = await fetch(path, { ...init, headers: { ...(init?.headers || {}), 'x-admin-passcode': passcode } });
        let data: unknown = {};
        try {
          data = await r.json();
        } catch {
          // empty body
        }
        return { status: r.status, data: data as never };
      },
    }),
    [passcode],
  );

  if (state === 'open') return <AdminPasscodeContext.Provider value={session}>{children(signOut)}</AdminPasscodeContext.Provider>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-100">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: REPLY.brand.primary }}>Reply Portal</div>
        {state === 'checking' && <p className="text-sm text-slate-400">Wird geprüft …</p>}
        {state === 'not-configured' && (
          <p className="text-sm text-amber-300">
            Das Portal ist noch nicht freigeschaltet: Die Umgebungsvariable <code className="text-amber-200">ADMIN_PASSCODE</code> fehlt im Vercel-Projekt.
          </p>
        )}
        {state === 'locked' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify(input.trim());
            }}
            className="space-y-3"
          >
            <label htmlFor="passcode" className="text-sm font-semibold block">Zugangscode</label>
            <input
              id="passcode"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none focus:ring-2"
              style={{ ['--tw-ring-color' as string]: REPLY.brand.primary }}
            />
            {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
            <button type="submit" className="w-full rounded-lg py-2.5 text-sm font-bold text-white cursor-pointer" style={{ background: REPLY.brand.primary }}>
              Anmelden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
