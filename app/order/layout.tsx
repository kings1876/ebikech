import '../../src/index.css';

export const metadata = { title: 'Zahlung', robots: { index: false, follow: false } };

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body className="bg-slate-50 text-slate-900">
        <main className="max-w-xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
