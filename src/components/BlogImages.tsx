'use client';

import { ReactNode, useState } from 'react';
import { Product } from '../types';
import { sizedImage, optimizedImage, optimizedSrcSet, OPT_CARD, OPT_DETAIL, IMG_CARD, IMG_DETAIL } from '../utils/imageUrl';

/**
 * Real catalogue photo inside a blog post, served from our own image optimizer (WebP, srcset, cached for a year).
 * stage 0: optimized copy, 1: manufacturer rendition, 2: manufacturer original; if all fail the figure is dropped.
 */
export function BlogPhoto({ product, alt, caption, hero = false }: { product: Product; alt: string; caption: ReactNode; hero?: boolean }) {
  const [stage, setStage] = useState(0);
  const first = product.images?.[0];
  if (!first || stage > 2) return null;
  const widths = hero ? OPT_DETAIL : OPT_CARD;
  const src = stage === 0 ? optimizedImage(first.url, hero ? 750 : 640) : stage === 1 ? sizedImage(first.url, hero ? IMG_DETAIL : IMG_CARD) : first.url;
  return (
    <figure className={hero ? 'space-y-2' : 'k767'}>
      <div className={`k768 ${first.bg === 'black' ? 'bg-black' : 'bg-white'} ${hero ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={stage === 0 ? optimizedSrcSet(first.url, widths) : undefined}
          sizes={hero ? '(min-width: 768px) 720px, calc(100vw - 2rem)' : '(min-width: 768px) 352px, calc(50vw - 1.5rem)'}
          alt={alt}
          width={hero ? 1280 : 640}
          height={hero ? 720 : 480}
          loading={hero ? 'eager' : 'lazy'}
          fetchPriority={hero ? 'high' : undefined}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setStage((s) => s + 1)}
          className="w-full h-full object-contain"
        />
      </div>
      <figcaption className="text-xs text-slate-600">{caption}</figcaption>
    </figure>
  );
}
