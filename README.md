# TasteCraft Decks / 审美工坊·演示美学

TasteCraft Decks is a local-first skill repository for making presentation work more deliberate: clearer briefs, stronger visual direction, inspectable deck contracts, and repeatable QA before a deck is delivered.

This repository is not a SaaS product, not a stock template gallery, and not a place for real customer brand assets. It is an open-source skill repository for agents that create or improve decks. The original scaffold includes editable PowerPoint, browser-native HTML decks, and image-enhanced presentations; the active V1 experiment is now narrowed to pure AI whole-slide PPT image generation.

## What It Does

- Routes presentation requests through a shared deck contract, `tastecraft.deck.json`.
- Provides a bilingual local console with Chinese as the default UI and English as a switchable mode.
- Keeps aesthetic choices explicit: palette, density, typography, logo policy, imagery policy, page intent, and QA status.
- Supports synthetic demo material so the public repo can show workflows without exposing real logos or client data.
- Gives contributors a common vocabulary for deck quality: audience fit, narrative flow, slide density, visual hierarchy, accessibility, and release readiness.

## Repository Map

| Path | Purpose |
| --- | --- |
| `skills/presentation-router/` | Router skill that chooses the execution path from a brief or deck spec. |
| `skills/editable-pptx/` | Skill instructions for editable PowerPoint delivery. |
| `skills/html-deck/` | Skill instructions for browser-native deck delivery. |
| `skills/image-enhanced-deck/` | Skill instructions for prompt-pack and image-enhanced deck workflows. |
| `schema/` | JSON Schema contracts for deck specs and prompt packs. |
| `docs/` | Architecture, contribution process, roadmap, release checklist, governance, and ADRs. |
| `demo/` | Synthetic examples and markdown gallery notes only. No binary assets or real logos. |
| `knowledge/` | Public design patterns, anti-patterns, synthetic briefs, and reusable writing rules. |
| `assets/` | Static TasteCraft console, palette assets, templates, and sample inputs. |
| `references/` | Shared deck decision, density, palette, logo, prompt, and QA rules. |
| `scripts/`, `tests/` | Local validation, packaging, smoke tests, and regression checks. |

## Current V1 Status

TasteCraft Decks currently contains the V1 local console, schema contracts, four skill entrypoints, shared design references, validation scripts, synthetic demo notes, and open-source operating docs. The current product direction is to make pure AI whole-slide PPT images look materially better than HTML or ordinary PPT composition while keeping prompt preview and QA explicit.

Use the release checklist in [docs/release-checklist.md](docs/release-checklist.md) before tagging any release. Do not treat hybrid HTML text/chart overlay as the default V1 path; it is only a benchmark or fallback after the June 8 test.

## Quick Start

### 1. Open the local console

The console is static HTML. It does not call an API and does not require a build step.

Open this file in a browser:

```text
assets/tastecraft-console/index.html
```

Or serve the repository locally:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/assets/tastecraft-console/index.html
```

### 2. Configure the deck

Use the console panels in order:

1. `Project Setup`: set audience, scenario, goal, output format, aspect ratio, and model capabilities.
2. `Batch Planner`: generate the seven-page baseline map.
3. `Page Map`: edit slide titles, page types, density, objectives, and prompt requirements.
4. `Visual System`: choose a V1 palette, typography density, logo placement, and image policy.
5. `Single-Slide Lab`: experiment with one slide before promoting a change to the deck.
6. `Prompt Review`: confirm only the image prompts that should be exported.
7. `Export / QA`: download `tastecraft.deck.json` and `prompt-pack.json`.

Important: `prompt-pack.json` exports confirmed prompts only. Draft or rejected prompts stay out of the handoff.

### 3. Invoke the skills

Use the router when the delivery path is unclear:

```text
Use $presentation-router with this tastecraft.deck.json and choose the right TasteCraft workflow.
```

Use an execution skill when the output is known:

```text
Use $editable-pptx to create an editable PowerPoint deck from this tastecraft.deck.json.
Use $html-deck to create a browser-native presentation from this tastecraft.deck.json.
Use $image-enhanced-deck to review this prompt-pack.json and produce deck visual prompts.
```

### 4. Validate before release

Run the local checks before publishing changes or packaging skills:

```bash
python3 scripts/validate_skill_metadata.py
python3 scripts/validate_references.py --strict
python3 scripts/validate_schema_examples.py
python3 scripts/smoke_test_console.py
python3 scripts/scan_sensitive_files.py
python3 scripts/build_dist.py --dry-run
python3 -m unittest discover -s tests
```

To build standalone skill bundles outside the source tree:

```bash
python3 scripts/build_dist.py --dist /private/tmp/tastecraft-dist-check
```

## Deck Contract

The core object is a deck spec:

- `project`: deck identity, name, and locale.
- `brief`: audience, scenario, goal, tone, and constraints.
- `output`: target format, aspect ratio, slide count, mode, and available model capabilities.
- `theme`: palette, typography, logo policy, brand mode, and imagery policy.
- `pages`: page-level objective, type, density, layout variant, visual role, logo policy, prompt references, and status.
- `qa`: completion and export readiness flags.

Image-enabled workflows also use `prompt-pack.json`, which exports only confirmed prompts and carries global image policy constraints.

## Example Use Cases / 典型场景

- Investor roadshow rewrite: convert a dense draft into a clean narrative with sharper page objectives.
- Board review deck: keep text-heavy operating context readable while enforcing consistent density rules.
- Product demo deck: route interactive or browser-native stories to the HTML deck path.
- Training deck: balance bilingual labels, repeatable layouts, and accessibility checks.
- Visual keynote: generate a prompt pack only after image intent and forbidden elements are explicit.

## Synthetic Demo Policy

All public examples must be synthetic. Do not add real company logos, client names, customer decks, private datasets, unreleased product screenshots, or generated images that imitate a real brand identity.

Permitted examples:

- Fictional organizations with clearly synthetic names.
- Invented metrics and placeholder product categories.
- Text-only gallery notes and generated prompt descriptions.
- Simple color palettes that do not reproduce a real brand system.

See [demo/gallery/README.md](demo/gallery/README.md) and [docs/governance/DATA_AND_BRAND_POLICY.md](docs/governance/DATA_AND_BRAND_POLICY.md).

## Contributing

Start with [docs/contribution-guide.md](docs/contribution-guide.md). In short:

1. Keep changes scoped.
2. Preserve local-first behavior.
3. Do not add binary assets unless a future release process explicitly allows them.
4. Use synthetic examples only.
5. Update docs, schemas, tests, and demo notes together when behavior changes.

## Governance

Open-source governance lives under [docs/governance/](docs/governance/). The current policy is maintainer-led, with ADRs required for decisions that affect schema contracts, public workflow promises, generated artifact policy, or release boundaries.

## License

MIT. See [LICENSE](LICENSE).
