'use client';

import { PasscodeGate } from './PasscodeGate';
import { AdminNav } from './AdminNav';

/** Dark operator shell: passcode gate, navigation, page content. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <PasscodeGate>
      {(signOut) => (
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AdminNav onSignOut={signOut} />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </div>
      )}
    </PasscodeGate>
  );
}
