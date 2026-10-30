# Cube sourcing notes (2026-10-30)

Products recorded: 80 (target up to 80). With CHF price: 0. With images: 80 (2-5 each).

## Sources
- https://www.cube.eu (international manufacturer site): category pages under /e-bikes/... and each product page
  (https://www.cube.eu/<slug>/<articleNo>). All specs and image URLs come from these pages.
- https://www.cube.eu/de-ch/... returns 404; cube.ch refused the connection; archiv.cube.eu redirects to info.cube.eu (not used).
- No Swiss importer price list could be reached.

## Gaps and uncertainties
- priceCHF is null for every entry: cube.eu shows no prices at all. Retailer CHF prices seen in search results
  (bikester.ch, velocorner.ch) were deliberately NOT recorded (brief forbids shops/marketplaces as price source).
- modelYear is set to 2027: pages do not state a year, but the series images are named "MY27" and many pages say
  "available from December 2026 / January 2027". Treat as inferred.
- frame.type: set from model names/geometry (FE = low-entry variants recorded as step-through, MTB/trekking/gravel
  with top tube as diamond, Supreme/Aruba/Compact/Fold/Cargo/Longtail as step-through where the page says step-through or
  "Easy Entry"). Where the page said "type not stated" this is an inference.
- Kathmandu Hybrid 45 is categorised schnelle-e-bikes / e-bike-45 based on the "45" name and Performance Line Speed drive;
  the page itself does not state the 45 km/h limit.
- Supreme Hybrid Deluxe SLX 600: page text says 75 Nm, spec table says 90 Nm (90 recorded).
- battery.removable is null (not collected per product); rackKg, rangeKm always null.
- Longtail models: weight not listed on the pages.
- Some Nuroad/Nulane/Editor/Compact entries describe city/gravel use per Cube's own navigation; Nulane Hybrid (C:62 gravel
  endurance) is filed under e-rennvelos-gravel, Editor Hybrid under e-citybikes.
- Colour variants and size variants are merged into one entry per trim; only the first variant's page was read.
- Stereo/Reaction/AMS listings were truncated on the category pages (e.g. Stereo Hybrid 51 articles, Kathmandu 60 articles),
  so additional trims may exist.

## Not recorded (deliberately, to stay at 80)
- Trike Hybrid (Family 750/1500, Cargo, Flatbed), Longtail Hybrid Family 800 / Deluxe Family colour duplicates,
  Supreme Hybrid C:62 Deluxe SLT/SLX 600, Supreme Hybrid Deluxe ONE 600, Supreme RT Hybrid Comfort EX 600,
  Acid 240 Hybrid Rookie (kids), S-Pedelec page (only Kathmandu Hybrid 45 seen), Nuride/Supreme HPA series pages,
  Touring/Nuride further trims beyond the visible ones, remaining Stereo/Reaction/Kathmandu/AMS trims.

## Count
Found 80 vs target 80 (not exhaustive of the full Cube e-bike range).


## CHF price pass (2026-10-30, real Chrome, read-only)
- cube.eu product page (Kathmandu Hybrid ONE11 HPC SLT 800) re-checked in Chrome: no price shown. cube.eu/de-ch/ returns "page not found". cube.ch redirects to a different domain that the browser tool refused to read (cross-domain redirect), so not used.
- No official Swiss CHF price found; priceCHF remains null for all 80 entries (0 with CHF). No data changed.


## German EUR list prices (2026-10-30)
- All 80 entries now carry `priceEUR` (number, incl. VAT) and `priceEURSource`. `priceCHF` unchanged (null).
- Source: official cube.eu German pages (cube.eu/de-de, series listing pages and, for Kathmandu Hybrid 45, Reaction Hybrid Pro 800 FE and Reaction Hybrid Rookie 540, the product page). The price was matched by article number, which equals the article number in each entry's sourceUrl, so model and trim are the same. Pages carry no explicit model-year label; the current range is flagged "available from December 2026" (our modelYear 2027). No retailer prices were needed.
- Price is the same for all colours/frame variants of a trim on cube.eu/de-de. No entries left null.
- Caveat: values are the printed Cube Germany UVP; the pages themselves do not state the label "UVP" on the listing pages (product pages do for the three product pages checked).
