# Governance

TasteCraft Decks uses a maintainer-led governance model. The project is small enough that decisions should remain lightweight, but public contracts and release claims still need written accountability.

## Maintainer Responsibilities

Maintainers are responsible for:

- accepting or rejecting pull requests;
- keeping the roadmap realistic;
- enforcing synthetic-demo and brand-safety rules;
- reviewing schema and release changes;
- ensuring public docs do not overstate implementation status;
- requesting ADRs for decisions with lasting impact.

## Decision Process

Small changes can be handled in pull requests. Larger changes require an ADR in `docs/decisions/`.

An ADR is required for:

- schema version changes;
- new first-class output formats;
- packaging strategy changes;
- data or brand policy changes;
- release-readiness definitions;
- governance or licensing changes.

## Contributor Expectations

Contributors should:

- keep examples fictional;
- document the reason for behavioral changes;
- avoid changing unrelated files;
- respect peer edits in the worktree;
- use issue and PR templates when available.

## Conflict Resolution

When maintainers disagree, use this order:

1. Public safety and data handling.
2. Contract correctness.
3. User-facing reliability.
4. Maintainability.
5. Aesthetic preference.

If a decision remains unresolved, document the tradeoff in an ADR and mark the affected work as blocked until a maintainer signs off.

## Release Authority

Only maintainers should tag releases or publish packaged artifacts. A release should not be tagged until [docs/release-checklist.md](../release-checklist.md) is complete.
