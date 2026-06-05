# Contributing to TasteCraft Decks / 贡献指南

TasteCraft Decks welcomes focused contributions that improve deck quality, agent reliability, public documentation, schemas, or synthetic examples. This project is local-first and contract-first, so the best contributions make behavior easier to inspect rather than harder to see.

## Contribution Principles

- Keep examples synthetic. Do not add real logos, client names, private decks, screenshots, or datasets.
- Preserve the local-first model. Public docs should not depend on a hosted service.
- Update related surfaces together: schema, skill text, docs, demo notes, and tests.
- Be explicit about status. Do not describe scaffolding as production-ready behavior.
- Favor small, reviewable pull requests over broad rewrites.

## Before You Start

1. Read [README.md](../README.md).
2. Read [docs/architecture.md](architecture.md).
3. Check [docs/roadmap.md](roadmap.md) for the current priority lane.
4. For governance-sensitive changes, check [docs/governance/GOVERNANCE.md](governance/GOVERNANCE.md).

## What Needs an ADR

Create an ADR in `docs/decisions/` when a change affects:

- schema shape or versioning;
- supported output formats;
- public demo asset policy;
- release readiness claims;
- governance, licensing, or data handling;
- packaging strategy;
- a skill routing decision that changes user-visible behavior.

Use the next available ADR number and a short hyphenated title. For example: ADR 0004 release package strategy.

## Synthetic Content Rules

Allowed:

- fictional company names;
- invented metrics;
- generated prompt descriptions without binary image output;
- neutral color palettes that do not copy a real brand;
- small text samples that demonstrate deck structure.

Not allowed:

- real customer names or decks;
- real company logos or near-copies;
- private brand books;
- screenshots from non-public tools;
- AI-generated imagery that imitates a real trademarked brand;
- personal data, even if partially masked.

## Pull Request Checklist

Before opening a PR:

- Confirm every public example is synthetic.
- Confirm touched docs still match the current schema.
- Confirm no restricted local paths or private files are referenced.
- Confirm the changelog is updated when the public surface changes.
- Confirm any new public claim can be demonstrated by code, schema, docs, or demo notes.

## Review Expectations

Reviewers should prioritize:

- correctness of public claims;
- schema and skill consistency;
- data and brand safety;
- accessibility and deck-quality reasoning;
- maintainability of examples and release process.

Style nits are secondary unless they affect readability or project consistency.

## Language Style

English is the default for public docs. Short Chinese labels are welcome when they clarify the product identity or expected user workflow, for example `审美工坊`, `演示美学`, `受众`, and `交付检查`.
