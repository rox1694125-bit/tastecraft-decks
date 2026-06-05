---
name: editable-pptx
description: Create or revise polished, editable PowerPoint decks from TasteCraft Decks briefs or tastecraft.deck.json specs. Use for PPTX, Office handoff, investor roadshow, board review, internal report, training, and any workflow where slide text and shapes must remain editable.
---

# Editable PPTX

## Purpose

Produce a PowerPoint deck that remains editable: text as text, charts as editable objects where practical, and visual structure built from slide elements instead of flattened screenshots.

## Inputs

- TasteCraft deck spec or brief normalized against `../../schema/tastecraft.deck.schema.json`.
- Shared QA, design, typography, and brand guidance under `../../references/`; load only the files needed for the current deck.
- If images or prompts are supplied, validate prompt expectations against `../../schema/prompt-pack.schema.json` and coordinate with `$image-enhanced-deck` when needed.

## Workflow

1. Confirm or infer the delivery basics: audience, scenario, goal, slide count, aspect ratio, locale, density, brand mode, and output path.
2. Build or update the deck from the spec page list. Preserve page order, page IDs, titles, objectives, density, visual role, and logo policy.
3. Use editable PowerPoint primitives for layout: text boxes, shapes, tables, chart objects, icons, and placed images only where images are intentional.
4. Apply the theme consistently: palette, typography, spacing, logo placement, and density rules.
5. Run a final slide pass for hierarchy, alignment, overflow, contrast, repeated footer/logo behavior, and export readiness.

## Output Requirements

- Deliver a `.pptx` unless the user requests an intermediate spec only.
- Include concise notes on unresolved assumptions or assets that were replaced with placeholders.
- Keep generated binary outputs out of source-controlled skill folders unless the user explicitly asks otherwise.

## Guardrails

- Do not flatten a whole slide into one image for convenience.
- Do not expand V1 into a generic report generator or website builder.
- Do not use private logos, client data, or brand kits unless the user has provided them for this deck.
