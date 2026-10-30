import { useState } from 'react';
import { SeoMeta } from '../types';
import { ParsedRoute } from '../utils/routes';
import { ShieldCheck, ShieldAlert, Code2, Globe, Link2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface SeoInspectorProps {
  seo: SeoMeta;
  route: ParsedRoute;
  currentUrl: string;
}

export function SeoInspector({ seo, route, currentUrl }: SeoInspectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'meta' | 'hreflang' | 'jsonld'>('meta');

  const isNoindex = seo.robots.includes('noindex');

  const copyJsonLd = () => {
    navigator.clipboard.writeText(JSON.stringify(seo.jsonLd, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xl transition-all border ${
            isNoindex
              ? 'bg-amber-950/90 text-amber-200 border-amber-600/60 hover:bg-amber-900'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-600/60 hover:bg-emerald-900'
          } backdrop-blur-md cursor-pointer`}
          title="Click to view live Search Engine Optimization (SEO) inspect panel"
        >
          {isNoindex ? <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          <span>SEO: <strong className="uppercase">{isNoindex ? 'NOINDEX' : 'INDEX'}</strong></span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-mono">
            {route.lang.toUpperCase()}
          </span>
        </button>
      ) : (
        <div className="w-[92vw] sm:w-[520px] max-h-[85vh] bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isNoindex ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                SEO Live Inspector (CH Multilingual)
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                isNoindex ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {seo.robots}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs px-2">
            <button
              onClick={() => setTab('meta')}
              className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                tab === 'meta' ? 'border-red-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Robots & Canonical
            </button>
            <button
              onClick={() => setTab('hreflang')}
              className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                tab === 'hreflang' ? 'border-red-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hreflang (DE, FR, IT)
            </button>
            <button
              onClick={() => setTab('jsonld')}
              className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                tab === 'jsonld' ? 'border-red-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Schema.org JSON-LD
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 overflow-y-auto space-y-4 text-xs">
            {tab === 'meta' && (
              <div className="space-y-3">
                {/* Indexing Reason */}
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Index Rule Evaluation:</span>
                    <span className="font-mono text-[10px] text-slate-400">View: {route.view}</span>
                  </div>
                  <p className="text-slate-300">
                    {isNoindex ? (
                      <span className="text-amber-300">
                        ⚠️ <strong>Noindex applied:</strong>{' '}
                        {route.hasFacets && 'Facet filter query applied (?motor, ?speed, etc.). '}
                        {route.page && route.page > 1 && 'Pagination page 2+ is excluded from index. '}
                        {route.view === 'search' && 'Internal search query page is noindexed. '}
                        {route.view === 'brand-category' && 'Brand x Type is under threshold (< 3 products). '}
                      </span>
                    ) : (
                      <span className="text-emerald-300">
                        ✅ <strong>Indexable:</strong> Canonical parent page for Swiss search engines (Google Schweiz).
                      </span>
                    )}
                  </p>
                </div>

                {/* Canonical */}
                <div>
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 font-semibold">
                    <Link2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Canonical Tag (&lt;link rel="canonical"&gt;)</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border border-slate-800 font-mono text-[11px] text-red-300 break-all select-all">
                    {seo.canonicalUrl}
                  </div>
                  {route.hasFacets && (
                    <div className="mt-1 text-[11px] text-slate-400">
                      ℹ️ Canonical self-cleans facet queries to point directly to the primary category URL.
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-semibold">Title ({seo.title.length} chars)</span>
                    <span className={seo.title.length <= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                      {seo.title.length <= 60 ? 'Optimal length' : 'May truncate in SERP'}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded border border-slate-700/60 text-slate-200">
                    {seo.title}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-semibold">Description ({seo.description.length} chars)</span>
                    <span className={seo.description.length <= 160 ? 'text-emerald-400' : 'text-amber-400'}>
                      {seo.description.length <= 160 ? 'Optimal (120-160)' : 'Longer than 160'}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded border border-slate-700/60 text-slate-300">
                    {seo.description}
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div>
                  <div className="font-semibold text-slate-400 mb-1">Breadcrumb Trail:</div>
                  <div className="flex flex-wrap gap-1 items-center font-mono text-[11px] text-slate-300 bg-black/30 p-2 rounded border border-slate-800">
                    {seo.breadcrumbs.map((b, i) => (
                      <span key={i} className="flex items-center gap-1">
                        {i > 0 && <span className="text-slate-600">/</span>}
                        <span className={i === seo.breadcrumbs.length - 1 ? 'text-red-400 font-semibold' : ''}>
                          {b.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'hreflang' && (
              <div className="space-y-3">
                <div className="text-slate-300">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Multilingual Alternate Hreflang Tags</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ensures Google Switzerland correctly routes Swiss-German (de-CH / x-default), Swiss-French (fr-CH), and Swiss-Italian (it-CH) users.
                  </p>
                </div>

                <div className="space-y-2">
                  {seo.hreflangs.map((hl) => (
                    <div key={hl.lang} className="p-2 bg-slate-800/80 rounded border border-slate-700 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-red-400">{hl.lang}</span>
                        {hl.lang === 'x-default' && (
                          <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-700">
                            Global Fallback
                          </span>
                        )}
                        {hl.lang === `de-CH` && route.lang === 'de' && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700">
                            Current
                          </span>
                        )}
                        {hl.lang === `fr-CH` && route.lang === 'fr' && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700">
                            Current
                          </span>
                        )}
                        {hl.lang === `it-CH` && route.lang === 'it' && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-slate-300 break-all select-all">
                        &lt;link rel="alternate" hreflang="{hl.lang}" href="{hl.href}" /&gt;
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'jsonld' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Schema.org Structured Data (JSON-LD)</span>
                  </div>
                  <button
                    onClick={copyJsonLd}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black/60 rounded-lg border border-slate-800 font-mono text-[10px] text-emerald-300 overflow-x-auto max-h-[300px] leading-relaxed">
                  {JSON.stringify(seo.jsonLd, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>🇨🇭 VeloSchweiz SEO Audit Tool</span>
            <span>URL: {currentUrl}</span>
          </div>
        </div>
      )}
    </div>
  );
}
