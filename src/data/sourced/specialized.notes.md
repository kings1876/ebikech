# Specialized sourcing notes

Found: 45 entries (target up to 45). 45 with CHF UVP, 44 with images (Turbo Vado 2 5.0 had no bike-specific image).
Source: specialized.com/ch/de E-Bikes listing (90 SKUs/colour variants) plus each product page, retrieved 2026-10-30/31 in a normal browser session (no login, no challenge).

- Listing is SKU level (colour variants repeated); deduplicated by product slug, first 45 distinct complete e-bikes taken in listing order. Frame-sets (S-Works Turbo Levo 4 / Kenevo SL 2 Rahmenset) excluded.
- Not included because of the 45 cap (still on the site): Turbo Kenevo SL 2 Comp / Expert / Ohlins, Turbo Porto, Turbo Tero (X 5.0/6.0, 3.0, 4.0, 5.0 non-EQ), Turbo Como 5.0 non-IGH, Vado SL 2 5.0 step-through EQ, Vado 2 4.0 etc. Porto/Kenevo/Tero can be added in a second pass.
- Prices: CHF UVP from listing cards. Specs (motor, Wh, gears, brakes, fork, tyres, weight) copied from the German product pages (often English component text); weight is the manufacturer's measured weight in one reference size.
- Uncertain / null: modelYear (not shown), speedClass (only set e-bike-25 where the page states 25 km/h; Levo/Creo/Como/Tero left null), frame.material for Vado 3/SL and "Levo 4 EVO" (page gives no material), battery.removable, rangeKm, colours, frame sizes, lighting.
- Como motor text says "28mph" (US spec) - not interpreted as a 45 km/h class.
- Vado SL 2 motor torque and Creo torque are not stated on the page (null).
- Images: official resources.specialized.com URLs without query string; accessory/helmet images filtered out. licence "unverified". Two image URLs failed a HEAD check once (likely transient); recheck.
- Category mapping (Levo -> e-fullys, Creo -> e-rennvelos-gravel, Como -> e-citybikes, Vado/Tero -> e-trekkingbikes) is my assumption.
