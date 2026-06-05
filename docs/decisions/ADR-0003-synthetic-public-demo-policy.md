# ADR-0003: Use Synthetic Public Demos Only

## Status

Accepted.

## Context

Deck workflows often involve sensitive client content, proprietary brand systems, private logos, and confidential business metrics. An open-source repository should be safe to inspect and fork without exposing or implying rights to private material.

## Decision

All public demo and knowledge examples must be synthetic. The repository must not include real logos, client decks, private brand books, personal data, proprietary screenshots, or generated assets that imitate a real brand identity.

## Consequences

- Demo gallery entries are markdown-only unless a future release policy explicitly approves reviewed assets.
- Synthetic examples must be clearly labeled as fictional.
- Local real brand kits, if used by contributors, must remain outside public paths such as `knowledge/brand-kits/_local/`.
- Reviewers may reject examples that are ambiguous or too close to a real organization.

