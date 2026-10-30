export type Language = 'de' | 'fr' | 'it';

export interface LocalizedString {
  de: string;
  fr: string;
  it: string;
}

export interface CategoryDef {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
  targetCount: number;
  subcategories?: SubcategoryDef[];
  icon: string;
  description: LocalizedString;
}

export interface SubcategoryDef {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
  targetCount: number;
  parentId: string;
}

export type BrandTier = 'A' | 'B' | 'C';

export interface BrandDef {
  id: string;
  name: string;
  slug: string; // Same in all languages
  tier: BrandTier;
  targetCount: number;
  country: string;
  isSwiss?: boolean;
  tagline: LocalizedString;
  description: LocalizedString;
  headquarters: string;
  swissServiceHub: string;
  logoText: string;
}

export type SpeedClass = 'e-bike-25' | 'e-bike-45';
export type MotorBrand = 'Bosch' | 'Shimano Steps' | 'Brose' | 'Yamaha' | 'Fazua' | 'Stromer CYRO' | 'Specialized' | 'TQ' | 'Mahle' | 'Other';
export type BatteryBracket = '<500' | '500-625' | '625-750' | '>750';
export type FrameType = 'diamond' | 'step-through' | 'trapeze';
export type FrameSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type PriceBracket = '<2000' | '2000-3500' | '3500-5000' | '>5000';
export type UseCase = 'commute' | 'family' | 'senior' | 'beginner' | 'touring';

export interface TestVerdict {
  source: 'TCS' | 'Kassensturz' | 'Velojournal' | 'E-MTB Magazine' | 'Stiftung Warentest' | 'Radfahren.de';
  scoreText: string;
  numericScore: number; // 0-100 or 1-6
  maxScore: number;
  badge: string;
  year: number;
  summary: LocalizedString;
  pros: string[];
  cons: string[];
}

export type ReviewPlatform = 'Trustpilot' | 'Google' | 'SwissVeloRegistry';

export interface UserReview {
  id: string;
  sourcePlatform: ReviewPlatform;
  author: string;
  canton: string; // e.g. "ZH", "BE", "VD", "TI"
  kmRidden: number;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  verifiedPurchase: boolean;
  orderRef?: string;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  slug: string; // brand-model slug
  name: string;
  brandId: string;
  categoryId: string;
  subcategoryId?: string;
  speedClass: SpeedClass;
  speedMaxKmH: 25 | 45;
  priceCHF: number;
  motorBrand: MotorBrand;
  motorModel: string;
  torqueNm: number | null;
  batteryWh: number;
  batteryBracket: BatteryBracket;
  batteryRemovable: boolean;
  rangeKmEst?: { min: number; max: number };
  frameType: FrameType;
  frameMaterial: string;
  frameSizes: string[];
  weightKg: number | null;
  useCase: UseCase[];
  priceBracket: PriceBracket;
  imageUrl: string;
  shortDesc: LocalizedString;
  testVerdicts: TestVerdict[];
  userReviews: UserReview[];
  ratingAverage: number;
  reviewCount: number;
  trustpilotStats?: {
    score: number;
    reviewCount: number;
    badgeText: LocalizedString;
  };
  year: number;
  specs: {
    gears: string;
    brakes: string;
    fork: string;
    display: string;
    tires: string;
    lighting: string;
    cargoRackKg?: number;
  };
  // Real-product sourcing data
  description?: string;
  features?: string[];
  colours?: string[];
  sourceUrl: string;
  priceNote?: string;
  /** True when the sourced price is a "from" (ab) price for the cheapest variant. */
  priceFrom?: boolean;
  /** True when the CHF price is the German EUR list price converted at the ECB rate. */
  priceEstimated?: boolean;
  /** Official manufacturer image URLs. Not displayed until usage rights are confirmed. */
  imageSources: { url: string; alt: string }[];
}

export interface FacetFilters {
  speedClass?: SpeedClass[];
  motor?: MotorBrand[];
  batteryWh?: BatteryBracket[];
  frameType?: FrameType[];
  frameSize?: FrameSize[];
  price?: PriceBracket[];
  useCase?: UseCase[];
  minScore?: number;
  minTrustScore?: number;
  searchQuery?: string;
}

export interface GuideCluster {
  id: 'kaufberatung' | 'recht-sicherheit' | 'nutzung-pflege' | 'kosten-foerderung';
  slug: LocalizedString;
  title: LocalizedString;
  shortDesc: LocalizedString;
  guides: GuideArticle[];
}

export interface GuideArticle {
  id: string;
  clusterId: string;
  slug: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  readTimeMin: number;
  publishedDate: string;
  author: string;
  content: LocalizedString; // Markdown or rich HTML-friendly text
  keyTakeaways: LocalizedString[];
  faqs?: { q: LocalizedString; a: LocalizedString }[];
}

export interface CantonSubsidy {
  cantonCode: string; // "ZH", "BE", "BS", "GE", etc.
  cantonName: string;
  amountCHF: string;
  eligibleTypes: string;
  conditions: LocalizedString;
  officialLinkText: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: 'index, follow' | 'noindex, follow';
  hreflangs: { lang: string; href: string }[];
  breadcrumbs: { name: string; url: string }[];
  jsonLd: Record<string, unknown> | Array<Record<string, unknown>>;
  ogType: 'website' | 'article' | 'product';
}
