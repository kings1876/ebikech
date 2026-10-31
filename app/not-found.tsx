export const metadata = { title: 'Seite nicht gefunden', robots: 'noindex' };

export default function NotFound() {
  return (
    <html lang="de-CH">
      <body style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '6rem 1rem' }}>
        <h1>404</h1>
        <p>Seite nicht gefunden · Page non trouvée · Pagina non trovata</p>
        <p><a href="/">E-Bikes zu verkaufen</a></p>
      </body>
    </html>
  );
}
