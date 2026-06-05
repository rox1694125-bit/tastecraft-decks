# ADR-0001: Keep TasteCraft Decks Local-First

## Status

Accepted.

## Context

TasteCraft Decks is meant to help agents create better presentation outputs without requiring a hosted product. The repository contains skill instructions, schemas, docs, synthetic examples, and planned local assets. A hosted service would add account, privacy, network, and operational concerns that are outside the V1 goal.

## Decision

TasteCraft Decks will remain local-first for V1. Public workflows should work from local files, local skill instructions, and local schemas. Docs may mention optional model capabilities, but they should not require a proprietary hosted console or remote API as the core workflow.

## Consequences

- The deck contract must carry enough context for agents to work locally.
- Public examples must stay portable.
- Any local console should be static and should not require a hosted backend.
- Packaging must avoid private local files.
- Future hosted features require a new ADR.

