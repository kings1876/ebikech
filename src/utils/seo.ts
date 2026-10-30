import { SeoMeta, Language, Product } from '../types';
import { ParsedRoute, buildLocalizedUrl, getHreflangs, getBrandCategoryCount } from './routes';
import { ALL_PRODUCTS } from '../data/products';

export function resolveSeoMetadata(route: ParsedRoute, origin: string = ''): SeoMeta {
  const lang = route.lang;
  const canonicalPath = buildLocalizedUrl(lang, route);
  const canonicalUrl = `${origin}${canonicalPath}`;
  const hreflangs = getHreflangs(route, origin);

  // 1. Determine Robots Index vs Noindex
  let robots: 'index, follow' | 'noindex, follow' = 'index, follow';

  // Rule: facets -> noindex
  if (route.hasFacets) {
    robots = 'noindex, follow';
  }

  // Rule: pagination p2+ -> noindex
  if (route.page && route.page > 1) {
    robots = 'noindex, follow';
  }

  // Rule: search, cart, checkout, account, thank-you -> noindex
  if (route.view === 'search' || route.view === '404') {
    robots = 'noindex, follow';
  }

  // Rule: listing pages with no products are thin -> noindex
  if (route.view === 'category' && route.category) {
    if (!ALL_PRODUCTS.some((p) => p.categoryId === route.category!.id)) robots = 'noindex, follow';
  }
  if (route.view === 'subcategory' && route.category) {
    if (!ALL_PRODUCTS.some((p) => p.categoryId === route.category!.id && p.subcategoryId === route.subcategorySlug)) robots = 'noindex, follow';
  }
  if (route.view === 'brand' && route.brand) {
    if (!ALL_PRODUCTS.some((p) => p.brandId === route.brand!.id)) robots = 'noindex, follow';
  }

  // Rule: brand x type only if >= 3 products!
  if (route.view === 'brand-category') {
    if (route.brand && route.category) {
      const count = getBrandCategoryCount(route.brand.id, route.category.id);
      if (count < 3) {
        robots = 'noindex, follow';
      }
    }
  }

  // Breadcrumbs
  const breadcrumbs: { name: string; url: string }[] = [];
  const homeLabel = lang === 'fr' ? 'Accueil' : lang === 'it' ? 'Home' : 'Startseite';
  breadcrumbs.push({ name: homeLabel, url: buildLocalizedUrl(lang, { lang, view: 'home' }) });

  let title = 'VeloSchweiz â€“ Das Schweizer E-Bike Vergleichsportal';
  let description = 'Finden Sie Ihr Traum-E-Bike: 500 Modelle im Schweizer Vergleich mit TCS & Kassensturz Tests, FachhÃ¤ndlern und FÃ¶rderbeitrÃ¤gen.';
  let ogType: 'website' | 'article' | 'product' = 'website';
  let jsonLd: Record<string, unknown> | Array<Record<string, unknown>> = {};

  switch (route.view) {
    case 'home': {
      if (lang === 'fr') {
        title = 'VeloSuisse â€“ Comparateur de VÃ©los Ã‰lectriques en Suisse';
        description = 'Comparez 500 modÃ¨les dâ€™e-bikes en Suisse avec tests TCS et Kassensturz, revendeurs agrÃ©Ã©s et guide des subventions cantonales.';
      } else if (lang === 'it') {
        title = 'VeloSvizzera â€“ Portale e Comparatore E-Bike in Svizzera';
        description = 'Confronta 500 modelli di e-bike in Svizzera con test TCS, rivenditori specializzati e guida agli incentivi cantonali.';
      }
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'VeloSchweiz',
        alternateName: lang === 'fr' ? 'VeloSuisse' : lang === 'it' ? 'VeloSvizzera' : 'VeloSchweiz',
        url: `${origin}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
      break;
    }

    case 'catalog-root': {
      const catRootLabel = lang === 'fr' ? 'VÃ©los Ã©lectriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes';
      breadcrumbs.push({ name: catRootLabel, url: canonicalPath });

      if (lang === 'fr') {
        title = 'Tous les VÃ©los Ã‰lectriques en Suisse â€“ 500 ModÃ¨les ComparÃ©s | VeloSuisse';
        description = 'Catalogue complet des vÃ©los Ã©lectriques en Suisse : VTT, trekking, ville, cargos et 45 km/h avec fiches techniques et notes de test.';
      } else if (lang === 'it') {
        title = 'Catalogo Completo E-Bike in Svizzera â€“ 500 Modelli | VeloSvizzera';
        description = 'Catalogo completo delle e-bike in Svizzera: mountain bike, trekking, cittÃ , cargo e speed pedelec 45 km/h con test ufficiali.';
      } else {
        title = 'Alle E-Bikes der Schweiz â€“ 500 Modelle im Test & Vergleich | VeloSchweiz';
        description = 'VollstÃ¤ndiger Schweizer E-Bike Katalog: Mountainbikes, Trekking, City, Lastenvelos und schnelle 45 km/h E-Bikes mit TCS-PrÃ¼fbericht.';
      }
      break;
    }

    case 'category': {
      if (route.category) {
        const catName = route.category.name[lang];
        breadcrumbs.push({
          name: lang === 'fr' ? 'VÃ©los Ã©lectriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({ name: catName, url: canonicalPath });

        if (lang === 'fr') {
          title = `${catName} â€“ Comparatif & Meilleurs ModÃ¨les en Suisse | VeloSuisse`;
          description = `DÃ©couvrez notre sÃ©lection de ${route.category.targetCount} ${catName} en Suisse avec tests comparatifs, autonomie et revendeurs.`;
        } else if (lang === 'it') {
          title = `${catName} â€“ Confronto & Migliori Modelli in Svizzera | VeloSvizzera`;
          description = `Guida e catalogo con ${route.category.targetCount} ${catName} in Svizzera con punteggi TCS, motori e prezzi in CHF.`;
        } else {
          title = `${catName} Schweiz â€“ ${route.category.targetCount} Modelle im Test & Preisvergleich | VeloSchweiz`;
          description = `Die besten ${catName} der Schweiz im Test: Reichweite, Bosch/Shimano Motoren, Schweizer FachhÃ¤ndler und Preise in CHF.`;
        }

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${catName} Schweiz`,
          description,
          url: canonicalUrl,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: ALL_PRODUCTS.filter((p) => p.categoryId === route.category?.id)
              .slice(0, 10)
              .map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: p.name,
                url: `${origin}${buildLocalizedUrl(lang, { lang, view: 'product', category: route.category, productSlug: p.slug })}`,
              })),
          },
        };
      }
      break;
    }

    case 'subcategory': {
      if (route.category && route.subcategorySlug) {
        const sub = route.category.subcategories?.find((s) => s.id === route.subcategorySlug);
        const subName = sub ? sub.name[lang] : route.subcategorySlug;
        const catName = route.category.name[lang];

        breadcrumbs.push({
          name: lang === 'fr' ? 'VÃ©los Ã©lectriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({
          name: catName,
          url: buildLocalizedUrl(lang, { lang, view: 'category', category: route.category }),
        });
        breadcrumbs.push({ name: subName, url: canonicalPath });

        if (lang === 'fr') {
          title = `${subName} â€“ Guide, Tests & Prix en Suisse | VeloSuisse`;
          description = `Tous les modÃ¨les ${subName} (${sub?.targetCount} vÃ©los) testÃ©s pour les sentiers suisses avec moteurs puissants et suspension.`;
        } else if (lang === 'it') {
          title = `${subName} â€“ Test, Autonomia e Prezzi in Svizzera | VeloSvizzera`;
          description = `Guida e prezzi in CHF per ${subName} (${sub?.targetCount} modelli) adatte a salite impegnative e discese tecniche.`;
        } else {
          title = `${subName} Schweiz â€“ ${sub?.targetCount} Modelle im Vergleich | VeloSchweiz`;
          description = `Die besten ${subName} im Schweizer Praxistest: Federung, Akku-Leistung am Berg und VerfÃ¼gbarkeit bei Schweizer HÃ¤ndlern.`;
        }
      }
      break;
    }

    case 'product': {
      ogType = 'product';
      const product = ALL_PRODUCTS.find((p) => p.slug === route.productSlug);
      if (product && route.category) {
        const catName = route.category.name[lang];
        breadcrumbs.push({
          name: lang === 'fr' ? 'VÃ©los Ã©lectriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({
          name: catName,
          url: buildLocalizedUrl(lang, { lang, view: 'category', category: route.category }),
        });
        breadcrumbs.push({ name: product.name, url: canonicalPath });

        title = `${product.name} (CHF ${product.priceCHF.toLocaleString('de-CH')}.-) â€“ Test & Technische Daten | VeloSchweiz`;
        description = `${product.name}: ${product.motorModel}, ${product.batteryWh} Wh Akku${product.weightKg ? `, ${product.weightKg} kg` : ''}. Preis ab CHF ${product.priceCHF.toLocaleString('de-CH')}.-, technische Daten und Details.`;

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: `${origin}${product.imageUrl}`,
          description: product.shortDesc[lang],
          brand: {
            '@type': 'Brand',
            name: product.brandId.toUpperCase(),
          },
          offers: {
            '@type': 'Offer',
            price: product.priceCHF,
            priceCurrency: 'CHF',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            seller: {
              '@type': 'Organization',
              name: 'Schweizer FachhÃ¤ndler Netzwerk',
            },
          },
          // aggregateRating / review intentionally omitted: current ratings and test verdicts are
          // generated placeholder data. Re-enable only with real, attributable reviews.
        };
      }
      break;
    }

    case 'brand-root': {
      const brandRootLabel = lang === 'fr' ? 'Marques' : lang === 'it' ? 'Marchi' : 'Marken';
      breadcrumbs.push({ name: brandRootLabel, url: canonicalPath });
      title = lang === 'fr'
        ? 'Toutes les Marques de VÃ©los Ã‰lectriques en Suisse | VeloSuisse'
        : lang === 'it'
        ? 'Tutti i Marchi di E-Bike in Svizzera | VeloSvizzera'
        : 'Alle E-Bike Marken der Schweiz â€“ Scott, Flyer, Stromer, Cube u.v.m. | VeloSchweiz';
      description = 'Entdecken Sie die Top E-Bike Marken in der Schweiz: Schweizer Pioniere (Flyer, Stromer, Scott, BMC, ThÃ¶mus) und internationale MarktfÃ¼hrer.';
      break;
    }

    case 'brand': {
      if (route.brand) {
        const brandRootLabel = lang === 'fr' ? 'Marques' : lang === 'it' ? 'Marchi' : 'Marken';
        breadcrumbs.push({
          name: brandRootLabel,
          url: buildLocalizedUrl(lang, { lang, view: 'brand-root' }),
        });
        breadcrumbs.push({ name: route.brand.name, url: canonicalPath });

        title = `${route.brand.name} E-Bikes Schweiz â€“ ${route.brand.targetCount} Modelle & HÃ¤ndler | VeloSchweiz`;
        description = `${route.brand.description[lang]} Ãœbersicht aller ${route.brand.targetCount} Modelle, TCS Testnoten und Schweizer FachhÃ¤ndler.`;

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Brand',
          name: route.brand.name,
          description: route.brand.description[lang],
          url: canonicalUrl,
        };
      }
      break;
    }

    case 'brand-category': {
      if (route.brand && route.category) {
        const brandRootLabel = lang === 'fr' ? 'Marques' : lang === 'it' ? 'Marchi' : 'Marken';
        breadcrumbs.push({
          name: brandRootLabel,
          url: buildLocalizedUrl(lang, { lang, view: 'brand-root' }),
        });
        breadcrumbs.push({
          name: route.brand.name,
          url: buildLocalizedUrl(lang, { lang, view: 'brand', brand: route.brand }),
        });
        breadcrumbs.push({ name: route.category.name[lang], url: canonicalPath });

        const count = getBrandCategoryCount(route.brand.id, route.category.id);
        title = `${route.brand.name} ${route.category.name[lang]} Schweiz (${count} Modelle) | VeloSchweiz`;
        description = `Alle ${count} ${route.category.name[lang]} von ${route.brand.name} in der Schweiz. Vergleichen Sie Preise in CHF, Akkus und TCS Testberichte.`;
      }
      break;
    }

    case 'guide-root': {
      const guideRootLabel = lang === 'fr' ? 'Guide E-Bike' : lang === 'it' ? 'Guida E-Bike' : 'E-Bike Ratgeber';
      breadcrumbs.push({ name: guideRootLabel, url: canonicalPath });
      title = lang === 'fr'
        ? 'Guide & Conseils VÃ©lo Ã‰lectrique en Suisse (25 vs 45 km/h, Achat, Subventions) | VeloSuisse'
        : lang === 'it'
        ? 'Guida E-Bike Svizzera : Norme 25 vs 45 km/h, Acquisto, Manutenzione e Incentivi | VeloSvizzera'
        : 'Schweizer E-Bike Ratgeber 2026: Kaufberatung, Schweizer Recht (25 vs 45 km/h), Akku-Pflege & FÃ¶rdergelder';
      description = 'Expertenratgeber fÃ¼r Schweizer E-Biker: Alles zu ASTRA-Gesetzen, Helmpflicht, kantonalen FÃ¶rderbeitrÃ¤gen bis 1â€™000 CHF und RahmengrÃ¶ssen.';
      break;
    }

    case 'guide-cluster': {
      if (route.guideCluster) {
        const guideRootLabel = lang === 'fr' ? 'Guide' : lang === 'it' ? 'Guida' : 'Ratgeber';
        breadcrumbs.push({
          name: guideRootLabel,
          url: buildLocalizedUrl(lang, { lang, view: 'guide-root' }),
        });
        breadcrumbs.push({ name: route.guideCluster.title[lang], url: canonicalPath });
        title = `${route.guideCluster.title[lang]} â€“ Schweizer Expertenwissen | VeloSchweiz`;
        description = route.guideCluster.shortDesc[lang];
      }
      break;
    }

    case 'guide-detail': {
      ogType = 'article';
      if (route.guideCluster && route.guideArticle) {
        const guideRootLabel = lang === 'fr' ? 'Guide' : lang === 'it' ? 'Guida' : 'Ratgeber';
        breadcrumbs.push({
          name: guideRootLabel,
          url: buildLocalizedUrl(lang, { lang, view: 'guide-root' }),
        });
        breadcrumbs.push({
          name: route.guideCluster.title[lang],
          url: buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: route.guideCluster }),
        });
        breadcrumbs.push({ name: route.guideArticle.title[lang], url: canonicalPath });

        title = `${route.guideArticle.title[lang]} | VeloSchweiz Ratgeber`;
        description = route.guideArticle.excerpt[lang];

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.guideArticle.title[lang],
          description: route.guideArticle.excerpt[lang],
          datePublished: route.guideArticle.publishedDate,
          author: {
            '@type': 'Person',
            name: route.guideArticle.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'VeloSchweiz',
            logo: { '@type': 'ImageObject', url: `${origin}/logo.png` },
          },
        };
      }
      break;
    }

    case 'canton-subsidies': {
      breadcrumbs.push({
        name: lang === 'fr' ? 'Subventions cantonales' : lang === 'it' ? 'Incentivi cantonali' : 'Kantonale FÃ¶rderbeitrÃ¤ge',
        url: canonicalPath,
      });
      title = lang === 'fr'
        ? 'Subventions E-Bike par Canton en Suisse (Jusquâ€™Ã  1â€™000 CHF) | VeloSuisse'
        : lang === 'it'
        ? 'Incentivi E-Bike per Cantone in Svizzera (Fino a 1â€™000 CHF) | VeloSvizzera'
        : 'E-Bike FÃ¶rderbeitrÃ¤ge Schweiz: Alle Kantone & Gemeinden im Ãœberblick | VeloSchweiz';
      description = 'Bis zu 1â€™000 CHF Zuschuss fÃ¼r Ihr E-Bike oder Cargo-Velo: Ãœbersicht Ã¼ber FÃ¶rderprogramme in ZÃ¼rich, Bern, Basel, Genf, Waadt, Tessin u.v.m.';
      break;
    }

    case 'comparison': {
      breadcrumbs.push({
        name: lang === 'fr' ? 'Comparateur' : lang === 'it' ? 'Confronta' : 'E-Bike Vergleich',
        url: canonicalPath,
      });
      title = lang === 'fr'
        ? 'Comparateur de VÃ©los Ã‰lectriques en Suisse | VeloSuisse'
        : lang === 'it'
        ? 'Confronto E-Bike : Specifiche e Test a Confronto | VeloSvizzera'
        : 'E-Bike Vergleichstool: Vergleichen Sie bis zu 4 Modelle Seite an Seite | VeloSchweiz';
      description = 'Interaktiver E-Bike Modellvergleich: Motordrehmoment, AkkukapazitÃ¤t Wh, TCS Testergebnisse, Gewicht und Preise in CHF nebeneinander.';
      break;
    }

    case 'about': {
      title = 'Ãœber VeloSchweiz â€“ Die Schweizer E-Bike Plattform';
      description = 'VeloSchweiz ist die unabhÃ¤ngige Schweizer Vergleichs- und Informationsplattform fÃ¼r Elektrovelos, TCS-geprÃ¼fte QualitÃ¤t und FachhÃ¤ndler.';
      break;
    }

    case 'legal': {
      title = 'Impressum, Schweizer Datenschutz & Rechtliches | VeloSchweiz';
      description = 'Rechtliche Hinweise, Schweizer Datenschutzgesetz (DSG) und Impressum von VeloSchweiz.';
      break;
    }

    case 'search': {
      title = `Suche nach Â«${route.queryString}Â» â€“ VeloSchweiz`;
      description = `Suchergebnisse fÃ¼r Â«${route.queryString}Â» in der Schweizer E-Bike Datenbank.`;
      break;
    }

    default: {
      title = '404 â€“ Seite nicht gefunden | VeloSchweiz';
      description = 'Die angeforderte Seite existiert nicht auf VeloSchweiz.';
      break;
    }
  }

  // Append Breadcrumbs structured data if not home
  if (breadcrumbs.length > 1) {
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${origin}${b.url}`,
      })),
    };
    if (Array.isArray(jsonLd)) {
      jsonLd.push(breadcrumbLd);
    } else if (Object.keys(jsonLd).length > 0) {
      jsonLd = [jsonLd, breadcrumbLd];
    } else {
      jsonLd = breadcrumbLd;
    }
  }

  return {
    title,
    description,
    canonicalUrl,
    robots,
    hreflangs,
    breadcrumbs,
    jsonLd,
    ogType,
  };
}
