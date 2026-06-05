# Typography System

Typography must make the deck readable before it makes the deck distinctive. Use expressive type for hierarchy and restrained type for content.

## Font Strategy

Default stacks:

- PowerPoint-safe: Aptos Display for headings, Aptos for body, Aptos Mono for code or technical labels.
- Cross-platform fallback: Arial for body, Arial Black or Aptos Display for bold display moments.
- HTML deck: `Inter`, `Aptos`, `Arial`, sans-serif; code uses `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace.

If a brand font is provided, use it only when:

- The license allows deck use.
- The file or system availability is confirmed.
- It remains readable at the density minimum.

## Type Scale

PowerPoint 16:9 baseline:

| Role | Speaker-Led | Balanced | Reading-First | Appendix-Heavy |
| --- | ---: | ---: | ---: | ---: |
| Cover title | 56 to 76 pt | 48 to 64 pt | 40 to 52 pt | 34 to 44 pt |
| Page title | 34 to 46 pt | 28 to 38 pt | 24 to 32 pt | 18 to 26 pt |
| Section label | 18 to 24 pt | 14 to 18 pt | 12 to 16 pt | 10 to 13 pt |
| Body | 24 to 30 pt | 18 to 24 pt | 13 to 18 pt | 10 to 12 pt |
| Source or footnote | 12 to 14 pt | 9 to 11 pt | 8 to 10 pt | 7 to 9 pt |

HTML 16:9 baseline:

| Role | Speaker-Led | Balanced | Reading-First | Appendix-Heavy |
| --- | ---: | ---: | ---: | ---: |
| Cover title | 72 to 104 px | 60 to 84 px | 48 to 68 px | 40 to 56 px |
| Page title | 44 to 64 px | 36 to 52 px | 30 to 42 px | 24 to 34 px |
| Body | 28 to 38 px | 21 to 30 px | 16 to 22 px | 12 to 16 px |
| Source or footnote | 15 to 18 px | 12 to 15 px | 11 to 13 px | 10 to 12 px |

## Hierarchy Rules

- Use one title, one body style, and one label style per page.
- Letter spacing is 0 unless a brand font explicitly requires tracking.
- Do not use all caps for paragraphs.
- Use bold for emphasis, not color alone.
- Keep line length between 32 and 72 characters for reading-first body text.
- Keep title lines to two lines maximum; rewrite before shrinking.

## Language Rules

- For Chinese decks, prefer Microsoft YaHei, PingFang SC, Noto Sans CJK SC, or source-provided brand fonts.
- For mixed Chinese and English, check that numerals, Latin abbreviations, and punctuation align visually.
- Avoid mixing more than two font families in one deck.
- Keep punctuation and capitalization consistent across agenda, chapter, and closing pages.

## Failure Handling

- If a title wraps to three lines, shorten the title before reducing size.
- If body text falls below density minimum, split the page.
- If a font is unavailable in PPTX export, use PowerPoint-safe fallback and note the substitution.
- If HTML renders differently across viewports, set fixed slide aspect ratio and responsive scaling rather than viewport-based font sizes.

