# LEHS TSA — Brand Kit

Single source of truth for fonts, logos, and illustration assets.
Everything here is either self-made or licensed for our use — **no stock or
web-scraped photography lives in this folder.**

```
brand/
├── fonts/    self-hosted webfonts + @font-face sheet
├── logos/    mark + favicon
└── images/   50 line-art / flat illustrations (Canva exports)
```

---

## Fonts

| Role | Family | Source | File |
|---|---|---|---|
| Headings | Proxima Nova | Adobe Fonts (Typekit) — commercial, not redistributable | — |
| Headings fallback | Franklin Gothic Medium → Source Sans 3 → Arial | system / self-hosted | — |
| Body | Source Sans 3 (var. 200–900, roman + italic) | Google Fonts, SIL OFL 1.1 | `source-sans-3-variable-latin*.woff2` |
| Mono | JetBrains Mono (var. 400–500) | Google Fonts, SIL OFL 1.1 | `jetbrains-mono-variable-latin.woff2` |

Only the **latin** subset is included (~29 KB each). `fonts/fonts.css` has the
`@font-face` blocks ready to swap in for the Google Fonts CDN `<link>` in
`index.html:57-61` — self-hosting removes two cross-origin round trips and the
render-blocking stylesheet.

Declared in `tailwind.config.js:10-17` as `font-sans` / `font-body`,
`font-heading`, `font-mono`.

## Logos

| File | Use |
|---|---|
| `logo-mark.svg` | Nav / app mark — TSA Blue rounded square + cpu glyph. Matches `components/Layout.tsx:156-158`. |
| `favicon.svg` | Browser tab, 100×100, "TSA" wordmark on `#00529B`. Live copy at `public/assets/favicon.svg`. |

There is no official LEHS-chapter logo file in the repo — both marks above are
generated. The favicon's `#00529B` is **off-palette**; brand blue is `#005DAA`.

## Illustrations

`images/illustration-28.png` … `illustration-77.png` — 50 flat / line-art
illustrations (laptops, aircraft, tools, workspaces) exported from Canva.
Renamed from `Untitled design (NN).png`; the number maps 1:1 to the original.

Each is a 1920×1080 canvas with a small centered subject on transparent/white —
**they need cropping and re-export before production use** (~115 KB each for
what should be a few KB; 5.7 MB total).

## Color

Full scales live in `tailwind.config.js:18-110`. Primary:

| Token | Hex | Pantone |
|---|---|---|
| `tsa-blue` | `#005DAA` | 286 |
| `tsa-red` | `#EE2624` | 1795 |

Secondary: `#86BB50` green · `#4E8AC9` sky · `#D0539E` pink · `#EC881D` orange ·
`#574E8F` purple · `#FFC425` yellow · `#9C1D20` maroon · `#006FA6` cobalt ·
`#A2BBB2` sage · `#324659` navy · `#4D4D4F` charcoal · `#D5DCE0` silver.

## Removed from the project

`public/assets/art/` is **gone** — 5 processed PNGs plus their 5 source scans
(Wright plans 1908, Wright Flyer 1906, Tesla, Edison phonograph, 1866 bicycle),
all pulled from the web. Deleted with them:

- the six `<ArtImage>` hero backdrops on Home, About, Officers, Join, News,
  Competitions (decorative, `aria-hidden` — no content lost)
- the `ArtImage` component in `components/art/LineArt.tsx`
- `scripts/convert-art.js`, the scan→PNG pipeline that fed them

`sharp` stays in `package.json` — it is a peer dependency of
`vite-plugin-image-optimizer`, not just of that deleted script.

## Still web-sourced (kept, by decision)

50 Unsplash hotlinks power the competition and event **card images** in
`data/competitions.ts` (45), `context/DataContext.tsx` (3), and
`pages/Competitions.tsx` (2). These stay until the cards get real photography
or a mapped set from `images/`.
