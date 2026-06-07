# TasteCraft Decks Project Status

## Current State

- Repository bootstrapped locally with V1 baseline files.
- V1 is being refocused from a broad deck system to a Codex-first PPT image generation workflow.
- GitHub public repository created and pushed: `https://github.com/rox1694125-bit/tastecraft-decks`.
- GitHub release created: `https://github.com/rox1694125-bit/tastecraft-decks/releases/tag/v0.1.0`.
- Local console now supports Chinese and English UI modes, with Chinese as the default.
- Prompt template testing should start with single-slide comparison before any full-deck generation.

## V1 Definition

TasteCraft Decks V1 should prioritize a narrower workflow:

1. Configure one or more PPT image pages in a static local console.
2. Preview, edit, and confirm prompts.
3. Use Codex image generation to create full-slide images.
4. Review text accuracy, visual taste, PPT fit, and template fidelity.
5. Distill user feedback into reusable prompt template improvements.

## Current Risks

- V1 must avoid expanding back into a full deck router, SaaS, WYSIWYG editor, Word report generator, or generic website builder.
- Whole-slide image generation with text is high-risk; typos, garbled text, missing text, and wrong meaning must be rejected.
- Demo assets must remain synthetic and safe for public release.
- Future releases should keep generated binary outputs out of source control unless reviewed.

## Next Step

Run the first single-slide prompt comparison using `docs/prompt-testing-protocol.md`, then update templates from the feedback.
