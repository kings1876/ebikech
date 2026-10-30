import '../../src/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it-CH">
      <body>{children}</body>
    </html>
  );
}
