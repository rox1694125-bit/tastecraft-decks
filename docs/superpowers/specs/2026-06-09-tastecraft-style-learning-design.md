# TasteCraft Style Learning Design

Date: 2026-06-09

## Goal

Add a `style-learning` mode to the existing `tastecraft-image` skill.

The mode lets a Codex user provide a strong PPT reference image, then asks the skill to learn the image's style, strengths, and reusable design decisions. The output is not a 1:1 replication prompt. It is an aesthetic analysis, transfer judgment, and draft template that can help the project accumulate taste over time.

## Product Boundary

This is part of `tastecraft-image`, not a separate skill in V1.

The first version supports one reference image at a time. It does not support multi-image clustering, automatic mature-template promotion, full template management UI, or exact reconstruction of a reference image.

The mode does not save the source image itself. It saves only analysis, transfer guidance, draft template data, user feedback, and test notes.

## User Intent

The user wants two connected capabilities:

- reverse-analyze existing high-quality PPT images so AI can learn style and design strengths;
- expand the template library until the skill develops better taste and can make each PPT image more visually compelling.

The first implementation should therefore treat reference images as learning material, not as assets to copy.

## Mode Selection

The same `tastecraft-image` skill supports two modes:

| Mode | Trigger | Output |
| --- | --- | --- |
| `content-to-prompt` | User provides slide content and wants an image prompt or generated image. | Recommended template, Chinese prompt, English variant, confirmation gate. |
| `style-learning` | User provides or references a PPT image and asks to learn, reverse-analyze, extract style, or create a template. | Aesthetic analysis, transfer judgment, template draft, test suggestion. |

Example `style-learning` trigger phrases:

- "学习这张图的风格"
- "反解析这张 PPT 图"
- "从这个样例提炼模板"
- "总结这张图为什么好看"
- "把这张图沉淀成模板"

If the user asks for 1:1 replication, the skill should redirect to style learning: extract transferable principles, not copy exact visual placement or proprietary details.

## Default Output Structure

`style-learning` always returns four sections.

### 1. 审美分析

Explain why the reference image works visually:

- main temperament;
- layout structure;
- color and material direction;
- typography and hierarchy;
- main visual strategy;
- three to five strengths worth learning.

The analysis should use plain design language. It should not overfit to exact coordinates, pixel positions, brand marks, or one-off content.

### 2. 迁移判断

Explain how the style can and cannot transfer:

- suitable content types;
- unsuitable content types;
- reusable elements;
- elements that should not be hard-applied;
- boundary from 1:1 replication.

The skill should distinguish between a reusable style principle and a reference-specific artifact. For example, "low-contrast spatial depth behind a high-density text grid" is transferable; a specific logo, photographed person, or exact diagram arrangement is not.

### 3. 模板草案

Produce a draft template in the same conceptual schema as `assets/tastecraft-image/custom-templates.json`:

- `name_zh`
- `name_en`
- `use_case_zh`
- `use_case_en`
- `selection_signals`
- `art_direction_zh`
- `art_direction_en`
- `composition_zh`
- `composition_en`
- `color_rules_zh`
- `color_rules_en`
- `palette`
- `avoid`
- `default_density_fit`
- `status: draft`

The user-facing template name should be direct, Chinese-first, and include a primary color or style cue.

Good naming shape:

- `深蓝金｜高端金融简报`
- `米白绿｜私人财富路演`
- `灰蓝｜研究分析页`
- `黑金｜强叙事演讲`

Avoid abstract names that ordinary users cannot understand, such as vague archive, lab, mythic, or internal codename-style labels.

### 4. 测试建议

Recommend how to test the draft:

- best content type for the first test;
- suitable density level;
- whether to test with existing user content or a synthetic sample;
- what visual risks to inspect after generation.

The mode may ask whether the user wants to test the template with actual slide content, but it must not generate an image unless the user explicitly confirms image generation through the existing confirmation rules.

## Save Flow

Saving requires explicit user intent, such as:

- "保存到模板"
- "保存这个模板"
- "把这个样图学习结果保存下来"

Weak approval such as "方向可以" or "挺好" is not enough to write project files.

When saving, write two records:

1. A machine-usable template draft in `assets/tastecraft-image/custom-templates.json`.
2. A style-learning record in `docs/project-log/style-learning/YYYY-MM-DD-style-learning.jsonl`.

The style-learning record keeps the reasoning and traceability that should not live inside the template library itself.

## Style-Learning Record Schema

Each saved record should include:

```json
{
  "status": "style_learning",
  "source_type": "single_reference_image",
  "source_note": "user-provided reference image, image not saved",
  "template_id": "",
  "template_name_zh": "",
  "aesthetic_analysis": {},
  "transfer_guidance": {},
  "template_draft": {},
  "test_suggestion": {},
  "user_feedback": "",
  "maturity": "draft",
  "merge_group": null,
  "created_at": ""
}
```

`merge_group` is reserved for future multi-image learning. The first version always writes `null`.

`maturity` starts as `draft`. Future versions may introduce `tested`, `candidate`, or `mature`, but this design does not require implementing promotion logic.

## Privacy, Copyright, And Brand Boundaries

The skill saves style analysis, not source images.

It should not save:

- source image files;
- exact coordinate maps;
- copy-this-layout instructions;
- proprietary logos or brand-identifying visual elements;
- descriptions that enable close replication of a copyrighted reference image.

If the reference includes a visible brand, person, product, or copyrighted illustration, the skill can only extract abstract design principles such as hierarchy, spacing, palette mood, material treatment, density control, and visual argument strategy.

## Relationship To Template Expansion

This mode is the template library flywheel:

```text
Excellent reference image
→ style-learning analysis
→ draft template
→ real content test
→ user feedback
→ saved template
→ better future template selection
```

The first version does not add many templates at once. It creates a disciplined way to learn from high-quality examples so later template expansion is grounded in observed visual strengths.

## Tests And Validation

Implementation should add focused validation for:

- `tastecraft-image` skill text mentions `style-learning` and the no-1:1-replication boundary;
- style-learning records require `source_type`, `template_id`, `aesthetic_analysis`, `transfer_guidance`, `template_draft`, `maturity`, and `merge_group`;
- saved template drafts still pass the existing template validator;
- generated logs do not require or store source image files;
- weak approval does not trigger save or image generation.

Manual validation should use one reference image and confirm that the output:

- explains why the image is good;
- extracts transferable visual principles;
- says what should not be copied;
- creates a usable draft template name and schema;
- recommends a reasonable first test.

## Non-Goals

- Do not build a browser or HTML template-learning workbench in this slice.
- Do not add multi-image merge flow.
- Do not automatically promote draft templates to built-ins.
- Do not generate 1:1 reference-image clones.
- Do not store the reference image itself.
- Do not replace the existing content-to-prompt workflow.

## Open Implementation Notes

The likely implementation touches:

- `skills/tastecraft-image/SKILL.md` for mode rules and output structure;
- a new or extended logging helper for `style_learning` records;
- tests for the style-learning schema and skill documentation;
- possibly `assets/tastecraft-image/custom-templates.json` only when a real user-approved template is saved.

The implementation plan should keep this as one narrow slice: define mode behavior and logging first, then test on one reference image before expanding template operations.
