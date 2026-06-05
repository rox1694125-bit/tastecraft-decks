# Deck Decision Matrix

Use this matrix before choosing a TasteCraft execution path. The goal is to route the deck to the smallest output mode that can satisfy the brief without sacrificing editability, visual quality, or QA.

## Required Inputs

Collect these fields before routing:

- Audience: decision makers, sales prospects, internal operators, technical reviewers, trainees, or mixed.
- Scenario: keynote, investor-roadshow, internal-report, board-review, product-demo, technical-brief, training, or other.
- Output format: `editable-pptx`, `html-deck`, `image-enhanced-pptx`, or `auto`.
- Slide count and aspect ratio.
- Brand mode: `none`, `light-brand`, `strong-brand`, or `white-label`.
- Image policy: AI image enabled or disabled, style direction, forbidden elements.
- Density target: `speaker-led`, `balanced`, `reading-first`, or `appendix-heavy`.

## Routing Rules

| Condition | Primary Route | Rationale | Hard Stop |
| --- | --- | --- | --- |
| User needs PowerPoint editing after delivery | `editable-pptx` | Every text box, chart, and shape must remain editable. | Do not flatten slides into screenshots except for approved generated images. |
| User wants a live browser-native presentation, motion, scroll sections, or responsive review | `html-deck` | HTML handles interaction, animated data, and viewport QA better than PPTX. | Do not deliver as HTML if offline PowerPoint editing is the explicit requirement. |
| Deck relies on custom scenes, product imagery, editorial art, or generated backgrounds | `image-enhanced-pptx` | Prompt pack and image QA become first-class work. | Do not generate images for regulated claims, private people, private logos, or unconfirmed brand assets. |
| User asks for `auto` and the content is mostly text, charts, and standard layouts | `editable-pptx` | PowerPoint is the safest general-purpose deliverable. | If more than 30% of pages need custom art, reconsider image-enhanced. |
| User asks for `auto` and wants immersive visual review or web sharing | `html-deck` | Browser QA gives the strongest visual iteration loop. | If export to PPTX is required, build PPTX instead. |
| User asks for a single high-impact hero or concept page before the deck | `image-enhanced-pptx` with `mode=single` | Single-page experiments are appropriate for style discovery. | Do not apply the experiment to all pages until the user confirms it. |

## Page Type Selection

Every page must use exactly one schema page type:

- `cover`: opens the story; use once unless a new deck section is externally packaged.
- `agenda`: previews flow; use when the audience needs navigation.
- `chapter`: resets context between major sections.
- `content`: carries argument, recommendations, process, or explanation.
- `data`: carries numeric evidence, charts, tables, or scorecards.
- `visual`: carries image-led comparison, product view, journey map, or scene.
- `closing`: ends with decision, next step, contact, or appendix marker.

## Density Selection

Choose density from audience behavior, not personal taste:

- `speaker-led`: live presenter, strong voiceover, low text tolerance.
- `balanced`: normal executive deck, readable without full transcript.
- `reading-first`: asynchronous review, board packet, or remote handoff.
- `appendix-heavy`: reference pages, evidence packs, model assumptions, detailed tables.

## Default Deck Shapes

| Scenario | Typical Page Mix | Default Density | Default Format |
| --- | --- | --- | --- |
| Keynote | cover, chapter, visual, content, closing | `speaker-led` | `html-deck` or `image-enhanced-pptx` |
| Investor roadshow | cover, content, data, visual, closing | `balanced` | `editable-pptx` |
| Internal report | cover, agenda, content, data, closing | `reading-first` | `editable-pptx` |
| Board review | cover, agenda, data, content, closing, appendix data | `reading-first` | `editable-pptx` |
| Product demo | cover, visual, content, data, closing | `balanced` | `html-deck` |
| Technical brief | cover, agenda, content, data, closing | `reading-first` | `editable-pptx` |
| Training | cover, agenda, chapter, content, visual, closing | `balanced` | `html-deck` |

## Failure Handling

If routing is uncertain:

1. Pick the route that preserves editability.
2. Mark unresolved assumptions in the deck spec `brief.constraints`.
3. Use `mode=batch_with_single_page_experiments` only when style is the main uncertainty.
4. Do not invent private brand assets, logos, customer data, market data, or image references.
5. If two routes are equally valid, deliver the primary requested format and document the alternative in the handoff.

