'use client';

import { createContext, useContext } from 'react';

export interface AdminSession {
  passcode: string;
  /** fetch() against /api/admin/* with the passcode header; resolves to the parsed JSON plus the HTTP status */
  api: <T = Record<string, unknown>>(path: string, init?: RequestInit) => Promise<{ status: number; data: T }>;
}

export const AdminPasscodeContext = createContext<AdminSession | null>(null);

export function useAdmin(): AdminSession {
  const ctx = useContext(AdminPasscodeContext);
  if (!ctx) throw new Error('useAdmin must be used inside the admin layout');
  return ctx;
}
