# PPTX Editing Guide

Use this guide for `editable-pptx` and the editable portions of `image-enhanced-pptx` workflows.

## Delivery Standard

A PPTX is successful when a normal PowerPoint user can edit text, shapes, charts, tables, and layout without rebuilding the page.

## Construction Rules

- Use real text boxes for text, not flattened screenshots.
- Use editable shapes for panels, dividers, tags, and icons when possible.
- Use native charts or editable chart-like shapes for simple data.
- Use generated images only as image assets, backgrounds, or visual panels.
- Keep each slide on a consistent grid.
- Name or group complex elements when the tool supports it.

## Page Setup

- Default aspect ratio: 16:9.
- Safe margin: at least 0.35 in for normal pages and 0.25 in for full-bleed image pages.
- Footer zone: reserve 0.25 to 0.45 in when using logo, page number, or source.
- Source notes: bottom left or bottom aligned to chart, 7 to 11 pt depending on density.

## Editability Rules By Content

| Content | Preferred PPTX Form | Avoid |
| --- | --- | --- |
| Titles and body | Text boxes | Text inside images |
| Diagrams | Shapes and connectors | Rasterized diagrams |
| Tables | Native tables or aligned text grid | Screenshots of tables |
| Simple charts | Native charts or editable shapes | Fake chart images |
| Complex visual scenes | Image asset plus editable labels | Labels baked into image |
| Icons | SVG or editable icon set | Low-resolution bitmap icons |

## Image-Enhanced PPTX Rules

- Generated image pages still need editable title, labels, and source notes.
- Do not bake logos into generated images.
- Keep image file names tied to page IDs.
- If image crop is important, document crop position in delivery notes.
- Use overlay rectangles for contrast rather than editing text into the image.

## QA Steps

1. Open the PPTX and inspect cover, one content page, one data page, one visual page, and closing.
2. Select text and confirm it is editable.
3. Select charts or tables and confirm they are not accidental screenshots unless approved.
4. Check logo size and clearspace.
5. Check no text is clipped at slide boundaries.
6. Export or preview as PDF only after editability is confirmed.

## Failure Handling

- If PPTX tooling cannot preserve a layout, simplify the layout before flattening it.
- If a chart cannot be made editable, label it as a visual figure and provide source data separately when available.
- If fonts substitute poorly, switch to Aptos or Arial and re-check line breaks.
- If PowerPoint opens with repair warnings, rebuild the affected slide or remove the unsupported object.
- If the user needs exact browser motion or complex interaction, route to `html-deck` instead of forcing PPTX.

