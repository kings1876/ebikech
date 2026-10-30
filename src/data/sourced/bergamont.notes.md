# Bergamont sourcing notes (2026-10-30)
Found: 25 of target 30. With CHF price: 0. With images: 25 (4-6 each).

Source: bergamont.com/global/en (official). The de-ch path returns an error page, so the global English site was used: family pages /global/en/products/bergamont-bikes-<family>, products /global/en/product/bergamont-<slug>. Read in the user's Chrome, read-only.

Prices: the Bergamont site shows no prices at all. All priceCHF are null. No Swiss importer price list was checked.

Stopped early: after a burst of automatic page requests, bergamont.com started returning a bot-protection stub (tiny page with an iframe) for about 21 product pages. I stopped and did not try to get around it. Pages not captured: E-Cargoville LT Expert/Edition, E-Horizon SUV 20 Belt, E-Horizon Sport 10, E-Horizon Tour 20/30 Belt, E-Revox FS 20, E-Revox Tour 10/20, E-Revox Sport 10/20, all E-Grandurance (gravel) models, plus their Wave/Slope versions. The E-Revox hardtails and E-Grandurance are therefore missing, not absent.

Also left out on purpose: Wave/Slope variants of the 25 models (about 17 pages), LJ Load Unit (accessory).

Uncertain
- Two naming generations appear in the E-Trekking family ("Horizon ..." and "E-Horizon ..."). Both are listed under the current categories, but they may be different model years. modelYear is null for all.
- Frame type, motor torque, range and battery.removable are not in the data: null. Weights are rounded integers as published.
- Hans-E LT (long-tail) and E-Cargoville LJ are filed as e-lastenvelos; Belami/E-Ville/Helix as e-citybikes (my mapping).
- Images come from Bergamont's product pages (static.scott-sports.com CDN); licence unverified, not downloaded.
