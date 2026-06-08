# Prompt Testing Protocol

This protocol is for real-world testing of TasteCraft prompt templates for Codex-generated PPT images.

## Current Focus

V1 testing focuses on one workflow:

1. User provides one realistic slide brief.
2. TasteCraft turns it into pure AI whole-slide prompts across the six style templates.
3. Codex generates PPT-ready finished-page images.
4. User reviews the images against real presentation standards.
5. Feedback is distilled into reusable prompt template improvements.

Do not start with a full deck. Start with single-slide comparison, then expand to a three-slide mini deck after the best templates are identified.

## Single-Slide Comparison

Use one slide brief and generate candidates across all six templates:

- `citrus-editorial`
- `market-slate`
- `atelier-rose`
- `harbor-mint`
- `ink-copper`
- `orchard-lab`

Default output:

- Aspect ratio: `16:9`
- Candidate count: one image per template at first
- Max regenerations: three candidates per page/template before the prompt must be revised
- Text policy: generated image may contain full slide text; any key typo, missing text, garbled text, or wrong meaning is a failure
- Content policy: if the user provides full content, test prompts must carry the full content by default; do not summarize or shorten unless the user explicitly asks for summary, extraction, or compression
- Generation path: pure AI finished-page image. Do not default to AI background plus HTML/PPT overlay.

## User Brief Format

Ask the user for:

```text
Slide type:
Scenario:
Audience:
Title:
Body text:
Required visual idea:
Preferred mood:
Must include:
Must avoid:
Aspect ratio:
```

If the user does not provide all fields, use `16:9`, Chinese language, and a business presentation tone by default.

## Scenario Differences

- Investor roadshow: prove growth logic, market credibility, and differentiation. Visuals should feel premium and confident, with moderate information density.
- Internal report: clarify progress, problems, and next actions. Visuals should be structured, readable, and practical rather than cinematic.
- Keynote or launch: create a strong first impression. Visuals should be bold, low-density, and emotionally direct.
- Board review: support decisions and risk control. Visuals should be restrained, evidence-oriented, and avoid decorative drama.
- Product demo: show product value in context. Visuals should make workflow, user, and benefit obvious.
- Technical brief: explain systems or mechanisms precisely. Visuals should prioritize hierarchy, diagrams, and legibility.
- Training: help learners follow and remember. Visuals should be friendly, repeatable, and low-friction.

## Feedback Format

Record user feedback in this format:

```text
Image ID:
Usability: ready / minor revision / reject
Text accuracy:
Visual taste:
PPT fit:
Main problems:
Next prompt change:
```

## Evaluation Rubric

Use the same rubric for every candidate:

- Text accuracy: all required text is correct and readable.
- Slide fit: the image looks like a PPT page, not a poster, web hero, or generic ad.
- Visual ambition: the result should justify using an image model. Reject outputs that are only plain cards, basic charts, or layouts that could be made faster in HTML or a normal PPT editor.
- Visual hierarchy: title, main point, and supporting information are clearly ordered.
- Template fidelity: color, mood, composition, and density match the selected style template.
- Scenario fit: the slide feels appropriate for the intended audience and use case.
- Reusability: the prompt lesson can improve future generations, not only this one image.

Images with failed text accuracy cannot be accepted as final candidates.

## Prompt Quality Lessons

The first tax-comparison test showed that narrow prompts such as "two panels plus donut charts" produce correct but visually ordinary outputs. Future prompts should not treat a style template as only a color palette.

Each prompt should include:

