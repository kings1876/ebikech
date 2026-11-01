import { SeoMeta, Language, Product } from '../types';
import { ParsedRoute, buildLocalizedUrl, getHreflangs, getBrandCategoryCount } from './routes';
import { ALL_PRODUCTS } from '../data/products';
import { FAQ_ITEMS } from '../data/faq';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { SITE_NAME, DOMAIN, TAGLINE } from '../config/brand';
import { categorySeo, brandSeo, brandCategorySeo, productSeo, collectionSeo, faqJsonLd, catalogueStats, fitTitle, fitDescription } from './seoText';

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

  if (route.view === 'collection' && route.collection) {
    if (ALL_PRODUCTS.filter(route.collection.filter).length < 3) robots = 'noindex, follow';
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

  let title = `${SITE_NAME.de} – E-Bikes für die Schweiz`;
  let description = 'E-Bikes mit Preisen in CHF und technischen Daten für die Schweiz.';
  let ogType: 'website' | 'article' | 'product' = 'website';
  let jsonLd: Record<string, unknown> | Array<Record<string, unknown>> = {};

  switch (route.view) {
    case 'home': {
      {
        const s = catalogueStats();
        const top = s.topBrands.slice(0, 3).join(', ');
        if (lang === 'fr') {
          title = `E-Bikes à vendre en Suisse : ${top}`;
          description = fitDescription(`${s.count} vélos électriques de ${s.brandCount} marques : VTT, trekking, ville, gravel et cargo. Prix en CHF, moteur, batterie et fiches techniques.`);
        } else if (lang === 'it') {
          title = `E-Bike in vendita in Svizzera: ${top}`;
          description = fitDescription(`${s.count} biciclette elettriche (e-bike) di ${s.brandCount} marchi: mountain bike, trekking, city, gravel e cargo. Prezzi in CHF, motore, batteria e dati tecnici.`);
        } else {
          title = `E-Bikes zu verkaufen Schweiz: ${top}`;
          description = fitDescription(`${s.count} E-Bikes von ${s.brandCount} Marken: E-Mountainbikes, Trekking, City, Gravel und Cargo. Preise in CHF, Motor, Akku und technische Daten.`);
        }
      }
      jsonLd = [{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME[lang],
        alternateName: DOMAIN,
        url: `${origin}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }, {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME[lang],
        url: `${origin}/`,
        logo: { '@type': 'ImageObject', url: `${origin}/logo.png`, width: 512, height: 512 },
        description: TAGLINE[lang],
        areaServed: { '@type': 'Country', name: 'CH' },
        knowsLanguage: ['de-CH', 'fr-CH', 'it-CH'],
      }];
      break;
    }

    case 'catalog-root': {
      const catRootLabel = lang === 'fr' ? 'Vélos électriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes';
      breadcrumbs.push({ name: catRootLabel, url: canonicalPath });

      {
        const s = catalogueStats();
        if (lang === 'fr') {
          title = fitTitle(`Vélos électriques en Suisse – ${s.count} modèles`, lang);
          description = fitDescription(`Catalogue de ${s.count} vélos électriques de ${s.brandCount} marques dès CHF ${s.minPrice.toLocaleString('de-CH')} : VTT, trekking, ville, gravel, cargo. Fiches techniques et prix.`);
        } else if (lang === 'it') {
          title = fitTitle(`Biciclette elettriche in Svizzera – ${s.count} modelli`, lang);
          description = fitDescription(`Catalogo di ${s.count} e-bike di ${s.brandCount} marchi da CHF ${s.minPrice.toLocaleString('de-CH')}: mountain bike, trekking, city, gravel, cargo. Dati tecnici e prezzi.`);
        } else {
          title = fitTitle(`E-Bikes kaufen Schweiz – ${s.count} Modelle`, lang);
          description = fitDescription(`Katalog mit ${s.count} E-Bikes von ${s.brandCount} Marken ab CHF ${s.minPrice.toLocaleString('de-CH')}: E-Mountainbike, Trekking, City, Gravel, Cargo. Technische Daten und Preise.`);
        }
      }
      break;
    }

    case 'category': {
      if (route.category) {
        const catName = route.category.name[lang];
        breadcrumbs.push({
          name: lang === 'fr' ? 'Vélos électriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({ name: catName, url: canonicalPath });

        {
          const cs = categorySeo(route.category.id, lang);
          title = cs.title;
          description = cs.description;
        }

        const categoryFaq = faqJsonLd(route.category.id, lang);
        const categoryPage = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
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
        jsonLd = categoryFaq ? [categoryPage, categoryFaq] : categoryPage;
      }
      break;
    }

    case 'collection': {
      if (route.collection) {
        breadcrumbs.push({
          name: lang === 'fr' ? 'Vélos électriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({ name: route.collection.name[lang], url: canonicalPath });
        const cs = collectionSeo(route.collection, lang);
        title = cs.title;
        description = cs.description;
        const collectionPage = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url: canonicalUrl,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: ALL_PRODUCTS.filter(route.collection.filter)
              .slice(0, 10)
              .map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: p.name,
                url: `${origin}${buildLocalizedUrl(lang, { lang, view: 'product', category: CATEGORIES.find((c) => c.id === p.categoryId), productSlug: p.slug })}`,
              })),
          },
        };
        const collectionFaq = faqJsonLd(route.collection.id, lang);
        jsonLd = collectionFaq ? [collectionPage, collectionFaq] : collectionPage;
      }
      break;
    }

    case 'subcategory': {
      if (route.category && route.subcategorySlug) {
        const sub = route.category.subcategories?.find((s) => s.id === route.subcategorySlug);
        const subName = sub ? sub.name[lang] : route.subcategorySlug;
        const catName = route.category.name[lang];

        breadcrumbs.push({
          name: lang === 'fr' ? 'Vélos électriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({
          name: catName,
          url: buildLocalizedUrl(lang, { lang, view: 'category', category: route.category }),
        });
        breadcrumbs.push({ name: subName, url: canonicalPath });

        const subCount = ALL_PRODUCTS.filter((p) => p.categoryId === route.category!.id && p.subcategoryId === route.subcategorySlug).length;
        title = fitTitle(lang === 'fr' ? `${subName} en Suisse – ${subCount} modèles` : lang === 'it' ? `${subName} in Svizzera – ${subCount} modelli` : `${subName} Schweiz – ${subCount} Modelle`, lang);
        description = fitDescription(lang === 'fr' ? `${subName} : ${subCount} modèles du catalogue suisse. Comparez moteur, batterie, poids et prix en CHF.` : lang === 'it' ? `${subName}: ${subCount} modelli del catalogo svizzero. Confronta motore, batteria, peso e prezzi in CHF.` : `${subName}: ${subCount} Modelle im Schweizer E-Bike Katalog. Vergleichen Sie Motor, Akku, Gewicht und Preise in CHF.`);
      }
      break;
    }

    case 'product': {
      ogType = 'product';
      const product = ALL_PRODUCTS.find((p) => p.slug === route.productSlug);
      if (product && route.category) {
        const catName = route.category.name[lang];
        breadcrumbs.push({
          name: lang === 'fr' ? 'Vélos électriques' : lang === 'it' ? 'E-Bike' : 'E-Bikes',
          url: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }),
        });
        breadcrumbs.push({
          name: catName,
          url: buildLocalizedUrl(lang, { lang, view: 'category', category: route.category }),
        });
        breadcrumbs.push({ name: product.name, url: canonicalPath });

        {
          const ps = productSeo(product, lang);
          title = ps.title;
          description = ps.description;
        }

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: (product.images || []).map((i) => i.url).slice(0, 6),
          description,
          brand: {
            '@type': 'Brand',
            name: BRANDS.find((b) => b.id === product.brandId)?.name || product.brandId,
          },
          offers: {
            '@type': 'Offer',
            price: product.priceCHF,
            priceCurrency: 'CHF',
            availability: 'https://schema.org/InStock',
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            seller: {
              '@type': 'Organization',
              name: SITE_NAME[lang],
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
      title = fitTitle(lang === 'fr' ? 'Marques de vélos électriques en Suisse' : lang === 'it' ? 'Marchi di e-bike in Svizzera' : 'E-Bike Marken Schweiz: Cube, Scott, Trek u.v.m.', lang);
      { const s = catalogueStats(); description = fitDescription(lang === 'fr' ? `${s.brandCount} marques de vélos électriques : ${s.topBrands.slice(0, 5).join(', ')} et d’autres. Prix en CHF et fiches techniques.` : lang === 'it' ? `${s.brandCount} marchi di e-bike: ${s.topBrands.slice(0, 5).join(', ')} e altri. Prezzi in CHF e dati tecnici.` : `${s.brandCount} E-Bike Marken: ${s.topBrands.slice(0, 5).join(', ')} u.a. Preise in CHF und technische Daten zu jedem Modell.`); }
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

        {
          const bs = brandSeo(route.brand.id, lang);
          title = bs.title;
          description = bs.description;
        }

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

        const bcs = brandCategorySeo(route.brand.id, route.category.id, lang);
        title = bcs.title;
        description = bcs.description;
      }
      break;
    }

    case 'guide-root': {
      const guideRootLabel = lang === 'fr' ? 'Guide E-Bike' : lang === 'it' ? 'Guida E-Bike' : 'E-Bike Ratgeber';
      breadcrumbs.push({ name: guideRootLabel, url: canonicalPath });
      title = lang === 'fr'
        ? `Guide & Conseils Vélo Électrique en Suisse (25 vs 45 km/h, Achat, Subventions) | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `Guida E-Bike Svizzera : Norme 25 vs 45 km/h, Acquisto, Manutenzione e Incentivi | ${SITE_NAME.it}`
        : 'Schweizer E-Bike Ratgeber 2026: Kaufberatung, Schweizer Recht (25 vs 45 km/h), Akku-Pflege & Fördergelder';
      description = lang === 'fr'
        ? 'Guides pour cyclistes électriques en Suisse : règles 25 vs 45 km/h, casque, entretien de la batterie, taille du cadre et subventions.'
        : lang === 'it'
        ? 'Guide per chi usa la e-bike in Svizzera: norme 25 vs 45 km/h, casco, cura della batteria, taglia del telaio e incentivi.'
        : 'Ratgeber für E-Biker in der Schweiz: Regeln für 25 und 45 km/h, Helm, Akku-Pflege, Rahmengrösse und Förderbeiträge.';
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
        title = fitTitle(route.guideCluster.title[lang], lang);
        description = fitDescription(route.guideCluster.shortDesc[lang]);
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

        title = fitTitle(route.guideArticle.title[lang], lang);
        description = fitDescription(route.guideArticle.excerpt[lang]);

        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.guideArticle.title[lang],
          description: route.guideArticle.excerpt[lang],
          datePublished: route.guideArticle.publishedDate,
          author: { '@type': 'Organization', name: SITE_NAME[lang] },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME[lang],
            logo: { '@type': 'ImageObject', url: `${origin}/logo.png` },
          },
        };
      }
      break;
    }

    case 'blog-root': {
      breadcrumbs.push({ name: 'Blog', url: canonicalPath });
      title = lang === 'fr'
        ? `Guides d’achat vélo électrique | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `Guide all’acquisto e-bike | ${SITE_NAME.it}`
        : `E-Bike Kaufberatung Schweiz: Ratgeber | ${SITE_NAME.de}`;
      description = lang === 'fr'
        ? 'Guides d’achat pour vélos électriques en Suisse : VTT, 45 km/h, vélos femme – critères de choix, modèles et prix en CHF.'
        : lang === 'it'
        ? 'Guide all’acquisto di e-bike in Svizzera: mountain bike, 45 km/h, e-bike donna – criteri di scelta, modelli e prezzi in CHF.'
        : 'Kaufberatung für E-Bikes in der Schweiz: E-Mountainbike, 45 km/h, Damen-E-Bike – Auswahlkriterien, Modelle und Preise in CHF.';
      break;
    }

    case 'blog-post': {
      ogType = 'article';
      if (route.blogPost) {
        const portal = SITE_NAME[lang];
        breadcrumbs.push({ name: 'Blog', url: buildLocalizedUrl(lang, { lang, view: 'blog-root' }) });
        breadcrumbs.push({ name: route.blogPost.title[lang], url: canonicalPath });
        title = fitTitle(route.blogPost.title[lang], lang);
        description = fitDescription(route.blogPost.excerpt[lang]);
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.blogPost.title[lang],
          description: route.blogPost.excerpt[lang],
          inLanguage: lang === 'fr' ? 'fr-CH' : lang === 'it' ? 'it-CH' : 'de-CH',
          datePublished: route.blogPost.publishedDate,
          dateModified: route.blogPost.publishedDate,
          mainEntityOfPage: `${origin}${canonicalPath}`,
          author: { '@type': 'Organization', name: portal },
          publisher: { '@type': 'Organization', name: portal },
        };
      }
      break;
    }

    case 'contact': {
      breadcrumbs.push({ name: lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt', url: canonicalPath });
      title = lang === 'fr'
        ? `Contact : questions sur nos vélos électriques | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `Contatti: domande sulle nostre e-bike | ${SITE_NAME.it}`
        : `Kontakt: Fragen zu unseren E-Bikes | ${SITE_NAME.de}`;
      description = lang === 'fr'
        ? 'Une question sur un modèle, une taille ou un prix ? Contactez-nous : nous vous répondons dès que possible.'
        : lang === 'it'
        ? 'Domande su un modello, una taglia o un prezzo? Contattateci: vi rispondiamo il prima possibile.'
        : 'Fragen zu einem Modell, zur Grösse oder zum Preis? Kontaktieren Sie uns – wir melden uns so rasch wie möglich.';
      break;
    }

    case 'faq': {
      breadcrumbs.push({ name: 'FAQ', url: canonicalPath });
      title = lang === 'fr'
        ? `FAQ vélo électrique en Suisse | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `FAQ e-bike in Svizzera | ${SITE_NAME.it}`
        : `FAQ: E-Bikes in der Schweiz | ${SITE_NAME.de}`;
      description = lang === 'fr'
        ? 'Réponses sur e-bike 25 et 45, casque et permis, autonomie, entretien de la batterie, taille du cadre et prix.'
        : lang === 'it'
        ? 'Risposte su e-bike 25 e 45, casco e licenza, autonomia, cura della batteria, taglia del telaio e prezzi.'
        : 'Antworten zu E-Bike 25 und 45, Helm und Führerausweis, Reichweite, Akku-Pflege, Rahmengrösse und Preisen.';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang === 'fr' ? 'fr-CH' : lang === 'it' ? 'it-CH' : 'de-CH',
        mainEntity: FAQ_ITEMS.map((f) => ({
          '@type': 'Question',
          name: f.q[lang],
          acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
        })),
      };
      break;
    }

    case 'canton-subsidies': {
      breadcrumbs.push({
        name: lang === 'fr' ? 'Subventions cantonales' : lang === 'it' ? 'Incentivi cantonali' : 'Kantonale Förderbeiträge',
        url: canonicalPath,
      });
      title = lang === 'fr'
        ? `Subventions e-bike par canton en Suisse | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `Incentivi e-bike per cantone in Svizzera | ${SITE_NAME.it}`
        : `E-Bike Förderbeiträge Schweiz nach Kanton | ${SITE_NAME.de}`;
      description = lang === 'fr'
        ? 'Aperçu des programmes de subventions cantonaux et communaux pour vélos électriques et vélos cargo en Suisse.'
        : lang === 'it'
        ? 'Panoramica dei programmi di incentivi cantonali e comunali per e-bike e cargo bike in Svizzera.'
        : 'Übersicht über kantonale und kommunale Förderprogramme für E-Bikes und Cargo-Velos in der Schweiz.';
      break;
    }

    case 'comparison': {
      breadcrumbs.push({
        name: lang === 'fr' ? 'Comparateur' : lang === 'it' ? 'Confronta' : 'E-Bike Vergleich',
        url: canonicalPath,
      });
      title = lang === 'fr'
        ? `Comparateur de Vélos Électriques en Suisse | ${SITE_NAME.fr}`
        : lang === 'it'
        ? `Confronto E-Bike : Specifiche e Test a Confronto | ${SITE_NAME.it}`
        : `E-Bike Vergleichstool: Vergleichen Sie bis zu 4 Modelle Seite an Seite | ${SITE_NAME.de}`;
      description = 'Interaktiver E-Bike Modellvergleich: Motordrehmoment, Akkukapazität Wh, Gewicht und Preise in CHF nebeneinander.';
      break;
    }

    case 'about': {
      title = lang === 'fr' ? `À propos de ${SITE_NAME.fr} – vélos électriques en Suisse` : lang === 'it' ? `Chi siamo – ${SITE_NAME.it}, e-bike in Svizzera` : `Über ${SITE_NAME.de} – E-Bikes für die Schweiz`;
      description = lang === 'fr' ? `${SITE_NAME.fr} : vélos électriques avec prix en CHF, fiches techniques et conseils pour la Suisse.` : lang === 'it' ? `${SITE_NAME.it}: e-bike con prezzi in CHF, dati tecnici e consulenza per la Svizzera.` : `${SITE_NAME.de}: E-Bikes mit Preisen in CHF, technischen Daten und Beratung für die Schweiz.`;
      break;
    }

    case 'legal': {
      title = lang === 'fr' ? `Mentions légales et protection des données | ${SITE_NAME.fr}` : lang === 'it' ? `Note legali e protezione dei dati | ${SITE_NAME.it}` : `Impressum, Datenschutz & Rechtliches | ${SITE_NAME.de}`;
      description = lang === 'fr' ? `Mentions légales, protection des données (LPD) et informations sur l’éditeur de ${SITE_NAME.fr}.` : lang === 'it' ? `Note legali, protezione dei dati (LPD) e informazioni sull’editore di ${SITE_NAME.it}.` : `Rechtliche Hinweise, Schweizer Datenschutzgesetz (DSG) und Impressum von ${SITE_NAME.de}.`;
      break;
    }

    case 'search': {
      title = `Suche nach «${route.queryString}» – ${SITE_NAME[lang]}`;
      description = `Suchergebnisse für «${route.queryString}» im E-Bike Katalog.`;
      break;
    }

    default: {
      title = `404 – Seite nicht gefunden | ${SITE_NAME.de}`;
      description = `Die angeforderte Seite existiert nicht auf ${SITE_NAME.de}.`;
      break;
    }
  }

  // Keep titles within the length budget: drop the brand suffix when it would push the title over 60 characters
  const brandSuffix = `| ${SITE_NAME[lang]}`;
  if (title.length > 60 && title.endsWith(brandSuffix)) title = title.slice(0, -brandSuffix.length).trimEnd();

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
