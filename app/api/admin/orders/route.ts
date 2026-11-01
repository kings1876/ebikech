import { checkAdminPasscode } from '../../../../src/lib/adminAuth';
import { isStoreConfigured, listOrders } from '../../../../src/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  return Response.json({ ok: true, storeConfigured: isStoreConfigured(), orders: await listOrders() });
}
