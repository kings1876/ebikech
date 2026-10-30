import '../../src/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH">
      <body>{children}</body>
    </html>
  );
}
