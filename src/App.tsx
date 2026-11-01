'use client';

import { useState, useEffect, useTransition } from 'react';
import { SITE_URL } from './utils/site';
import { Product, Language } from './types';
import { ALL_PRODUCTS } from './data/products';
import { parseRoute, ParsedRoute, buildLocalizedUrl } from './utils/routes';
import { resolveSeoMetadata } from './utils/seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SeoInspector } from './components/SeoInspector';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { TestRideModal } from './components/TestRideModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { BrandHubView } from './views/BrandHubView';
import { GuideView } from './views/GuideView';
import { CantonSubsidiesView } from './views/CantonSubsidiesView';
import { StaticPages } from './views/StaticPages';
import { BlogView } from './views/BlogView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  // Server renders the requested path; query string is read after hydration to avoid mismatches.
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    setCurrentSearch(window.location.search || '');
  }, []);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [testRideProduct, setTestRideProduct] = useState<Product | null>(null);

  const [, startTransition] = useTransition();

  // Parse structured route
  const route: ParsedRoute = parseRoute(currentPath, currentSearch);
  const lang: Language = route.lang;

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setCurrentPath(window.location.pathname);
        setCurrentSearch(window.location.search);
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // SPA Navigator
  const handleNavigate = (newUrl: string) => {
    const [path, search] = newUrl.split('?');
    const safePath = path || '/';
    const safeSearch = search ? `?${search}` : '';

    window.history.pushState(null, '', newUrl);
    startTransition(() => {
      setCurrentPath(safePath);
      setCurrentSearch(safeSearch);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic SEO Synchronization into <head>
  const origin = SITE_URL;
  const seo = resolveSeoMetadata(route, origin);

  useEffect(() => {
    // 1. Title
    document.title = seo.title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);

    // 3. Meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.robots);

    // 4. Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', seo.canonicalUrl);

    // 5. OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', seo.canonicalUrl);

    // 6. Schema.org JSON-LD
    let scriptLd = document.querySelector('script[data-type="schema-ld"]');
    const hasSchema = Array.isArray(seo.jsonLd) ? seo.jsonLd.length > 0 : Object.keys(seo.jsonLd).length > 0;
    if (!hasSchema) {
      scriptLd?.remove();
    } else {
      if (!scriptLd) {
        scriptLd = document.createElement('script');
        scriptLd.setAttribute('type', 'application/ld+json');
        scriptLd.setAttribute('data-type', 'schema-ld');
        document.head.appendChild(scriptLd);
      }
      scriptLd.textContent = JSON.stringify(seo.jsonLd);
    }

    // 7. Hreflangs in <head>
    // Remove previous hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    seo.hreflangs.forEach((hl) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hl.lang);
      link.setAttribute('href', hl.href);
      document.head.appendChild(link);
    });
  }, [seo]);

  // Comparison Handlers
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        setComparisonModalOpen(true);
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Multilingual Main Header */}
      <Header
        currentRoute={route}
        onNavigate={handleNavigate}
        compareCount={comparedProducts.length}
        onOpenCompare={() => setComparisonModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {route.view === 'home' && (
          <HomeView
            lang={lang}
            onNavigate={handleNavigate}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onOpenCompare={() => setComparisonModalOpen(true)}
          />
        )}

        {(route.view === 'catalog-root' ||
          route.view === 'category' ||
          route.view === 'subcategory' ||
          route.view === 'collection' ||
          route.view === 'search') && (
          <CatalogView
            route={route}
            lang={lang}
            onNavigate={handleNavigate}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {route.view === 'product' && route.productSlug && (
          <ProductDetailView
            productSlug={route.productSlug}
            lang={lang}
            onNavigate={handleNavigate}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onOpenTestRide={(prod) => setTestRideProduct(prod)}
          />
        )}

        {(route.view === 'brand-root' ||
          route.view === 'brand' ||
          route.view === 'brand-category') && (
          <BrandHubView
            route={route}
            lang={lang}
            onNavigate={handleNavigate}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {(route.view === 'guide-root' ||
          route.view === 'guide-cluster' ||
          route.view === 'guide-detail') && (
          <GuideView
            route={route}
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {route.view === 'canton-subsidies' && (
          <CantonSubsidiesView
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {(route.view === 'about' || route.view === 'legal') && (
          <StaticPages
            view={route.view}
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {(route.view === 'blog-root' || route.view === 'blog-post') && (
          <BlogView route={route} lang={lang} onNavigate={handleNavigate} />
        )}

        {route.view === 'faq' && <FaqView lang={lang} onNavigate={handleNavigate} />}

        {route.view === 'contact' && <ContactView lang={lang} onNavigate={handleNavigate} />}

        {route.view === 'comparison' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <ComparisonDrawer
              comparedProducts={comparedProducts.length > 0 ? comparedProducts : ALL_PRODUCTS.slice(0, 3)}
              onRemove={handleRemoveCompare}
              onClear={handleClearCompare}
              isOpen={true}
              onClose={() => handleNavigate(buildLocalizedUrl(lang, { lang, view: 'home' }))}
              lang={lang}
              onBookTestRide={(p) => setTestRideProduct(p)}
            />
          </div>
        )}

        {route.view === '404' && (
          <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
            <div className="text-6xl font-black text-red-600 font-mono">404</div>
            <h1 className="text-2xl font-black text-slate-900">
              {lang === 'fr' ? 'Page non trouvée' : lang === 'it' ? 'Pagina non trovata' : 'Seite nicht gefunden'}
            </h1>
            <p className="text-sm text-slate-600">
              Die aufgerufene Schweizer URL existiert nicht oder wurde verschoben.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNavigate(buildLocalizedUrl(lang, { lang, view: 'home' }))}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Comparison Drawer / Modal */}
      <ComparisonDrawer
        comparedProducts={comparedProducts}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(!comparisonModalOpen)}
        lang={lang}
        onBookTestRide={(p) => {
          setComparisonModalOpen(false);
          setTestRideProduct(p);
        }}
      />

      {/* Test Ride Booking Modal */}
      <TestRideModal
        product={testRideProduct}
        onClose={() => setTestRideProduct(null)}
        lang={lang}
      />

      {/* Live SEO Inspector */}
      {process.env.NEXT_PUBLIC_SEO_INSPECTOR === '1' && (
        <SeoInspector
          seo={seo}
          route={route}
          currentUrl={`${origin}${currentPath}${currentSearch}`}
        />
      )}

      {/* Multilingual Swiss Footer */}
      <Footer currentRoute={route} onNavigate={handleNavigate} />
    </div>
  );
}
