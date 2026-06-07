# TasteCraft Decks Project Status

## Current State

- Repository bootstrapped locally with V1 baseline files.
- V1 is being refocused from a broad deck system to a Codex-first PPT image generation workflow.
- The current V1 main path is pure AI whole-slide image generation for PPT-ready pages. The hybrid path of AI background/visual system plus HTML text/chart overlay has been tested and rejected as the default because it does not meet the desired visual ceiling.
- GitHub public repository created and pushed: `https://github.com/rox1694125-bit/tastecraft-decks`.
- GitHub release created: `https://github.com/rox1694125-bit/tastecraft-decks/releases/tag/v0.1.0`.
- Local console now supports Chinese and English UI modes, with Chinese as the default.
- Prompt template testing should start with single-slide comparison before any full-deck generation.

## V1 Definition

TasteCraft Decks V1 should prioritize a narrower workflow:

1. User provides a natural-language slide brief and target aspect ratio.
2. TasteCraft turns the brief into high-ambition pure-image prompts across style templates.
3. User previews, edits, and confirms prompts before image generation.
4. Codex image generation creates full-slide PPT-ready images.
5. Review text accuracy, visual taste, PPT fit, and template fidelity.
6. Distill user feedback into reusable prompt template improvements.

## Current Risks

- V1 must avoid expanding back into a full deck router, SaaS, WYSIWYG editor, Word report generator, or generic website builder.
- Whole-slide image generation with text is high-risk; typos, garbled text, missing text, and wrong meaning must be rejected.
- Hybrid HTML overlay can remain a comparison artifact or emergency fallback, but it should not be optimized as the main V1 direction unless the user explicitly reopens that route.
- Demo assets must remain synthetic and safe for public release.
- Future releases should keep generated binary outputs out of source control unless reviewed.

## Next Step

Revise the six prompt templates around pure AI final-page output, then run the next single-slide comparison using `docs/prompt-testing-protocol.md`.
