# Malistan — visual direction

An immersive editorial archive grounded in real Malistan photography. Full-screen highland scenery, oversized uppercase Manrope lettering and DM Serif Display narrative headings. Forest green (#1d3c32), warm paper (#f2f0e8), olive and champagne accents. Fonts are hosted locally with their licences.

The cinematic hero introduces Malistan through individually animated letters and an explicit valley/winter crossfade control. Use staggered asymmetric compositions, arched photo crops, generous whitespace, large editorial headings, a full-screen navigation overlay, scroll-linked photo parallax and a thin reading-progress line. Narrative sections alternate paper and deep-green backgrounds. Hover feedback changes arrows, image crops and link spacing without layout shifts.

The revised design-system search suggested asymmetric editorial/brutalist composition. Its generic pink palette and instant-motion advice were unsuitable for the requested cinematic heritage experience; the archive uses a landscape-led palette and coordinated Motion animations. Respect reduced-motion settings throughout, provide a hero motion toggle, contain focus in the expanded menu, retain readable content and preserve source and image credits.

## Appearance and responsive reading

`app/appearance.css` owns semantic theme tokens and the responsive refinements. Light uses warm paper (#f5f3eb), forest ink (#20392f) and olive accents. Dark uses deep forest (#111f1b), warm ivory (#edeedf), sage secondary text (#b1bfb0) and champagne links. Photography and the OSM map retain natural colors. The header offers Auto, Light and Dark; save the preference locally, apply it before first paint, and follow system changes only in Auto.

Use viewport-height-aware hero type and normal-flow controls, never a fixed minimum height larger than a laptop display. Collapse desktop navigation below 1200px; show all archive links in the expanded menu. Use two topic columns on tablets and one on phones, 44px controls, readable mobile body copy, and a nonsticky contents panel below 900px. Keep article text at a comfortable reading width. Validate all eight routes in both themes, including 320px phones, 768px tablets, 1280px and 1366px laptops, and 1440px desktops.
