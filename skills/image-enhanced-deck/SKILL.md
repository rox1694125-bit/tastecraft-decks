---
name: image-enhanced-deck
description: Prepare AI-image prompt packs, generated visuals, contact sheets, and image-enhanced TasteCraft decks. Use when a presentation needs confirmed visual prompts, cover or chapter imagery, image-rich PPTX output, or reviewable prompt-to-slide traceability.
---

# Image Enhanced Deck

## Purpose

Turn deck visual needs into confirmed prompts and usable assets, then integrate approved images into a TasteCraft deck workflow.

## Inputs

- TasteCraft deck spec or brief normalized against `../../schema/tastecraft.deck.schema.json`.
- Prompt packs validated against `../../schema/prompt-pack.schema.json`.
- Shared visual style, brand, image safety, and QA guidance under `../../references/`; load only the files needed for the deck.

## Workflow

1. Identify pages with `visual_role` or `image_prompt_refs` that need generated imagery.
2. Draft a prompt pack with global image policy, one prompt per required visual, negative prompts, reference notes, aspect ratio, and generation parameters.
3. Ask for confirmation before generation when prompts are new or materially changed. The prompt pack export policy is confirmed prompts only.
4. Generate or place images, then create a quick review surface such as a contact sheet or slide-by-slide preview.
5. Hand off approved assets to `$editable-pptx` for image-enhanced PPTX delivery or `$html-deck` for browser-native delivery.

## Output Requirements

- Keep prompt IDs and page IDs traceable from prompt pack to final deck.
- Store generated assets outside skill source folders unless the user names a target output directory.
- Mark unresolved, rejected, or placeholder visuals clearly in the deck spec or delivery notes.

## Guardrails

- Do not generate images from unconfirmed prompts when the user asked for a reviewable prompt workflow.
- Do not use private logos, real client images, or proprietary reference art unless supplied and approved for this deck.
- Keep imagery supportive of the slide objective; avoid decorative images that reduce readability.
