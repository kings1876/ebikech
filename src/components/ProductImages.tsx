'use client';

import { useRef, useState } from 'react';
import { preconnect } from 'react-dom';
import { sizedImage, IMG_CARD, IMG_DETAIL, IMG_THUMB } from '../utils/imageUrl';

type Img = { url: string; alt: string; bg?: 'white' | 'black' };

/** Open the connection to an image host early (React 19 hoists this into <head>). */
function connectTo(src: string) {
  try {
    preconnect(new URL(src).origin);
  } catch {
    // relative or invalid URL: nothing to connect to
  }
}

function BikeFallback({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="45" cy="85" r="30" />
      <circle cx="45" cy="85" r="4" fill="currentColor" />
      <circle cx="155" cy="85" r="30" />
      <circle cx="155" cy="85" r="4" fill="currentColor" />
      <path d="M45 85 L85 85 L125 45 L155 85" strokeWidth="5" />
      <path d="M85 85 L105 45 L45 85" strokeWidth="5" />
      <path d="M105 45 L135 45" strokeWidth="5" />
      <path d="M145 32 L155 85" strokeWidth="5" />
      <path d="M140 28 L152 28" strokeWidth="6" />
      <path d="M85 85 L100 35" strokeWidth="5" />
      <path d="M90 35 L112 35" strokeWidth="7" />
    </svg>
  );
}

/** Small product image for listing cards; falls back to the bike drawing if the image fails. */
export function CardImage({ images, name, priority = false }: { images: Img[]; name: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [original, setOriginal] = useState(false);
  const first = images?.[0];
  if (!first || failed) {
    return <BikeFallback className="w-40 h-28 text-slate-400 drop-shadow-sm" />;
  }
  const src = original ? first.url : sizedImage(first.url, IMG_CARD);
  if (priority) connectTo(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={first.alt || name}
      width={320}
      height={224}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => (src !== first.url ? setOriginal(true) : setFailed(true))}
      className="w-full h-full object-contain"
    />
  );
}

/** Product detail gallery: large image, thumbnails, prev/next and keyboard support. */
export function ProductGallery({ images, name }: { images: Img[]; name: string }) {
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [orig, setOrig] = useState<Record<string, boolean>>({});
  const list = (images || []).filter((i) => !broken[i.url]);
  const [index, setIndex] = useState(0);
  const failImg = (url: string) => (orig[url] || sizedImage(url, IMG_DETAIL) === url ? setBroken((b) => ({ ...b, [url]: true })) : setOrig((o) => ({ ...o, [url]: true })));
  const current = list[Math.min(index, Math.max(0, list.length - 1))];
  if (current) connectTo(current.url);

  if (!current) {
    return (
      <div className="w-72 h-48 sm:w-96 sm:h-64 flex items-center justify-center text-slate-800 py-6">
        <BikeFallback className="w-full h-full drop-shadow-md" />
      </div>
    );
  }

  const go = (d: number) => setIndex((i) => (i + d + list.length) % list.length);

  return (
    <div
      className="w-full"
      role="group"
      aria-roledescription="carousel"
      aria-label={name}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className={`relative w-full aspect-[4/3] rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden ${current.bg === 'black' ? 'bg-black' : 'bg-white'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.url}
          src={orig[current.url] ? current.url : sizedImage(current.url, IMG_DETAIL)}
          alt={current.alt || name}
          width={1200}
          height={900}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => failImg(current.url)}
          className="max-w-full max-h-full object-contain"
        />
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-sm text-slate-700 hover:bg-white cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-sm text-slate-700 hover:bg-white cursor-pointer"
            >
              ›
            </button>
            <span className="absolute bottom-2 right-3 text-[11px] font-mono bg-slate-900/70 text-white px-2 py-0.5 rounded-full">
              {Math.min(index, list.length - 1) + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2" aria-label="Gallery">
          {list.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Image ${i + 1}`}
                aria-current={i === Math.min(index, list.length - 1)}
                className={`block w-full aspect-[4/3] rounded-lg border ${img.bg === 'black' ? 'bg-black' : 'bg-white'} overflow-hidden cursor-pointer ${
                  i === Math.min(index, list.length - 1) ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={orig[img.url] ? img.url : sizedImage(img.url, IMG_THUMB)}
                  alt=""
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => failImg(img.url)}
                  className="w-full h-full object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Image carousel for listing cards: arrows, dots, swipe on touch, keyboard arrows; preloads on first interaction. */
export function CardGallery({ images, name, priority = false }: { images: Img[]; name: string; priority?: boolean }) {
  const [i, setI] = useState(0);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [orig, setOrig] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
  const preloaded = useRef(false);
  const list = (images || []).filter((x) => !broken[x.url]);
  const idx = Math.min(i, Math.max(0, list.length - 1));

  if (!list.length) {
    return <BikeFallback className="w-40 h-28 text-slate-400 drop-shadow-sm" />;
  }

  const preload = () => {
    if (preloaded.current) return;
    preloaded.current = true;
    for (const im of list) {
      const el = new Image();
      el.referrerPolicy = 'no-referrer';
      el.src = sizedImage(im.url, IMG_CARD);
    }
  };
  const go = (d: number) => setI((idx + d + list.length) % list.length);
  const arrow =
    'absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-sm text-slate-700 text-lg leading-none flex items-center justify-center cursor-pointer hover:bg-white transition-opacity opacity-0 group-hover/gal:opacity-100 focus:opacity-100 [@media(hover:none)]:opacity-100';

  return (
    <div
      className="relative w-full h-full group/gal"
      role="group"
      aria-roledescription="carousel"
      aria-label={name}
      onMouseEnter={preload}
      onFocus={preload}
      onTouchStart={(e) => {
        preload();
        touchX.current = e.touches[0].clientX;
        swiped.current = false;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) {
          swiped.current = true;
          go(dx < 0 ? 1 : -1);
        }
      }}
      onClickCapture={(e) => {
        // a swipe must not count as a tap on the card
        if (swiped.current) {
          e.stopPropagation();
          swiped.current = false;
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.stopPropagation(); go(1); }
        if (e.key === 'ArrowLeft') { e.stopPropagation(); go(-1); }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={list[idx].url}
        src={orig[list[idx].url] ? list[idx].url : sizedImage(list[idx].url, IMG_CARD)}
        alt={list[idx].alt || name}
        width={480}
        height={320}
        loading={idx === 0 && !priority ? 'lazy' : 'eager'}
        fetchPriority={idx === 0 && priority ? 'high' : undefined}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          const u = list[idx].url;
          if (!orig[u] && sizedImage(u, IMG_CARD) !== u) setOrig((o) => ({ ...o, [u]: true }));
          else setBroken((b) => ({ ...b, [u]: true }));
        }}
        className="w-full h-full object-contain"
      />
      {list.length > 1 && (
        <>
          <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }} className={arrow + ' left-0'}>‹</button>
          <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }} className={arrow + ' right-0'}>›</button>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5">
            {list.map((im, n) => (
              <button
                key={im.url}
                type="button"
                aria-label={`Image ${n + 1}`}
                aria-current={n === idx}
                onClick={(e) => { e.stopPropagation(); setI(n); }}
                className="h-6 min-w-6 flex items-center justify-center cursor-pointer"
              >
                <span className={`block h-1.5 rounded-full transition-all ${n === idx ? 'w-4 bg-red-600' : 'w-1.5 bg-slate-400'}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
