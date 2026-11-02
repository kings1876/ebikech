'use client';

// A client component on purpose: the framework copies a server-rendered not-found page into the payload of every page
// (twice), while a client component is only a short reference.
export function NotFoundPage() {
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
