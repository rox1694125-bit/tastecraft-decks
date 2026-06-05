# Architecture

TasteCraft Decks is a local-first skill repository for presentation aesthetics. It is not a template library and not a hosted product. The project uses schemas and skill instructions to make deck-generation work explicit, inspectable, and repeatable.

## Current State

The repository currently contains the V1 baseline: schema contracts, a static local console, four skill entrypoints, shared design references, validation scripts, synthetic demo notes, and public documentation. The remaining release work is validation, packaging review, GitHub publishing, and continued demo refinement.

## System Pieces

- `schema/`: contracts for `tastecraft.deck.json` and `prompt-pack.json`.
- `skills/presentation-router/`: routes a user request or exported spec to the correct execution path.
- `skills/editable-pptx/`: guides editable PowerPoint delivery.
- `skills/html-deck/`: guides browser-native presentation delivery.
- `skills/image-enhanced-deck/`: guides visual generation and prompt-pack workflows.
- `assets/tastecraft-console/`: static local console for deck setup, page maps, visual controls, prompt review, and JSON export.
- `references/`: shared routing, page type, density, color, typography, logo, prompt, and QA rules.
- `scripts/`: validation, packaging, smoke-test, and sensitive-file scanning tools.
- `tests/`: standard-library regression checks for schema examples and tooling scripts.
- `docs/`: public operating model, release process, roadmap, governance, and ADRs.
- `demo/`: synthetic markdown examples and gallery notes.
- `knowledge/`: reusable public patterns, anti-patterns, and synthetic briefs.
- `dist/`: generated skill packages; keep it out of source control and create it through `scripts/build_dist.py`.

## Data Flow

1. User configures a deck in a local console, provides an existing deck, or asks the router directly.
2. The workflow creates or reads `tastecraft.deck.json`.
3. Image workflows create `prompt-pack.json` only when prompts are confirmed.
4. The router chooses editable PPTX, HTML deck, or image-enhanced deck.
5. The execution skill reads the relevant reference material.
6. Output is checked against the QA rubric before delivery.

## Contract-First Design

The deck spec is the primary handoff surface between agents. It avoids hiding key choices inside prose by requiring explicit values for:

- audience and scenario;
- target format and generation mode;
- palette, typography, logo, and imagery policy;
- page-level objective, density, visual role, and status;
- QA readiness.

The prompt-pack schema is intentionally narrower. It exports confirmed image prompts only, with global image policy and forbidden elements attached.

## Packaging Strategy

Packaging creates self-contained skill packages under `dist/skills/` by copying each skill plus shared references and selected assets needed for standalone installation. Packaging tools must not include private examples, local brand kits, real logos, generated binary assets, or unreviewed customer material.

## V1 Boundaries

- No SaaS.
- No remote API calls from the public console.
- No WYSIWYG slide editor.
- No Word report generator.
- No real customer assets in the public repo.
- No public demo asset that imitates a real brand identity.

## Design Risks

- **Schema drift:** skill instructions, demo examples, and schemas can diverge. Release review must validate them together.
- **Overclaiming readiness:** public docs must distinguish V1 skill instructions from fully automated deck-generation products.
- **Asset leakage:** examples must remain synthetic, and local brand kits must stay out of public paths.
- **Format sprawl:** new output targets require an ADR before they become first-class.
