import { checkAdminPasscode } from '../../../../../src/lib/adminAuth';
import { deleteOrder, getOrder } from '../../../../../src/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const order = await getOrder((await params).id);
  return order ? Response.json({ ok: true, order }) : Response.json({ ok: false }, { status: 404 });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  await deleteOrder((await params).id);
  return Response.json({ ok: true });
}
