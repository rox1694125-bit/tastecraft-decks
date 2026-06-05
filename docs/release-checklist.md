# Release Checklist / 发布检查清单

Use this checklist before publishing a tagged release, shipping a packaged skill bundle, or presenting the repository as ready for external use.

## 1. Scope

- Release version is selected and reflected in `CHANGELOG.md`.
- Release notes identify what is complete, what is scaffolded, and what is still planned.
- Any change to public behavior is covered by docs or an ADR.
- No restricted directories are included in generated packages.

## 2. Schema And Contract

- `schema/tastecraft.deck.schema.json` validates the deck examples used in demos.
- `schema/prompt-pack.schema.json` validates prompt-pack examples if image workflows are included.
- Schema versioning is documented for any breaking change.
- Required fields in README and docs match the schema.
- Deprecated fields, if any, are clearly marked.

## 3. Skills

- Skill descriptions are complete and no placeholder `TODO` text remains in releasable skill files.
- Router behavior is documented and matches the skill text.
- Each execution skill states when to use it, when not to use it, and which references it loads.
- Skill instructions do not require private assets or network-only behavior.

## 4. Demo And Knowledge

- Demo content is synthetic.
- No real logos, real customer decks, screenshots, or private brand assets are present.
- Gallery markdown identifies examples as fictional.
- Knowledge files do not encode confidential customer guidance.
- Local-only brand kits remain outside public paths, especially `knowledge/brand-kits/_local/`.

## 5. Accessibility And Quality

- Deck QA rubric includes contrast, density, hierarchy, and audience fit.
- HTML deck guidance includes responsive and keyboard-accessible behavior when applicable.
- PPTX guidance preserves editability rather than flattening slides into images.
- Image guidance includes forbidden elements and prompt confirmation rules.

## 6. Packaging

- Package script, if present, excludes private examples and local brand kits.
- `dist/` output is generated from source, not edited by hand.
- Generated packages include license and required notices.
- Release artifact contents are listed before upload.

## 7. Repository Hygiene

- `git status` is reviewed before release.
- No unrelated peer edits are reverted.
- No binary assets are added unless the release explicitly includes reviewed assets.
- Issue templates and PR template are current.
- Governance docs are linked from README.

## 8. Final Sign-Off

- Maintainer review complete.
- Security/data policy review complete.
- Changelog entry complete.
- Tag created from the intended commit.
- Release notes state whether this is a scaffold, beta, or production-ready release.
