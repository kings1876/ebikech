# Haibike sourcing notes (2026-10-30)
Found 25 of target 25 (CHF price 25, images 25, up to 8 each).
Source: official Swiss shop https://haibike.com/de-ch (Shopify catalogue, /products.json). 61 products listed; only MY2026 (handle suffix u) and MY2025 (suffix t) kept, newest per title, MY2024 and older skipped, "do not launch yet" product skipped. 39 qualified; first 25 (MY2026 first) recorded.
Prices: CHF shop price, no strike-through price present, so UVP vs sale price is not confirmed. Model year derived from handle suffix and image names (MY25/MY26), not from an explicit field.
Motor/battery Wh: taken from the product text where stated (battery omitted when ambiguous). Torque, weight, gears, brakes, fork, display, tyres, lighting, range, frame material not extracted (null, in `missing`).
Uncertain: category/subcategory inferred from model family (Alltrack = hardtail, Allmtn/Alltrail/Lyke/Hybe/Nduro = fully, Trekking/Adventr = trekking); speedClass e-bike-25 assumed; most products carry a store-wide "delete" tag, ignored. Alt texts are generic.

## Update 2026-10-30 (second run)
- Now 39 of 39 qualifying models recorded (14 added: LYKE CF 10, NDURO 8 Freeride, ALLMTN CF 10/11 TRN/IQ, ADVENTR SE/10/11 ABS, TREKKING 5/7/9 ABS, ALLTRAIL 3/5/9/10.5 ABS; all MY2025 handles, newest per title). All with CHF shop price (same caveat: UVP vs sale price not confirmed). Brief addendum (EUR) not needed.
- Specs filled from the structured spec block on each product page (haibike.com/de-ch/products/<handle>): battery Wh, motor model, torque (Nm), frame material, gears, brakes, fork, display, tyres, lighting. 38 of 39 have torque and material.
- Not published on any page: weight (weightKg null everywhere), range, rack load. Battery removability not stated (null).
- ALLTRAIL 9 (alltrail-9-hlft1): spec block on the page is empty; motor Yamaha PW-X3 and 720 Wh taken from the product text; torque, frame material and components null.
- Spec values describe the default variant shown; the pages mix Bosch/Yamaha/Fazua/Pinion systems. Torque is the page's Motor line (e.g. 85 Nm for CX; the "Bosch Update 2026" tag mentions up to 120 Nm via software upgrade, not used).
- Descriptions are generic own wording; features list only frame shapes.
