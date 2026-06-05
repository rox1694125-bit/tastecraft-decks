# Logo And Brand Placement

Logo placement should signal ownership without competing with the message. Use the smallest visible treatment that satisfies the brief and brand mode.

## Brand Modes

| Brand Mode | Use When | Logo Behavior |
| --- | --- | --- |
| `none` | No brand assets or white-paper style | No logo. Use neutral palette. |
| `light-brand` | Brand should be present but quiet | Cover plus closing, or footer-subtle on key pages. |
| `strong-brand` | Sales, public event, or client-facing brand deck | Cover, closing, and consistent internal mark. |
| `white-label` | Client or partner must own the output | Remove TasteCraft marks. Use provided client brand only. |

## Placement Values

Use the schema placement values exactly:

- `none`: no logo.
- `cover-only`: logo appears only on cover.
- `cover-and-closing`: logo appears on first and last page.
- `footer-subtle`: small logo on internal footer.
- `section-only`: logo appears on cover, chapter pages, and closing.
- `all-pages`: logo appears on every page.

## Sizing Rules

For 16:9 PowerPoint slides:

- Cover logo: 0.45 to 0.80 in wide for simple marks; 0.90 to 1.40 in wide for horizontal lockups.
- Internal footer logo: 0.28 to 0.45 in wide for simple marks; 0.55 to 0.85 in wide for horizontal lockups.
- Closing logo: 0.50 to 0.95 in wide for simple marks; 0.90 to 1.50 in wide for horizontal lockups.
- Minimum clearspace: at least 1x logo height from slide edge and unrelated objects.

For HTML 16:9 slides:

- Cover logo: 56 to 112 px wide for simple marks; 120 to 220 px for horizontal lockups.
- Internal footer logo: 32 to 56 px wide for simple marks; 72 to 132 px for horizontal lockups.
- Closing logo: 64 to 128 px wide for simple marks; 132 to 240 px for horizontal lockups.

## Position Rules

- Default cover position: top left or bottom left, aligned to title grid.
- Default internal position: bottom right, outside the main content field.
- Default closing position: bottom left or centered under final message.
- Do not place logos on top of faces, product details, chart labels, or legal/source notes.
- Do not rotate, stretch, outline, recolor, shadow, or crop logos.

## Reverse Logo Rules

Use a reverse or white logo only when:

- `reverse_version_allowed` is true.
- The source file is provided or explicitly approved.
- The background behind the logo is dark or visually busy.
- Contrast is stronger than the normal version.

Do not fabricate a reverse version by recoloring a private brand logo unless the user approves it.

## Co-Branding

- Use equal visual weight for peers.
- Use larger weight for the commissioning brand when hierarchy is explicit.
- Separate logos with a neutral divider or clear spacing.
- Never stack more than three logos on a normal content page.

## Failure Handling

- If logo source is missing, set `logo.enabled=false`, use brand colors only if known, and mark the assumption.
- If a logo is low resolution, use it only at small footer size or ask for a higher-resolution source.
- If logo placement harms readability, switch to `cover-and-closing` or `section-only`.
- If the user requests brand behavior that violates provided brand rules, preserve the brand rule and document the conflict.

