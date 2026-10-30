# Kalkhoff – sourcing notes (2026-10-30)

Count: 20 products written (target up to 20). 20 with CHF price, 20 with images (2-6 each).
The Swiss site lists about 35 model pages; 15 further models were left out to respect the target (e.g. Image 3 Advance BLX, Image 3 Excite 380/BLX, Image 5+ Advance BLX, Image 5+ Move, Image 1 Move, Endeavour 1 Move, Endeavour 3 Air/Season, Endeavour 5 Auto, Endeavour L Excite/Season, Entice 3 Season, Entice 3 Excite Belt, Entice 7+ Move).

## Sources
- Model list from https://www.kalkhoff-bikes.com/de_ch sitemap (media/sitemaps/location_0_sitemap_de_ch.xml). Note: /de-ch/ and /de/ return HTTP 410; the working locale is `de_ch`.
- One page per model: https://www.kalkhoff-bikes.com/de_ch/<slug>
- CHF price from the page meta `product:price:amount` (currency CHF). Specs from the page specification table (values shown for the default configuration). Frame shapes, sizes and colours from the configurator data embedded in the page.
- Images from resource.pon.bike URLs embedded in the page (first colour, up to 6 views). Not downloaded. Licence "unverified".

## Uncertain / gaps
- Price is for the default configuration; other battery/frame/colour options may differ.
- modelYear 2026 is inferred from image file names ("v2025_2026"); the page does not state a model year.
- Frame material and battery removability are not in the spec table: `null`.
- Torque: specification table value used. For Image 5+ Advance the table says 90 Nm while the highlight text says 85 Nm.
- Range is the manufacturer claim ("bis zu N km") from the highlight text, not a test value.
- Weight is for the configuration shown in the page (see "Gilt für deine Auswahl"), values copied as shown.
- frame.type: "diamond" where a Diamond frame exists (Wave/Trapez alternatives listed in `features`); Image 1 Advance is Wave only (step-through).
- Endeavour L Move has only 2 images on the page.
- Most pages show no display/lighting issues; any missing key is listed in `missing`.

## Update 2026-10-30 (second run)
- Added 15 of the 16 previously omitted models (now 35 entries, all with CHF price, Wh, torque, weight, range from the manufacturer; 2-6 images each): Image 5+ Advance BLX, Image 5+ Move, Image 3 Advance BLX, Image 3 Excite 380, Image 3 Excite BLX, Image 1 Move, Endeavour 1 Move, Endeavour 3 Air, Endeavour 3 Season, Endeavour 5 Auto, Endeavour L Season, Endeavour L Excite, Entice 7+ Move, Entice 3 Season, Entice 3 Excite Belt.
- entice-5-season is still in the de_ch sitemap but the page returns HTTP 410 (gone), so it was not recorded.
- Same extraction method and caveats as above (default configuration values, frame material and battery removability not stated, modelYear 2026 inferred). Several additional models have 2-3 images only on the page.
