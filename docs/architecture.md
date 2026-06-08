# Architecture

TasteCraft Decks is a local-first skill repository for presentation aesthetics. It is not a template library and not a hosted product. The project uses schemas and skill instructions to make deck-generation work explicit, inspectable, and repeatable.

## Current State

The repository currently contains the V1 baseline: `tastecraft-image`, structured image prompt templates, prompt/image logging helpers, schema contracts, a static local console, legacy skill entrypoints, shared design references, validation scripts, synthetic demo notes, and public documentation. The active V1 direction is narrowed to a Codex-first skill for pure AI whole-slide PPT image generation; broader PPTX, HTML deck, and report routes remain scaffolded but should not drive near-term work.

## System Pieces

- `skills/tastecraft-image/`: V1 main Codex skill for content analysis, template recommendation, prompt confirmation, optional image generation, and lightweight image review.
- `assets/tastecraft-image/`: structured built-in and custom image template source used by `tastecraft-image`.
- `scripts/tastecraft_image_log.py`: appends `draft_prompt`, `generated_image`, and feedback events to machine-readable JSONL and human-readable Markdown logs.
- `scripts/validate_tastecraft_image_templates.py`: validates built-in and custom template JSON.
- `schema/`: legacy contracts for `tastecraft.deck.json` and `prompt-pack.json`.
- `skills/presentation-router/`: legacy router that routes a user request or exported spec to an execution path.
- `skills/editable-pptx/`: legacy editable PowerPoint delivery skill.
- `skills/html-deck/`: legacy browser-native presentation delivery skill.
- `skills/image-enhanced-deck/`: legacy visual generation and prompt-pack workflow skill.
- `assets/tastecraft-console/`: static local console for prompt preview, deck setup experiments, visual controls, prompt review, and JSON export.
- `references/`: shared routing, page type, density, color, typography, logo, prompt, and QA rules.
- `scripts/`: validation, packaging, smoke-test, and sensitive-file scanning tools.
- `tests/`: standard-library regression checks for schema examples and tooling scripts.
- `docs/`: public operating model, release process, roadmap, governance, and ADRs.
- `demo/`: synthetic markdown examples and gallery notes.
- `knowledge/`: reusable public patterns, anti-patterns, and synthetic briefs.
- `dist/`: generated skill packages; keep it out of source control and create it through `scripts/build_dist.py`.

## Data Flow

1. User pastes complete slide content in Codex and invokes `tastecraft-image`.
2. The skill identifies title, content type, modules, must-preserve body copy, key numbers, density risk, and any explicit aspect ratio.
3. The skill loads built-in and custom templates, recommends one Chinese display-name template, and optionally names one or two alternatives.
4. The skill outputs a Chinese primary image prompt plus an English variant, then logs the event as `draft_prompt`.
5. The skill waits for explicit generation confirmation.
6. After confirmation, Codex image generation creates one pure AI whole-slide PPT-ready image and logs `generated_image`.
7. The output is checked against the image review rubric: text completeness, number accuracy, no fake labels or disclaimers, readable visual hierarchy, and content-serving decoration.

Legacy deck-contract flow remains available when explicitly requested:

1. User configures a deck in the local console, provides an existing deck, or asks the router directly.
2. The workflow creates or reads `tastecraft.deck.json`.
3. Image workflows create `prompt-pack.json` only when prompts are confirmed.
4. A legacy execution skill reads the relevant reference material and produces its requested output.

## Contract-First Design

For the V1 `tastecraft-image` workflow, the primary handoff surface is the generated prompt plus the run log. The skill must keep the user's full body copy visible in the prompt by default and must not hide shortening or template decisions inside unlogged prose.

For legacy workflows, the deck spec remains the primary handoff surface between agents. It avoids hiding key choices inside prose by requiring explicit values for:

- audience and scenario;
- target format and generation mode;
- palette, typography, logo, and imagery policy;
- page-level objective, density, visual role, and status;
- QA readiness.

The prompt-pack schema is intentionally narrower. It exports confirmed image prompts only, with global image policy and forbidden elements attached.

## Packaging Strategy

Packaging creates self-contained skill packages under `dist/skills/` by copying selected skills plus shared references and selected assets needed for standalone installation. By default, packaging builds only `tastecraft-image` when it exists. Use `--include-legacy` when legacy skill bundles are intentionally needed.

Packaging tools must not include private examples, local brand kits, real logos, generated binary assets, or unreviewed customer material.

## V1 Boundaries

- No SaaS.
- No remote API calls from the public console.
- No WYSIWYG slide editor.
- No Word report generator.
- No silent content summarization in `tastecraft-image`.
- No image generation before explicit user confirmation.
- No real customer assets in the public repo.
- No public demo asset that imitates a real brand identity.

## Design Risks

- **Schema drift:** skill instructions, demo examples, and schemas can diverge. Release review must validate them together.
- **Overclaiming readiness:** public docs must distinguish V1 skill instructions from fully automated deck-generation products.
- **Asset leakage:** examples must remain synthetic, and local brand kits must stay out of public paths.
- **Format sprawl:** new output targets require an ADR before they become first-class.
