# Merida sourcing notes (2026-10-30)

Found: 24 of target 25 (every e-bike listed on the Bikefinder page "1-24 of 24"). With CHF price: 0. With images: 24 (1 image each).

Sources: https://www.merida-bikes.com/de-ch/bikefinder/tag/e-bikes-82/root/e-bikes and each product page /de-ch/bike/<id>/<slug> (sourceUrl per entry).

Gaps and uncertainties:
- No Swiss UVP is published on merida-bikes.com/de-ch. priceCHF is null for all. A web search surfaced only dealer asking prices on velocorner.ch (marketplace, not used).
- eONE-FORTY 400 SE: the page shows "CHF 4099.-" next to the size S battery note; unclear whether it is the bike price, so not adopted.
- Only one product image per page is present in fetched content (carousel images have no URL in markup). Images are .tif zoom URLs on merida-cdn.m-c-g.net; may need conversion or may not render in browsers.
- Model year is not stated on pages; inferred from MY24/25/26/27 in image filenames. Several entries are MY24 (older).
- Torque missing for Bosch CX bikes where the page gives none (eONE-EIGHTY, eFLOAT, eFLOAT CITY); ETMO 800/500 PRO page is inconsistent (120 vs 100 Nm, 120 used).
- Battery removability unclear for several (page says "internal" but marketing says removable); set null or as stated.
- frame.type set only where the page said step-through/low entry or MTB; null for eSPRESSO CC 575, eFLOAT CC 500, eSILEX 400. eSILEX 400 is classed by the site as Cross, placed in gravel by me.
- Speed class assumed e-bike-25 for all; no 45 km/h models were listed.
- Not covered: Swiss importer (Merida Schweiz) pages and archive models.


## CHF price pass (2026-10-30, real Chrome, read-only)
- Checked https://www.merida-bikes.com/de-ch/bike/5725/lithos-10k in Chrome: specifications page shows no price at all (Merida de-ch lists specs only; dealers set prices). Other 23 models share the same template; not individually re-checked.
- priceCHF remains null for all 24 entries (0 with CHF). No data changed.

## EUR price pass (2026-10-30)
merida-bikes.com shows no prices (dealer-set). priceEUR set on 5 of 24 from German retailers printed UVP/undiscounted price: eSILEX 400 (2699), eONE-SIXTY 875 (6599), eSPRESSO CC 675 EQ (4499), eBIG.TOUR 475 EQ (3899), eFLOAT CC 500 EQ (4399). Some are a different model year of the same name or a former UVP: treat as estimates. Other 19 stay null (no reliable UVP; sale prices and aggregator/marketplace figures not used).
