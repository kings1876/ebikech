import '../../src/index.css';
import { AdminShell } from '../../src/components/admin/AdminShell';

export const metadata = { title: 'Reply Portal', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
