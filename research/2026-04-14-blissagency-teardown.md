# Site Teardown: Bliss Agency

**URL:** https://blissagency.it/
**Platform:** WordPress + GeneratePress theme + Elementor Pro + Essential Addons (EAEL)
**Analyzed:** 2026-04-14

## Tech Stack (confirmed from HTML)

| Tech | Evidence | Purpose |
|---|---|---|
| WordPress | `wp-content/`, `wp-includes/` paths | CMS |
| Elementor Pro 3.35.1 | `plugins/elementor-pro/...frontend.min.js` | Page builder |
| Essential Addons Lite 6.5.13 | `plugins/essential-addons-for-elementor-lite` | Image accordion widget |
| GSAP 3.12.5 | `npm/gsap@3.12.5/dist/gsap.min.js` | Marquee + scroll anims |
| Swiper 8.4.5 | `elementor/assets/lib/swiper/v8/swiper.min.js` | Carousels |
| WP Rocket 3.21 | `rocket-lazyloadscript` attrs everywhere | Script lazy-load, JS/CSS minification |
| jQuery 3.7.1 + smartmenus | `jquery.smartmenus.min.js` | Nav menu |
| Yoast SEO Premium v27.3 | `<meta>` generator line | SEO |
| Cookie Law Info / CookieYes | `cookie-law-info/lite/frontend/js/gcm.min.js` | Cookie banner |
| mailgo 0.12.2 | `mailgo@0.12.2/dist/mailgo.min.js` | mailto popup |
| Cloudflare email-decode | `cdn-cgi/scripts/.../email-decode.min.js` | Email obfuscation |
| lazyload 17.8.3 | `wp-rocket/assets/js/lazyload/...` | Image lazy-load |

All CSS is inlined/minified by WP Rocket — no external `<link rel="stylesheet">` of the site's CSS (only a noscript fallback for Elementor social icons).

## Page sections (top → bottom)

1. **Sticky header / nav** (Elementor `e-n-menu`) with logo SVG
2. **Hero** — full-bleed autoplay `<video>` (Sasso-4K.mp4, poster `sasso-2k...webp`); overlay copy "se non senti il peso di quello che fai, non sei pronto per farlo" + GPS coords `41.88°N 12.53°E`; partner logos row (Lacris Group)
3. **Marquee** — horizontal looping strip: *Strategic Governance · Executive Advisory · Performance Management · Stakeholder Capital · Corporate Integration · Operating Model · Business Transformation · Go-to-Market Strategy · Enterprise Risk · Data-Driven Strategy*
4. **Intro block** — H1 `Agenzia di Marketing`, paragraph about method, `Il nostro Framework` with 4 pillars: *problema / soluzione / valore / azione*
5. **Casi studio** — image accordion (horizontal, hover-expand). Clients: Miele, Profumum, CocaCola HBC, Würth, Charles Philip Milano, Doreca, Paramount, etc.
6. **Bliss System (`.bsys-wrap`)** — 3-column expandable diagram:
   - 01 Advisory — "We define it"
   - 02 Governance — "We govern it"
   - 03 Operations — "We make it real"
   Each column expands on click revealing service bullets (Audit, Consulting, Advisory, Growth / Framework di attivazione globale / Visual Production, Brand Design, Web Development, Performance Marketing, GEO & AIO).
7. **Operations (`.ops-wrap`)** — label "Attivazione operativa", h2 "La fase in cui la strategia diventa risultato misurabile.", accordion with 5 areas: 01 Visual Production · 02 Brand Design · 03 Web Architecture · 04 Performance Marketing · 05 GEO & AIO. Vanilla JS `opsToggle(this)` handler.
8. **Settori / target** (Pubblica Amministrazione, etc. — h3 list)
9. **Certifications + logo carousel** (Swiper)
10. **Media presence / press** — Swiper
11. **Service tiles** — Brand Advisory, Visual Direction, Positioning, Brand Strategy
12. **FAQ** — Elementor nested accordion, 9 questions on strategic positioning, governance, etc.
13. **Blog & Trends 2026** — insight cards (bliss-blog-hub custom plugin `hub.js`)
14. **Contact form** — Elementor form with selects, CTA "CONTATTI"
15. **Footer** — dark `#000`, addresses with GPS coords, mailgo-wrapped emails

## Design System

### Colors
| Role | Value |
|---|---|
| Page background | `#222222` (dark contrast) |
| Accent text / strong | white |
| Footer | `#000` |
| Brand gradient | orange → pink → violet (seen on logo raster `logo-bliss-low_risultato.webp`) |

### Typography
- **Headings:** Switzer (custom), uppercase, weight 500, letter-spacing ~ -1.9px, 40px base
- **Body:** Switzer regular

### Layout / patterns
- Fluid containers with absolute-positioned overlays on hero
- CSS `position: sticky` header
- Horizontal image accordion: flex items that grow `flex:3 1 0%` on `.overlay-active`
- Marquee: pure CSS keyframe `translateX(-50%)` with duplicated track
- Bsys columns: grid-cols-3, each column has `aria-expanded` + body height transition
- Ops accordion: JS toggles `aria-expanded`, CSS transitions `max-height`

## Effects (confirmed from source)

| Effect | Implementation | Cloneable |
|---|---|---|
| Hero looping bg video | `<video autoplay muted playsinline loop>` with webp poster | Yes |
| Marquee ribbon | Duplicated track + CSS `@keyframes translateX` | Yes |
| Image accordion (case studies) | EAEL: hover → CSS `flex-grow` expand | Yes |
| Bsys 3-col expand | Click toggles `aria-expanded`, body `max-height` transition | Yes |
| Ops accordion | Inline `onclick="opsToggle(this)"` flips `aria-expanded` | Yes |
| Client logo carousel | Swiper loop | Yes |
| FAQ accordion | Elementor nested-accordion widget (details/summary-like) | Yes |

## Clone build plan

Single static `index.html` + `styles.css` + `script.js`. No framework needed. Recreate:
- Hero with video background (use a placeholder mp4 URL — keep the original as a reference only; for a true offline clone, swap for a local file)
- Marquee
- Framework pillars (problema/soluzione/valore/azione)
- Image-accordion grid for case studies (uses placeholder/remote images)
- Bsys 3-column with expand-on-click
- Ops 5-accordion
- FAQ native `<details>`
- Dark footer with GPS coords

Keep the original Italian copy verbatim where quoted.
