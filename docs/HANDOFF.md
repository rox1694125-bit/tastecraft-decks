# TasteCraft Decks Handoff

## Required Reading Order

1. `PROJECT_STATUS.md`
2. `docs/architecture.md`
3. `schema/tastecraft.deck.schema.json`
4. `schema/prompt-pack.schema.json`
5. `references/qa-checklist.md`
6. `docs/prompt-testing-protocol.md`
7. `README.md`

## Current Decisions

- V1 is being narrowed to Codex-first PPT image generation rather than full PPTX / HTML deck routing.
- The active V1 route is pure AI whole-slide finished images. The tested hybrid route of AI-generated background/visual system plus deterministic HTML text/chart overlay is not the main path because the result felt visually weaker than pure AI output.
- The local console is static HTML/CSS/JS and does not call AI APIs.
- `prompt-pack.json` may include only confirmed prompts.
- The source repository shares references and assets; release packages generated under `dist/skills/` are self-contained.
- Private brand kits live only under `knowledge/brand-kits/_local/` and are ignored by Git.
- The canonical V1 palette IDs are the six IDs in `assets/palettes/v1-palettes.json`; console defaults and demo samples use `market-slate`.
- The local console supports `zh-CN` and English UI modes. It defaults to `zh-CN`; switching languages changes UI labels and generated sample copy without changing schema field values.
- Prompt testing starts with single-slide comparison across the six templates. Full-deck testing comes only after the best templates and prompt lessons are identified.
- Whole-slide image generation may include text in V1 tests, but any key typo, missing text, garbled text, or wrong meaning is a reject.
- HTML/PPT exact overlay is allowed only as a documented fallback or benchmark. Do not spend further V1 work improving it unless explicitly requested.

## Known Constraints

- No SaaS, accounts, cloud sync, or collaboration layer in V1.
- No Word report implementation in V1.
- Do not treat PPTX auto-assembly or HTML deck output as active V1 behavior until the narrowed image workflow is stable.
- No real customer data, private logos, tokens, or generated binary outputs in the public repo.
- GitHub remote is `https://github.com/rox1694125-bit/tastecraft-decks`.

## Validation Checklist

- Run `python3 scripts/validate_skill_metadata.py`.
- Run `python3 scripts/validate_references.py`.
- Run `python3 scripts/validate_schema_examples.py`.
- Run `python3 scripts/smoke_test_console.py`.
- Run `python3 scripts/scan_sensitive_files.py`.
- Run `python3 scripts/build_dist.py --dry-run`.
- Run `python3 -m unittest discover -s tests`.

## Latest Validation

- Full local validation chain passed after verifier fixes.
- `scripts/smoke_test_console.py` now executes the console export functions through Node and verifies that unconfirmed prompts are excluded from `prompt-pack.json`.
- Chrome headless screenshot verified the static console renders at `/assets/tastecraft-console/index.html`.
- GitHub public repo and remote `main` were verified after push.
- GitHub release `v0.1.0` was created at `https://github.com/rox1694125-bit/tastecraft-decks/releases/tag/v0.1.0`.
- Bilingual console update passed local validation: JS syntax check, console smoke test, schema examples, strict reference validation, sensitive-file scan, and unit tests.
- In-app browser verification for the local `file://` console URL was blocked by Browser Use URL policy; validation continued through local scripts.
- Added `docs/prompt-testing-protocol.md` to define single-slide prompt comparison, scenario differences, feedback capture, and distillation rules.

## Next Agent Task

Rewrite the six single-slide prompt templates for pure AI finished-page output, generate one candidate per style template from the tax-comparison brief, capture feedback using the protocol, and push the distilled findings.
