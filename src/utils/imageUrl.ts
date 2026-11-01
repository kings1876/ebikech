/**
 * Manufacturer images are hotlinked at their original (often 2000-4000 px, several MB) size.
 * sizedImage() asks the manufacturer CDN for a smaller rendition where the CDN supports it.
 * Unknown hosts are returned unchanged. Callers fall back to the original URL if the resized one fails.
 */
export function sizedImage(url: string, width: number): string {
  try {
    const u = new URL(url);
    const host = u.host;

    // Cube (Shopware): /media/<hash>/<file>.jpg -> /thumbnail/<hash>/<file>_WxH.jpg (400, 800 and 1920 exist)
    if (host === 'file.cube.eu') {
      // 800 px thumbnails weigh about 200 KB each, 400 px about a quarter of that: listing cards use the small one
      const size = width <= 640 ? 400 : width <= 1200 ? 800 : 1920;
      if (u.pathname.includes('/media/')) {
        u.pathname = u.pathname.replace('/media/', '/thumbnail/').replace(/\.(jpg|png|webp)$/i, `_${size}x${size}.$1`);
        return u.toString();
      }
      if (u.pathname.includes('/thumbnail/')) {
        u.pathname = u.pathname.replace(/_\d+x\d+\.(jpg|png|webp)$/i, `_${size}x${size}.$1`);
        return u.toString();
      }
      return url;
    }

    // Scott (Cloudinary): add a width + automatic format/quality transformation
    if (host === 'static.scott-sports.com' && u.pathname.includes('/image/upload/')) {
      u.pathname = u.pathname.replace('/image/upload/', `/image/upload/w_${width},f_auto,q_auto/`);
      return u.toString();
    }

    // Trek (Cloudinary): URLs already carry w_/h_ (4:3 pad); rescale both
    if (host === 'media.trekbikes.com') {
      const w = Math.min(width, 1360);
      return url.replace(/w_\d+,h_\d+/, `w_${w},h_${Math.round((w * 3) / 4)}`);
    }

    // Shopify CDN (BMC, Haibike)
    if (host === 'cdn.shopify.com') {
      u.searchParams.set('width', String(width));
      return u.toString();
    }

    // Cannondale (Widen embed): .../2000px@1x/...
    if (host === 'embed.widencdn.net') {
      // the .webp extension makes Widen serve WebP (about 10x smaller than the PNG)
      return url.replace(/\/\d+px@1x\//, `/${Math.min(width, 2000)}px@1x/`).replace(/\.png$/i, '.webp');
    }

    // Specialized
    if (host === 'resources.specialized.com') {
      u.searchParams.set('w', String(width));
      return u.toString();
    }

    // Stromer (Sanity)
    if (host === 'cdn.sanity.io') {
      u.searchParams.set('w', String(width));
      u.searchParams.set('auto', 'format');
      return u.toString();
    }
  } catch {
    // not a parseable URL: use as-is
  }
  return url;
}

/** Widths used across the UI */
export const IMG_CARD = 640;
export const IMG_DETAIL = 1100;
export const IMG_THUMB = 320;

/**
 * Hosts the Next.js image optimizer may fetch; keep in sync with images.remotePatterns in next.config.mjs.
 * Only the lead image of each bike goes through the optimizer (smaller WebP, served from our own domain);
 * the other gallery images are loaded from the manufacturer with sizedImage().
 */
export const OPTIMIZED_HOSTS = [
  'cdn.shopify.com',
  'embed.widencdn.net',
  'd1mo5ln9tjltxq.cloudfront.net',
  'file.cube.eu',
  'images2.giant-bicycles.com',
  'haibike.com',
  'resource.pon.bike',
  'assets.r-m.de',
  'static.scott-sports.com',
  'resources.specialized.com',
  'cdn.sanity.io',
  'thoemus.ch',
  'media.trekbikes.com',
];

/** URL of the optimized rendition of a manufacturer image; the original (sized) URL if its host is not allowed. */
export function optimizedImage(url: string, width: number): string {
  try {
    if (!OPTIMIZED_HOSTS.includes(new URL(url).host)) return sizedImage(url, width);
  } catch {
    return url;
  }
  return `/_next/image?url=${encodeURIComponent(sizedImage(url, IMG_DETAIL))}&w=${width}&q=75`;
}

/** srcset for optimized renditions at the given widths. */
export function optimizedSrcSet(url: string, widths: number[]): string {
  return widths.map((w) => `${optimizedImage(url, w)} ${w}w`).join(', ');
}

/** Widths the optimizer renders (all are in Next's default size lists). */
export const OPT_CARD = [384, 640];
export const OPT_DETAIL = [640, 750, 1080];
