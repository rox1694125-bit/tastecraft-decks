# TasteCraft Decks Handoff

## Required Reading Order

1. `PROJECT_STATUS.md`
2. `docs/architecture.md`
3. `schema/tastecraft.deck.schema.json`
4. `schema/prompt-pack.schema.json`
5. `references/qa-checklist.md`
6. `README.md`

## Current Decisions

- V1 is presentation-only: PPTX, HTML deck, and image-enhanced deck.
- The local console is static HTML/CSS/JS and does not call AI APIs.
- `prompt-pack.json` may include only confirmed prompts.
- The source repository shares references and assets; release packages generated under `dist/skills/` are self-contained.
- Private brand kits live only under `knowledge/brand-kits/_local/` and are ignored by Git.
- The canonical V1 palette IDs are the six IDs in `assets/palettes/v1-palettes.json`; console defaults and demo samples use `market-slate`.

## Known Constraints

- No SaaS, accounts, cloud sync, or collaboration layer in V1.
- No Word report implementation in V1.
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

## Next Agent Task

Use the `v0.1.0` baseline for early synthetic testing, then improve prompt lint, demo gallery quality, and release packaging.
