'use client';

import { useState } from 'react';

type Img = { url: string; alt: string; bg?: 'white' | 'black' };

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
export function CardImage({ images, name }: { images: Img[]; name: string }) {
  const [failed, setFailed] = useState(false);
  const first = images?.[0];
  if (!first || failed) {
    return <BikeFallback className="w-40 h-28 text-slate-400 drop-shadow-sm" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={first.url}
      alt={first.alt || name}
      width={320}
      height={224}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-contain"
    />
  );
}

/** Product detail gallery: large image, thumbnails, prev/next and keyboard support. */
export function ProductGallery({ images, name }: { images: Img[]; name: string }) {
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const list = (images || []).filter((i) => !broken[i.url]);
  const [index, setIndex] = useState(0);
  const current = list[Math.min(index, Math.max(0, list.length - 1))];

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
          src={current.url}
          alt={current.alt || name}
          width={1200}
          height={900}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setBroken((b) => ({ ...b, [current.url]: true }))}
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
                  src={img.url}
                  alt=""
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setBroken((b) => ({ ...b, [img.url]: true }))}
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
