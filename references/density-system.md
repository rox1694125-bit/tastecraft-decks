# Density System

Density describes how much information a page carries and how the audience is expected to consume it. Density is a design control, not a quality ranking.

## Density Modes

| Mode | Use When | Text Budget | Object Budget | Typical Page Types |
| --- | --- | --- | --- | --- |
| `speaker-led` | Live presenter explains the detail | 12 to 35 words | 1 to 4 major objects | cover, chapter, visual |
| `balanced` | Presented live but readable afterward | 35 to 85 words | 3 to 7 major objects | agenda, content, visual, closing |
| `reading-first` | Audience reviews without presenter | 85 to 160 words | 5 to 10 major objects | content, data, closing |
| `appendix-heavy` | Evidence, assumptions, and references | 160 to 320 words | 8 to 16 major objects | data, content appendix |

Major objects include text groups, charts, tables, image blocks, diagrams, callouts, and logo lockups. Repeated bullets in one grouped list count as one object if they share one visual container.

## Layout Rules

### Speaker-Led

- One takeaway per page.
- Title can be expressive, but must still name the subject.
- Minimum body size: 24 pt in PPTX, 28 px in HTML.
- No paragraph longer than two lines.
- Data pages are allowed only for one simple metric or one simple chart.

### Balanced

- One action title plus two to five support blocks.
- Minimum body size: 18 pt in PPTX, 21 px in HTML.
- Use callouts sparingly: one primary callout, two secondary callouts maximum.
- Charts should include direct labels when possible.

### Reading-First

- Page must stand alone with source, context, and interpretation.
- Minimum body size: 13 pt in PPTX, 16 px in HTML.
- Use section labels or table headers for scanning.
- Do not compress margins below 5% of slide width.
- Use footnotes only for source or method, not for core argument.

### Appendix-Heavy

- Treat as reference material, not main narrative.
- Minimum body size: 10 pt in PPTX, 12 px in HTML.
- Tables may be dense, but row height must remain readable.
- Use monochrome gridlines and restrained highlights.
- Each page needs an appendix label or index marker.

## Density Escalation

Escalate density only when the audience need demands it:

1. Start at the scenario default from `deck-decision-matrix.md`.
2. Move one level denser if the page must be read without narration.
3. Move one level lighter if the page is a chapter, cover, or visual emphasis slide.
4. Split the page if it exceeds the mode budget by more than 20%.
5. Convert overflow evidence into appendix pages.

## Page Splitting Rules

Split one page into two when any condition is true:

- More than one conclusion competes for the title.
- More than six bullets are needed in `balanced` mode.
- A data page needs more than two charts plus interpretation.
- A table requires text smaller than the mode minimum.
- The logo, source, or navigation treatment has to be removed to make room.

## Failure Handling

- If text overflows after resizing once, split content instead of shrinking below the minimum.
- If chart labels collide, simplify labels or move detail to an appendix.
- If the audience scenario conflicts with the requested density, honor the user's explicit density and record the risk.
- If output format cannot support the density cleanly, route to the more suitable format or mark the page `warning`.

