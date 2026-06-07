# Image Generation Guide

Use this guide when a deck uses AI-generated imagery, image-enhanced PPTX, or image-led HTML pages.

## Current V1 Route

The active V1 experiment is pure AI whole-slide image generation for PPT-ready pages. The tested route of AI-generated background/visual system plus deterministic HTML text/chart overlay is not the default because it did not meet the desired visual ceiling.

Whole-slide images may include Chinese text, numbers, charts, and labels in the current prompt tests. This is intentionally risky and must be evaluated strictly: any key typo, garbled label, wrong number, or country/category mismatch is a reject.

## Image Use Policy

Generate images only when they improve the deck objective:

- Cover or chapter image creates a stronger first impression.
- Visual page needs a scene, product context, or conceptual comparison.
- Content page needs an explanatory visual that cannot be made clearly with simple shapes.
- Data page needs a subtle motif, not fake data.

Do not generate images for:

- Private people, private customer data, private logos, or confidential facilities without explicit source and permission.
- Unverified charts, numbers, certifications, screenshots, or legal/financial/medical claims.
- Replacement of editable text or tables when exactness is the higher priority than visual ambition.
- Generic decoration that does not clarify the page.

## Workflow

1. Identify pages with `visual_role` requiring generated assets.
2. Draft prompts from `prompt-recipes.md`.
3. Confirm prompt purpose, safe area, palette, forbidden elements, and aspect ratio.
4. Add only confirmed prompts to `prompt-pack.json`.
5. Generate images.
6. Inspect contact sheet or page previews for artifacts.
7. For current V1 pure-image tests, inspect the finished image directly rather than adding editable overlays.
8. Score imagery and prompt pack under the QA rubric.

## Image Specs

- 16:9 full slide: 1792 x 1024 or equivalent.
- 4:3 full slide: 1536 x 1152 or equivalent.
- Half-slide panel: at least 1200 px on the long edge.
- Icon-like spot visual: transparent background preferred, at least 1024 px.
- Avoid upscaling low-resolution images beyond 125%.

## Safe Areas

For text overlays:

- Title safe area: top left, top right, or center field must be named in the prompt.
- Minimum overlay width: 35% of slide.
- Avoid placing text over high-detail faces, hands, product controls, or chart-like marks.
- Use a translucent overlay only when it improves contrast without hiding the subject.

## Artifact Inspection

Reject or regenerate images with:

- Warped hands, faces, product edges, or utensils when subject is inspectable.
- Watermarks, signatures, fake brand marks, or fake labels.
- Embedded text, random numbers, fake UI, or chart-like claims.
- Overly dark, blurred, cropped, or generic stock-photo composition.
- Style mismatch across pages intended to feel like one deck.

## Failure Handling

- If a prompt repeatedly produces text artifacts, move all labels to editable overlay and simplify the subject.
- If generated people look unrealistic, use hands, silhouettes, environment, or product-only composition.
- If brand assets are required but unavailable, generate neutral imagery and reserve brand for editable overlays.
- If the image cannot pass QA after two prompt revisions, replace it with an editable diagram or sourced asset.
- If the user wants a risky or unverified image claim, refuse that element and offer a safe conceptual alternative.
