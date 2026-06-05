---
name: html-deck
description: Build browser-native TasteCraft presentation decks from briefs or tastecraft.deck.json specs. Use for HTML/CSS/JS slide decks, local previews, interactive or keyboard-navigable presentations, responsive web delivery, and print-to-PDF friendly deck output.
---

# HTML Deck

## Purpose

Create a browser-native deck that is easy to preview, share locally, and adapt with HTML/CSS while preserving the TasteCraft spec structure.

## Inputs

- TasteCraft deck spec or brief normalized against `../../schema/tastecraft.deck.schema.json`.
- Shared visual rules, QA guidance, and component patterns under `../../references/`; load only relevant files.
- Prompt pack data only when the deck uses generated imagery: `../../schema/prompt-pack.schema.json`.

## Workflow

1. Confirm target aspect ratio, navigation mode, output location, image policy, and whether the user needs a single HTML file or asset folder.
2. Map each spec page to a slide section with stable IDs from `page_id`.
3. Implement theme tokens for palette, typography, spacing, density, and logo behavior before composing individual slides.
4. Build navigation expected of a deck: keyboard next/previous, visible progress, responsive scaling, and print/PDF behavior when requested.
5. Preview locally when possible and check for blank slides, text overflow, contrast issues, broken images, and mobile layout failures.

## Output Requirements

- Produce static HTML/CSS/JS that can run locally without a hosted backend.
- Keep source readable and organized; avoid framework setup unless the existing project or user request requires it.
- Document any assets that are placeholders or must be replaced before final use.

## Guardrails

- V1 is a deck workflow, not a full web app or SaaS product.
- Do not call APIs from local deck output unless the user explicitly adds that requirement.
- Do not hide critical slide content in hover-only or animation-only states.
