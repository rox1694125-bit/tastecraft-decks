# Color System

TasteCraft colors are functional. Each palette must support hierarchy, contrast, brand expression, data readability, and export stability.

## Palette Contract

Every palette must define these seven roles:

- `background`: default slide or page background.
- `surface`: panels, table fills, and quiet contrast areas.
- `text`: primary readable text.
- `muted_text`: sources, labels, axes, and secondary copy.
- `primary`: main brand or emphasis color.
- `secondary`: second emphasis color for contrast or structure.
- `accent`: sparing highlight color.

Use the palette IDs in `assets/palettes/v1-palettes.json`.

## V1 Palettes

| Palette ID | Character | Best For | Avoid For |
| --- | --- | --- | --- |
| `citrus-editorial` | Fresh, culinary, optimistic | consumer food, product launch, keynote | conservative board packets |
| `market-slate` | Crisp, analytical, confident | investor, operating report, KPI review | playful training |
| `atelier-rose` | Premium, human, editorial | brand strategy, hospitality, lifestyle | very dense financial appendices |
| `harbor-mint` | Clean, calm, technical | product demo, SaaS, service design | luxury positioning |
| `ink-copper` | High contrast, dramatic, premium | keynote, closing, strong brand pages | long reading-first decks |
| `orchard-lab` | Natural, precise, optimistic | food innovation, research, sustainability | formal legal or board decks |

## Contrast Rules

- Primary text on `background` must be readable at body size.
- Primary text on `primary`, `secondary`, or `accent` needs explicit light or dark override.
- Do not place `muted_text` on tinted surfaces unless contrast is checked.
- Use `surface` for dense tables; avoid tinted table bodies in `appendix-heavy` pages.
- For dark backgrounds, use fewer accent colors and increase whitespace.

## Color Allocation

Default page allocation:

- 70% background and surface.
- 20% primary and secondary structure.
- 10% accent and highlight.

For `speaker-led` and `visual` pages, a full-bleed primary or image background is allowed if text contrast passes.

For `data` pages:

- Use `primary` for the main series.
- Use `secondary` for comparison series.
- Use `accent` for one highlighted value or threshold.
- Use neutral grays for axes, grids, and inactive series.
- Never encode more than five categories with palette colors alone.

## Brand Overrides

If the user provides a brand kit:

1. Keep brand primary as `primary`.
2. Choose `background`, `surface`, `text`, and `muted_text` for readability even if they are not brand colors.
3. Use the brand accent only if it passes contrast and does not conflict with semantic chart colors.
4. For `white-label`, remove visible TasteCraft styling and use neutral palette structure.

## Failure Handling

- If a palette creates contrast warnings, switch to a higher-contrast palette before reducing text size.
- If brand colors are unusable for text, use them as lines, markers, or small accents instead.
- If a generated image clashes with the palette, adjust the image prompt or add a translucent overlay; do not recolor all typography to chase the image.
- If the user requests a one-color look, preserve the requested mood but introduce neutral contrast for text, data, and UI structure.

