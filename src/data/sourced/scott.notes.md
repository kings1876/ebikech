# Scott sourcing notes (2026-10-30)
Found: 45 of target 45 (capped; 70 model/variant pages were seen). With CHF price: 45. With images: 45 (up to 6 each).

Source: scott-sports.com/ch/de (official Scott shop, read in the user's Chrome, read-only). Category lists: bike-ebikes-mtb, -urban, -road, -gravel, -all-terrain; each product page /ch/de/product/<slug>. Specs from the page's spec data, images from the page's JSON-LD (static.scott-sports.com).

Prices: Scott's shop shows a CHF list price (struck through) and often a "10 %" action price. `priceCHF` is the list (UVP) price, not the discounted one. Not an RRP confirmed by a distributor.

Not recorded / gaps
- modelYear is not shown on the pages: null for all.
- Bosch motor torque not shown in the spec data: null (TQ torque is given). rangeKm and battery.removable: null.
- 3 products (Aspect eRIDE 910, Sub Tour 10, Sub Tour 20) list no sizes/colours (no variant data on the page). Sub Tour/Sub Sport entries have no derailleur entry (gears null; likely hub gear or not listed). Patron ST 910 frame material left null (spec text unclear).
- Frame type is "diamond", except Aspect eRIDE 900 Wave (step-through). Taken from the name only.
- Category mapping is mine: Axis, Sub, Passage -> e-trekkingbikes; E-Ville -> e-citybikes; Fastlane/Solace -> e-rennvelos-gravel; Aspect eRIDE -> e-hardtails.
- Omitted to stay at 45: 14 Wave/Slope duplicates with the same price as their base model (not separate entries), plus Wave/Slope variants with a different price (Axis 30/40 Wave, Passage 10/20 Belt Wave, Sub Tour 30/40/50 Wave, Sub Sport 40 Wave), Silence FC Bayern eRIDE, E-Ville 10 SUV, Sweep 10, Sweep 20. These exist on the site and can be added.
- No Lumen, Genius, Ransom, Contessa eRIDE models were listed in the Swiss catalogue pages on this date.
- Images: official URLs only, licence unverified, not downloaded.
