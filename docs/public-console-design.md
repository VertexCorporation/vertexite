# Public site and Console visual alignment

The public site's `site-design.css` adapts the existing Console palette, 8/12px radii, 120–220ms control/panel transitions, accessible focus rings, skeleton wave and reduced-motion behavior. Typography, brand assets and the public site's navigation remain intact. No console code or access policy is loaded into the public site.

`site-design.js` uses the same local Tabler outline paths as the Console icon catalog (Tabler Icons, MIT). It keeps existing SVG nodes and IDs so the theme controller continues to work. The transparent light/dark favicons are copied from the Console assets and follow the page theme.

CTA decoration uses two CSS transform animations, paused while offscreen and disabled for reduced motion. Hero frames are still rendered only on scroll/resize/theme changes. The hero's first and last states match, excluding its localized scroll cue; quick actions can bypass the story. Public team loading uses the Console-style skeleton before real data arrives.
