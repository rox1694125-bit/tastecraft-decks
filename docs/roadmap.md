# Roadmap / 路线图

TasteCraft Decks is being built in stages. The roadmap separates public contracts, local control surfaces, and executable deck-generation workflows so contributors do not overclaim readiness.

## v0.1: Presentation Workflow Baseline

Status: implemented locally, pending release validation and GitHub push.

- Static local console for deck setup, page map planning, visual system controls, prompt review, and JSON export.
- Four skill entrypoints: `presentation-router`, `editable-pptx`, `html-deck`, and `image-enhanced-deck`.
- Shared references for routing, page types, density, color, typography, logo placement, prompt recipes, and QA.
- JSON Schemas for `tastecraft.deck.json` and `prompt-pack.json`.
- Validation scripts for skill metadata, references, schema examples, console smoke test, packaging, and sensitive-file scanning.
- Synthetic demo notes and open-source governance docs.

## v0.2: Quality Scoring And Prompt Lint

Status: planned.

- Add a prompt lint script that catches vague style language, missing audience, missing density, and unconfirmed image prompts.
- Add a richer QA scoring tool for contact sheets and page-type coverage.
- Add more synthetic gallery examples with before/after narratives.
- Add package integrity checks for generated `dist/skills/` bundles.

## v0.3: Word Report Routing

Status: planned.

- Add a report-router skill for Word-style executive reports.
- Reuse TasteCraft density, typography, brand, and QA language where it fits document work.
- Keep the Word workflow separate from deck generation so V1 presentation rules remain stable.

## v0.4: Web Report And HTML Artifact Expansion

Status: planned.

- Extend the HTML workflow beyond slide decks into web-native briefings and dashboard-style reports.
- Add accessibility and responsive-layout QA that is specific to scrolling or multi-section HTML.
- Preserve the local-first model and avoid SaaS dependencies.

## v1.0: Stable Public Contract

Status: planned.

- Freeze schema compatibility rules.
- Publish stable packaging instructions.
- Maintain a regression suite of synthetic examples.
- Document migration steps for breaking changes.
