# Stromer sourcing notes (2026-10-30)

Found 5 / target 25 (ST1, ST2, ST3, ST5, ST7 - the full current line-up shown on stromerbike.com). With CHF price: 0. With images: 5.

Sources: stromerbike.com/en/bikes/st1, st2, st3, st5, st7. The ch-de paths (stromerbike.com/ch-de, /de-ch/bikes/..., /ch-de/bikes/...) returned 404, so no CHF price could be retrieved; the en pages show EUR only (quoted in priceNote as cross-check, not converted). priceCHF = null everywhere.

Gaps / uncertain:
- modelYear, weight, fork, frame material not stated. Suspension forks are an optional upgrade, so fork = null.
- Variants (Sport/Comfort frame, colours) listed inside the entries, not separate products.
- All models are 45 km/h (L1e-B) -> categoryId schnelle-e-bikes.
- Images are Sanity CDN originals (cdn.sanity.io); up to 6 per product, may include some graphics/screens. Licence unverified.
- Older/discontinued models (e.g. ST4, DS-series) deliberately not included.
