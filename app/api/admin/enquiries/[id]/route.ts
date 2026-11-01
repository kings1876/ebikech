import { checkAdminPasscode } from '../../../../../src/lib/adminAuth';
import { deleteEnquiry, getEnquiry } from '../../../../../src/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const enquiry = await getEnquiry((await params).id);
  return enquiry ? Response.json({ ok: true, enquiry }) : Response.json({ ok: false }, { status: 404 });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  await deleteEnquiry((await params).id);
  return Response.json({ ok: true });
}
