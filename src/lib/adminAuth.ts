import { timingSafeEqual } from 'node:crypto';

/**
 * Passcode gate for every /api/admin/* route. Call it first and return its result when not null.
 * 503 when ADMIN_PASSCODE is not configured (never open), 401 when wrong.
 */
export function checkAdminPasscode(request: Request): Response | null {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return Response.json({ ok: false, error: 'admin-not-configured' }, { status: 503 });
  const given = request.headers.get('x-admin-passcode') || '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return null;
}
