# ADR-0002: Use Schema-First Deck Contracts

## Status

Accepted.

## Context

Presentation workflows can become ambiguous when briefs, design choices, and QA state are stored only in prose. TasteCraft Decks needs a reliable handoff between router, execution skills, demo examples, validation tools, and future packaging.

## Decision

The project will treat `tastecraft.deck.json` as the primary deck handoff contract and `prompt-pack.json` as the image-workflow contract. Public docs and skills should refer back to these schemas when describing required fields or workflow readiness.

## Consequences

- Schema changes require release notes and usually an ADR.
- Demos should be traceable to schema fields.
- Skills should avoid hidden assumptions that are not represented in the spec.
- Prompt packs should export confirmed prompts only.
- Validation tools are a roadmap priority.