- role and intent: a senior business visual designer creating a high-end one-page presentation image;
- output specification: 4K target when the generation path supports it, aspect ratio, and presentation use;
- hard rules: pure AI whole-slide finished image, no HTML/PPT overlay, visible text comes from user-provided content only, no template names or internal instructions as slide copy;
- visual requirements: clear information structure first, then material depth, background linework, or light decoration;
- information architecture: what to emphasize, how to organize supporting evidence, and which information groups are primary;
- content fidelity: full user-provided body copy remains in the prompt and should be placed in the image unless the user explicitly asks for compression;
- layout grammar: modular grid, invisible alignment, whitespace rhythm, dense/sparse alternation;
- color usage rules: which colors apply to titles, key figures, cards, dividers, charts, and highlights, plus a visual proportion such as 70-80% background/whitespace, 15-20% structure, and no more than 5% accent;
- visual assets: material texture, subtle linework, spatial depth, refined background graphics, or subject-relevant metaphors when useful;
- typography rules: hierarchy, consistent levels, and high-contrast text;
- negative constraints: keep the list short and focused on failure types such as garbled text, warped typography, invented numbers, fake logos, watermarks, input labels as visible text, visible template names, low-resolution details, stock infographic style, cheap template look, and mechanical side-by-side boxes.

June 8 user-review additions:

- Do not use a global hard-coded object-ban list for fruit, flowers, plants, leaves, or food still life. If a future template needs object-specific bans, keep them local to that template decision rather than the global negative prompt.
- Do not let decorative style compress the core message. The core information body should occupy 60-70% of visual attention; only comparison pages should specify that the data comparison itself occupies 60-70%.
- Do not add user-unprovided conclusions, disclaimers, ratings, sources, template names, or internal instruction text.
- If the slide uses donut charts, ring charts, circular nodes, or comparison circles, they must remain visually circular rather than flattened by perspective.
- Similar templates should be repositioned rather than kept as near-duplicates; each template needs a distinct use case and visual grammar.
- Palette prompts should specify mature color relationships, not only color names, especially for dark executive pages.
- Do not summarize or shorten user-provided slide content by default. If content is dense, adjust layout density and reduce decoration before deleting body copy; test the real dense-layout behavior using multi-column, sectioned, table-like, reading-first, or appendix-style composition.
- Raw input labels such as `【主标题】`, `副标：`, `Subtitle:`, bullets, numbering, and wrapper parentheses are structure hints. The generated image should preserve the content after them, but not render those labels or wrapper marks as visible copy unless explicitly requested.
- Template names, IDs, and signatures are metadata and should not be sent in the image-generation prompt body. They should not appear as visible copy.
- Subject-relevant concrete metaphors are acceptable and can improve the result, but prompt templates should not inject fixed object lists based on keywords such as insurance, Hong Kong, finance, or AI.
- For `market-slate`, generic world maps or stock-line decorations are failures unless the topic itself calls for them. The prompt should state the relevance rule generically rather than listing subject-specific cue examples.
- For `ink-copper`, avoid pure black stage backgrounds. Use the mineral copper palette so the dark variant has more practical use cases.

## Fixed Smoke Briefs

Use these four brief types after prompt-template changes to reduce overfitting to a single insurance or finance example:

- No-copy style test: minimal or no body copy, used to check whether the six style templates remain visually distinct.
- Short sales page: title, subtitle, four selling points, and key numbers, used to test commercial product-page structure.
- Long Chinese full-copy page: dense Chinese body copy similar to the Starlight Mutual insurance test, used to test default full-content rendering.
- Non-financial topic page: AI training workflow, restaurant brand strategy, or enterprise process review, used to test whether the templates were overfit to insurance / finance.

## Route Decision: Pure AI First

The June 8 tax-comparison test compared:

- pure AI whole-slide image;
- deterministic HTML/CSS composition;
- AI-generated background/visual system plus deterministic HTML text and chart overlay.

The current project decision is that pure AI whole-slide output is the correct V1 path. The overlay route preserved exact text and 4K export size, but the result still felt like foreground cards placed on top of a background and did not deliver the image-model-native visual ceiling the project is trying to unlock.

Use hybrid overlay only as:

- a benchmark for exactness;
- a documented rejected path in testing notes;
- an emergency fallback when exact text/data matters more than visual ambition.

Do not make hybrid overlay the default prompt-testing workflow.

## Distillation Rule

After each test round, add a short note to the project log:

- What content was tested.
- Which templates worked best.
- Which prompts failed and why.
- What wording should be changed in the template.
- Whether the finding affects all templates or only one template.

Commit and push after each completed test round.
