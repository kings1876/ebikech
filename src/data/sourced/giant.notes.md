# Giant sourcing notes (2026-10-30)

Found: 6 of target 50. With CHF price: 0. With images: 6.

Sources: giant-bicycles.com/ch/ product pages (ch-de redirects to /de, which shows EUR; the /ch pages show blank price fields and link to veloplace.ch). Model list taken from https://www.giant-bicycles.com/de/e-bikes (EUR, not used for price).

Included: Reign Advanced E+ 2027, Trance Advanced E+ 2027, Fathom E+ 2027, Talon E+ 2027 (only E+ 2 shown), Stance E+ 2027, Defy Advanced E+ Elite (MY26).

Excluded: /ch URLs returned 404 for AnyTour X E+ 2027, NewTour E+ 2027, AnyTour E+ 2027 and Talon E+ EX 2027, so they appear not to be sold in Switzerland; Explore E+, Defy Advanced E+ Elite AR and Stormguard E+ 2024 returned 410 Gone (discontinued). Undated Reign Advanced E+ / Talon E+ / Talon E+ EX and 2022-2023 models on the /de list were not recorded. Not checked: Liv brand, Revolt E+, Dirt-E+, Trance X, Explore-successors, other models not on the /de list; I did not find a Swiss list page (/ch/e-bikes 404).

Uncertainties:
- No CHF prices anywhere; priceCHF null.
- Specs are sparse on Giant pages (no weights, gears, brakes, tires for most). Variants (E+ 1/2) are merged in one entry; fork mapping to variants for Reign is my inference.
- Defy: motor 75 Nm in spec table vs 30 Nm in text. Stance: torque/battery are for E+ 0/1; E+ 2 has 85 Nm/625 Wh.
- Image URLs are the page's thumbnail-sized (w_600/h_400) Cloudinary URLs; spacer GIFs excluded.
- Speed class assumed e-bike-25.


## CHF price pass (2026-10-30, real Chrome, read-only)
- Checked https://www.giant-bicycles.com/ch/bikes-trance-advanced-eplus-2027 in Chrome: the "Current price:" labels render empty (no CHF value in DOM text). Same behaviour expected on the other /ch pages; not all re-checked.
- priceCHF remains null for all 6 entries (0 with CHF). No data changed.

## EUR price pass (2026-10-30)
Now 15 entries (target 50; the giant-bicycles.com/de e-bike list has only ~22 families incl. 2022-2024 leftovers, not added). priceEUR on all 15 = UVP incl. VAT from giant-bicycles.com/de; for multi-variant models the lowest variant price (others in priceEURSource).
Added: Reign Advanced E+ 2026, AnyTour X E+ 2027, AnyTour E+ 2027, NewTour E+ 2027, Talon E+ EX 2027, Talon E+ 2026, Talon E+ EX 2026, Defy Advanced E+ Elite AR, Explore E+ 2026.
notSoldInCH true: AnyTour X, AnyTour, NewTour, Talon E+ EX 2027 (/ch URL HTTP 404) and Defy Elite AR, Explore E+ (410 Gone). Talon E+ EX 2026 /ch not checked.
Not added: Stormguard 2024, AnyTour X/AnyTour/Fathom 2024, Explore 2023, Entour/DailyTour 2022 (old). Trance X E+, Revolt E+, Fastroad, Dirt-E+ are not on the /de e-bike list (no German price found). Liv is a separate brand.
Gaps: weight/gears/brakes/sizes often unpublished; gallery images are placeholders so several entries have fewer than 3 images.
