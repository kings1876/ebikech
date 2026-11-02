import { useState } from 'react';
import { SeoMeta } from '../types';
import { ParsedRoute } from '../utils/routes';
import { ShieldCheck, ShieldAlert, Code2, Globe, Link2, Copy, Check, ChevronDown, ChevronUp } from './icons';

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
    <div className="k189">
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
          <span className="k190">
            {route.lang.toUpperCase()}
          </span>
        </button>
      ) : (
        <div className="k191 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="k192">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isNoindex ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <h3 className="k193">
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
                className="k194"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="k195">
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
          <div className="k196">
            {tab === 'meta' && (
              <div className="space-y-3">
                {/* Indexing Reason */}
                <div className="k197">
                  <div className="k198">
                    <span>Index Rule Evaluation:</span>
                    <span className="k199">View: {route.view}</span>
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
                  <div className="k200">
                    <Link2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Canonical Tag (&lt;link rel="canonical"&gt;)</span>
                  </div>
                  <div className="k201">
                    {seo.canonicalUrl}
                  </div>
                  {route.hasFacets && (
                    <div className="k202">
                      ℹ️ Canonical self-cleans facet queries to point directly to the primary category URL.
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <div className="k203">
                    <span className="font-semibold">Title ({seo.title.length} chars)</span>
                    <span className={seo.title.length <= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                      {seo.title.length <= 60 ? 'Optimal length' : 'May truncate in SERP'}
                    </span>
                  </div>
                  <div className="k204">
                    {seo.title}
                  </div>
                </div>

                <div>
                  <div className="k203">
                    <span className="font-semibold">Description ({seo.description.length} chars)</span>
                    <span className={seo.description.length <= 160 ? 'text-emerald-400' : 'text-amber-400'}>
                      {seo.description.length <= 160 ? 'Optimal (120-160)' : 'Longer than 160'}
                    </span>
                  </div>
                  <div className="k205">
                    {seo.description}
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div>
                  <div className="k206">Breadcrumb Trail:</div>
                  <div className="k207">
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
                  <div className="k208">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Multilingual Alternate Hreflang Tags</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ensures Google Switzerland correctly routes Swiss-German (de-CH / x-default), Swiss-French (fr-CH), and Swiss-Italian (it-CH) users.
                  </p>
                </div>

                <div className="space-y-2">
                  {seo.hreflangs.map((hl) => (
                    <div key={hl.lang} className="k209">
                      <div className="k210">
                        <span className="k211">{hl.lang}</span>
                        {hl.lang === 'x-default' && (
                          <span className="k212">
                            Global Fallback
                          </span>
                        )}
                        {hl.lang === `de-CH` && route.lang === 'de' && (
                          <span className="k213">
                            Current
                          </span>
                        )}
                        {hl.lang === `fr-CH` && route.lang === 'fr' && (
                          <span className="k213">
                            Current
                          </span>
                        )}
                        {hl.lang === `it-CH` && route.lang === 'it' && (
                          <span className="k213">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="k214">
                        &lt;link rel="alternate" hreflang="{hl.lang}" href="{hl.href}" /&gt;
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'jsonld' && (
              <div className="space-y-3">
                <div className="k210">
                  <div className="k215">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Schema.org Structured Data (JSON-LD)</span>
                  </div>
                  <button
                    onClick={copyJsonLd}
                    className="k216"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="k217">
                  {JSON.stringify(seo.jsonLd, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="k218">
            <span>🇨🇭 VeloSchweiz SEO Audit Tool</span>
            <span>URL: {currentUrl}</span>
          </div>
        </div>
      )}
    </div>
  );
}
