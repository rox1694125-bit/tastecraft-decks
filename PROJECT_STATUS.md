# TasteCraft Decks Project Status

## Current State

- Repository bootstrapped locally with V1 baseline files.
- V1 is being refocused from a broad deck system to `tastecraft-image`, a Codex-first PPT image prompt skill.
- The current V1 main path is: user pastes complete slide content in Codex, `tastecraft-image` analyzes the content, recommends one built-in or custom template, outputs Chinese and English prompt variants, logs the draft prompt, waits for explicit generation confirmation, then calls image generation for a PPT-ready whole-slide image.
- The hybrid path of AI background/visual system plus HTML text/chart overlay has been tested and rejected as the default because it does not meet the desired visual ceiling.
- GitHub public repository created and pushed: `https://github.com/rox1694125-bit/tastecraft-decks`.
- GitHub release created: `https://github.com/rox1694125-bit/tastecraft-decks/releases/tag/v0.1.0`.
- Local console supports Chinese and English UI modes, with Chinese as the default. It is now a prompt preview and regression aid, not the primary V1 user flow.
- Prompt template testing should start with a single-slide Codex prompt and generated-image review before any full-deck generation.

## V1 Definition

TasteCraft Decks V1 should prioritize a narrower Codex skill workflow:

1. User pastes complete slide content into Codex and invokes `tastecraft-image`.
2. The skill preserves the full body copy by default, identifies structure and key numbers, and recommends one template with a short reason.
3. The skill outputs a Chinese primary prompt and an English variant for review.
4. The draft prompt is logged before generation.
5. User explicitly confirms image generation.
6. Codex image generation creates one full-slide PPT-ready image.
7. Review text accuracy, visual taste, PPT fit, and template fidelity.
8. Distill user feedback into reusable built-in or custom prompt template improvements.

## Current Risks

- V1 must avoid expanding back into a full deck router, SaaS, WYSIWYG editor, Word report generator, or generic website builder.
- Whole-slide image generation with text is high-risk; typos, garbled text, missing text, and wrong meaning must be rejected.
- The skill must not silently summarize, shorten, or delete user-provided body copy unless the user explicitly asks for compression or summary.
- Template selection must avoid hard-coded object routes such as "insurance = shield" or "Hong Kong = skyline"; metaphors should come from the content and page objective.
- Hybrid HTML overlay can remain a comparison artifact or emergency fallback, but it should not be optimized as the main V1 direction unless the user explicitly reopens that route.
- Demo assets must remain synthetic and safe for public release.
- Future releases should keep generated binary outputs out of source control unless reviewed.

## Next Step

Finish the `tastecraft-image` skill package, template asset validation, prompt/image logging helper, and default packaging behavior. Then run a complete single-slide Codex flow: prompt preview, explicit confirmation, generated image, and review log.
