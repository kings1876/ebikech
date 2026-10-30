# Riese & Müller – sourcing notes (2026-10-30)

Count: 25 products written (target up to 25). 25 with CHF price, 25 with images (6 each).

## Sources
- Overview and model list: https://www.r-m.de/de-ch/bikes/
- One page per model: https://www.r-m.de/de-ch/bikes/<slug>/ (de-CH, prices shown as "ab CHF", fetched via HTML).
- Prices, motor, battery, gearing, display, brakes, fork, tyres, lighting, colours, frame sizes, weight and rack load are taken from the page's variant cards and component tables.

## Method / decisions
- One entry per model. The entry reflects the cheapest variant of that model (priceCHF, motor, battery, gears, weight = that variant). All other variants with their "ab CHF" prices are listed in `features`.
- HS variants (45 km/h) exist for several models; they are only mentioned in `features`, entries use speedClass e-bike-25.
- Images: official assets.r-m.de photo URLs found in the page HTML (up to 6 per model, mostly crop thumbnails of bike photos). Not downloaded. Licence "unverified".
- Frame material "Aluminium" is only set where the page text names aluminium.
- Categories (categoryId) are my own mapping, since the site's category pages did not separate models: Charger/Delite/Superdelite/Homage -> e-trekkingbikes; Nevo/Swing/Culture/UBN -> e-citybikes; Multicharger/Multitinker/Carrie/Load/Packster/Transporter -> e-lastenvelos.

## Not found / uncertain
- Motor torque (Nm) and range (km) are not published on the pages: `torqueNm: null`, `rangeKm: null` for all.
- Battery removability not stated explicitly: `removable: null`.
- modelYear is derived from image file names (my2025/my2026). Load5 60 shows 2027 in one file name; treat as uncertain. Some pages (e.g. Delite5) do not state the model year.
- frame.type left null for UBN and the cargo bikes (several frame shapes / not mapped to diamond|step-through|trapeze).
- Display, brakes etc. null for a few models where the card did not show them (see each `missing`).
- Older generation pages still online and included: Charger4, Delite4, Swing4. Omitted to stay within 25: Charger4 Mixte, Carrie (first gen), Multicharger2 (older generation, not confirmed current).
- No kids/youth or foldable R&M models found on the site.
