// Taxonomy source of truth (DE default, FR, IT). Every route, hreflang set, breadcrumb,
// sitemap entry and nav link is generated from this file. Node `id`s are permanent.
// Targets sum to 500 products (categories and brands are two independent cuts of the same 500).

export const LOCALES = ['de', 'fr', 'it']
export const DEFAULT_LOCALE = 'de'
export const HREFLANG = { de: 'de-CH', fr: 'fr-CH', it: 'it-CH' }
export const PREFIX = { de: '', fr: '/fr', it: '/it' }

// Section roots for category / brand / guide trees
export const ROOTS = {
  catalog: { de: 'e-bikes', fr: 'velos-electriques', it: 'e-bike' },
  brands: { de: 'marken', fr: 'marques', it: 'marchi' },
  guides: { de: 'ratgeber', fr: 'guide', it: 'guida' },
}

// Layer 1: primary type (one per product). `target` = planned product count.
export const CATEGORIES = [
  {
    id: 'emtb', target: 130,
    slug: { de: 'e-mountainbikes', fr: 'vtt-electriques', it: 'mountain-bike-elettriche' },
    name: { de: 'E-Mountainbikes', fr: 'VTT électriques', it: 'Mountain bike elettriche' },
    children: [
      { id: 'emtb-hardtail', target: 45,
        slug: { de: 'e-hardtails', fr: 'vtt-semi-rigides', it: 'hardtail-elettriche' },
        name: { de: 'E-Hardtails', fr: 'VTT électriques semi-rigides', it: 'Hardtail elettriche' } },
      { id: 'emtb-fully', target: 85,
        slug: { de: 'e-fullys', fr: 'vtt-tout-suspendus', it: 'full-elettriche' },
        name: { de: 'E-Fullys', fr: 'VTT électriques tout-suspendus', it: 'Full-suspension elettriche' } },
    ],
  },
  {
    id: 'trekking', target: 100,
    slug: { de: 'e-trekkingbikes', fr: 'velos-trekking', it: 'trekking' },
    name: { de: 'E-Trekkingbikes', fr: 'Vélos de trekking électriques', it: 'E-Bike Trekking' },
  },
  {
    id: 'city', target: 90,
    slug: { de: 'e-citybikes', fr: 'velos-de-ville', it: 'city-bike' },
    name: { de: 'E-Citybikes', fr: 'Vélos de ville électriques', it: 'E-Bike City' },
  },
  {
    id: 'roadgravel', target: 50,
    slug: { de: 'e-rennvelos-gravel', fr: 'route-gravel', it: 'corsa-gravel' },
    name: { de: 'E-Rennvelos & Gravel', fr: 'Vélos de route et gravel électriques', it: 'E-Bike da corsa e gravel' },
  },
  {
    id: 'fast45', target: 45,
    slug: { de: 'schnelle-e-bikes', fr: 'rapides-45-kmh', it: 'veloci-45-kmh' },
    name: { de: 'Schnelle E-Bikes (45 km/h)', fr: 'Vélos électriques rapides (45 km/h)', it: 'E-Bike veloci (45 km/h)' },
  },
  {
    id: 'cargo', target: 35,
    slug: { de: 'e-lastenvelos', fr: 'velos-cargo', it: 'cargo' },
    name: { de: 'E-Lastenvelos', fr: 'Vélos cargo électriques', it: 'E-Bike Cargo' },
  },
  {
    id: 'folding', target: 25,
    slug: { de: 'e-faltvelos', fr: 'velos-pliants', it: 'pieghevoli' },
    name: { de: 'E-Faltvelos', fr: 'Vélos pliants électriques', it: 'E-Bike pieghevoli' },
  },
  {
    id: 'youth', target: 25,
    slug: { de: 'e-bikes-jugend', fr: 'velos-ados', it: 'ragazzi' },
    name: { de: 'E-Bikes Jugend', fr: 'Vélos électriques ados', it: 'E-Bike ragazzi' },
  },
]

// Layer 2: brands (slug identical in all languages). tier: A volume, B core, C niche/premium.
// Brand list chosen from Swiss market presence, NOT from published sales ranking
// (no public per-brand ranking exists). Confirm dealer/distribution rights per brand before listing.
export const BRANDS = [
  { id: 'cube', name: 'Cube', tier: 'A', target: 80 },
  { id: 'giant', name: 'Giant', tier: 'A', target: 50 },
  { id: 'scott', name: 'Scott', tier: 'A', target: 45 },
  { id: 'specialized', name: 'Specialized', tier: 'A', target: 45 },
  { id: 'flyer', name: 'Flyer', tier: 'A', target: 40 },
  { id: 'trek', name: 'Trek', tier: 'A', target: 40 },
  { id: 'bergamont', name: 'Bergamont', tier: 'B', target: 30 },
  { id: 'stromer', name: 'Stromer', tier: 'B', target: 25 },
  { id: 'riese-muller', name: 'Riese & Müller', tier: 'B', target: 25 },
  { id: 'haibike', name: 'Haibike', tier: 'B', target: 25 },
  { id: 'merida', name: 'Merida', tier: 'B', target: 25 },
  { id: 'kalkhoff', name: 'Kalkhoff', tier: 'B', target: 20 },
  { id: 'bmc', name: 'BMC', tier: 'C', target: 20 },
  { id: 'cannondale', name: 'Cannondale', tier: 'C', target: 15 },
  { id: 'thoemus', name: 'Thömus', tier: 'C', target: 10 },
  { id: 'bianchi', name: 'Bianchi', tier: 'C', target: 5 },
]

// Layer 3+: facets (filters only: NOT indexed, canonical to parent category).
export const FACETS = {
  speedClass: ['e-bike-25', 'e-bike-45'],
  motor: ['bosch', 'shimano-steps', 'brose', 'yamaha', 'fazua', 'other'],
  batteryWh: ['<500', '500-625', '625-750', '>750'],
  frameType: ['diamond', 'step-through', 'trapeze'],
  frameSize: ['XS', 'S', 'M', 'L', 'XL'],
  priceBandChf: ['<2000', '2000-3500', '3500-5000', '>5000'],
  useCase: ['commute', 'family', 'senior', 'beginner', 'touring'],
}

// Index policy: which node types become indexable landing pages.
export const INDEX_POLICY = {
  category: { index: true, canonical: 'self' },
  brand: { index: true, canonical: 'self' },
  categoryBrand: { index: true, minProducts: 3, canonical: 'self' },
  facet: { index: false, canonical: 'parent' },
  paginationPage2plus: { index: false, canonical: 'self' },
  search: { index: false },
}
