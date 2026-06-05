# Security And Disclosure

TasteCraft Decks is a local-first documentation and skill repository. The main risks are not server compromise, but accidental leakage of private decks, real brand assets, customer data, or misleading public examples.

## Supported Versions

The project has not yet published a stable release. Until a tagged release exists, treat `main` as pre-release work.

## What To Report

Report issues involving:

- private data or customer material committed to the repository;
- real logos or brand assets in public demo paths;
- generated assets that imitate a real protected brand;
- scripts that package restricted files;
- schema or skill behavior that could expose private material by default;
- misleading documentation that instructs users to bypass rights, attribution, or permissions.

## What Not To Report As Security

Use normal issues for:

- typos;
- incomplete roadmap items;
- aesthetic preferences;
- requests for new output formats;
- synthetic demo improvements.

## Disclosure Process

1. Open a minimal issue or private maintainer message.
2. Include affected paths and a short description.
3. Do not paste secrets or private customer data into public issues.
4. Maintainers should remove or quarantine exposed material before discussing details publicly.
5. Add a changelog or postmortem note if the issue affected a release.

