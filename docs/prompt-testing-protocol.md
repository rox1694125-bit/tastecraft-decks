# Prompt Testing Protocol

This protocol is for real-world testing of TasteCraft prompt templates for Codex-generated PPT images.

## Current Focus

V1 testing focuses on one workflow:

1. User provides one realistic slide brief.
2. TasteCraft turns it into prompts across the six style templates.
3. Codex generates PPT-ready images.
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
- Visual hierarchy: title, main point, and supporting information are clearly ordered.
- Template fidelity: color, mood, composition, and density match the selected style template.
- Scenario fit: the slide feels appropriate for the intended audience and use case.
- Reusability: the prompt lesson can improve future generations, not only this one image.

Images with failed text accuracy cannot be accepted as final candidates.

## Distillation Rule

After each test round, add a short note to the project log:

- What content was tested.
- Which templates worked best.
- Which prompts failed and why.
- What wording should be changed in the template.
- Whether the finding affects all templates or only one template.

Commit and push after each completed test round.
