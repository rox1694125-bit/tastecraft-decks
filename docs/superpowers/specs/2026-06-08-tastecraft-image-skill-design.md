# TasteCraft Image Skill Design

Date: 2026-06-08

## Goal

Refocus TasteCraft Decks V1 into a Codex-first image prompt skill named `tastecraft-image`.

The skill helps a Codex user paste complete slide content, receive a recommended whole-slide image-generation prompt, confirm the prompt, and then generate a PowerPoint-ready image. It also supports lightweight custom template creation and prompt/image run logging.

## Product Boundary

The main user path is a Codex conversation, not the HTML console.

The skill does not become a deck generator, SaaS app, WYSIWYG editor, prompt marketplace, or full template management system. It produces one confirmed image prompt for one slide image by default, then calls image generation only after explicit user confirmation.

The existing HTML console remains available as a debugging and template-preview aid, but it is no longer the default user entry.

## Repository Positioning

V1 should have one public main entrypoint:

- `tastecraft-image`: the default Codex image prompt skill.

The existing skills remain in the repository as legacy or secondary workflows:

- `presentation-router`
- `editable-pptx`
- `html-deck`
- `image-enhanced-deck`

README, status docs, release notes, and default packaging should point ordinary users to `tastecraft-image`. Legacy skills may remain available through an explicit compatibility path, but they should not compete with the V1 main route.

## Default User Flow

1. The user provides complete source content in Codex and invokes `tastecraft-image`.
2. The skill identifies the content shape:
   - title;
   - content type;
   - core modules;
   - body content that must be preserved;
   - key numbers, limits, and conditions;
   - density and readability risk;
   - aspect ratio if explicitly supplied.
3. The skill recommends one template and gives a short reason.
4. The skill offers one or two optional alternative templates.
5. The skill returns:
   - content recognition summary;
   - recommended template and reason;
   - Chinese primary prompt;
   - English variant;
   - confirmation instruction.
6. The prompt is logged immediately as `draft_prompt`.
7. The skill calls image generation only after explicit user confirmation.
8. The generated image path and run details are logged as `generated_image`.
9. If the user gives feedback, the skill turns that feedback into a revised prompt or template improvement note.

## Confirmation Rules

The skill must not call image generation on vague positive feedback.

Explicit image-generation confirmation includes messages such as:

- "生成图片"
- "用这个 prompt 生图"
- "开始生成"
- "就用这个模板"
- "确认，生成图片"

Messages such as "方向不错" or "看起来可以" are treated as feedback or readiness to revise, not as image-generation confirmation.

## Aspect Ratio And Page Count

The default output is one 16:9 PowerPoint-ready whole-slide image.

If the user explicitly specifies another aspect ratio, the skill respects it.

If the source content appears to contain multiple pages, the skill should say that the content may be better split across multiple slides and ask whether to split it. It should not automatically create a multi-page prompt pack.

If the content is dense, the skill should still generate a single-page prompt by default, but it must warn about readability risk and suggest either continuing as one page or splitting into multiple pages.

## Prompt Output Format

The default reply format is fixed:

1. **内容识别摘要**
   - title;
   - content type;
   - core sections;
   - must-preserve text and numbers;
   - density/readability risk.
2. **推荐模板**
   - visible Chinese template name;
   - recommendation reason;
   - one or two alternatives.
3. **中文主 Prompt**
   - the recommended prompt for actual image generation.
4. **English Variant**
   - a parallel variant for cross-model use or debugging.
   - It must preserve user-provided Chinese body copy and must not translate it away.
5. **等待确认**
   - a short instruction telling the user how to confirm image generation.

The Chinese prompt is the primary generation path when the slide contains Chinese body text.

## Full-Content Policy

The skill must preserve user-provided body copy by default.

It must not summarize, shorten, delete information points, or keep only highlights unless the user explicitly requests compression, extraction, summary, or a concise version.

Raw source labels and wrappers, such as `【主标题】`, `副标：`, `Subtitle:`, parentheses, bullets, and numbering, are structure hints. The skill should preserve the content after those labels while avoiding visible raw wrappers in the generated image.

If the content is too dense for one image, the skill should reduce decoration, increase layout density, use multi-column or table-like structure, and warn about readability risk before suggesting page splitting. It must not silently delete body copy.

## Template System

Templates become a structured source of truth rather than being scattered across JS, Markdown prose, palette files, and tests.

Planned built-in template source: assets/tastecraft-image/templates.json.

Planned custom template source: assets/tastecraft-image/custom-templates.json.

These files are planned implementation paths. They do not exist yet in this design-only phase.

Each built-in template should include:

- `id`
- `name_zh`
- `name_en`
- `status`
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

## Built-In Templates

The first version keeps six built-in templates, but user-visible names use direct Chinese labels with color or material cues:

| User-visible name | Previous internal direction | Use case |
| --- | --- | --- |
| 暖棕编辑纸感 | Editorial Paper | Lighter business topics, editorial texture, paper-like refinement. |
| 蓝绿稳健汇报 | Market Slate | Default professional report and client/internal communication. |
| 海军蓝高端金融 | Sovereign Gold | Finance, insurance, asset management, and premium wealth topics. |
| 钢蓝结构蓝图 | Precision Blueprint | Mechanisms, processes, product structures, and system explanations. |
| 墨绿铜金演讲 | Ink Copper | Dark executive keynote and strong narrative pages. |
| 灰蓝研究分析 | Evidence Lab | Research, evidence breakdown, analytical reasoning, and careful comparison. |

The skill should show the Chinese name and use case to users. Internal IDs remain available for logs, tests, and compatibility but should not appear in the visible image prompt or default user-facing recommendation.

## Template Selection

Template selection combines explicit classification with model judgment.

Classification dimensions:

- content type;
- density level;
- seriousness level;
- page purpose;
- financial/insurance/tax/research/mechanism relevance;
- visual risk, such as decorative overload or text crowding.

The skill must not hard-code concrete object routes such as "insurance means shield", "Hong Kong means skyline", or "finance means ledger". Subject-relevant concrete metaphors are allowed only when they naturally come from the user content and page objective.

## Custom Template Flow

Users can describe a desired template in natural language. They do not need to fill a rigid field-by-field form.

The skill extracts or infers:

- template intent;
- applicable scenarios;
- visual personality;
- composition tendencies;
- color or material cues;
- avoid rules.

If the user description is incomplete, the skill may propose a tasteful first-pass completion. The completion must stay professional, visually coherent, and free of unrelated object hard-coding.

The skill should show a lightweight section named `我补齐的模板假设`, with three to five assumptions. It should not show full JSON unless the user asks.

When the user explicitly says to save the template, the skill saves it as a custom template. Real image testing is not a prerequisite for saving.

Custom template statuses:

- `draft`: saved but not tested or not confirmed by image feedback.
- `tested`: tested with at least one real content case and accepted by the user.
- `built_in_candidate`: the user explicitly wants it considered for public built-in promotion.

Custom templates are project assets and may be committed to git by default. After saving, the skill should warn that the template file is git-managed and should be checked for private information before commit or push.

## Logging

Prompt and image runs use two logs:

- docs/project-log/YYYY-MM-DD-tastecraft-image-runs.jsonl
- docs/project-log/YYYY-MM-DD-tastecraft-image.md

These are planned log paths for implementation. The JSONL file is the machine ledger. The Markdown file is the human-readable daily summary.

Every generated prompt is logged immediately as `draft_prompt`.

After image generation, the skill appends `generated_image` with:

- generated image path;
- prompt version;
- template ID and visible template name;
- aspect ratio;
- recommendation summary;
- user confirmation status;
- user feedback summary, when available;
- next revision direction, when available.

The log should save a recommendation summary, not hidden internal reasoning.

Useful recommendation summary fields:

- content type;
- density level;
- recommended template;
- alternative templates;
- readability risk;
- user confirmation state;
- generated image path;
- feedback summary.

## Image Review And Failure Handling

The skill uses a lightweight review checklist after image generation or when the user asks for a review:

1. Title and key body copy are complete and readable.
2. Numbers and limiting conditions are accurate.
3. No user-unprovided disclaimer, source, rating, template name, or internal instruction text appears.
4. Core information receives enough visual attention.
5. Decoration and metaphor support the content rather than distracting from it.

If generated output has garbled Chinese, missing body text, incorrect numbers, unrelated objects, fake disclaimers, visible template names, or excessive decoration, treat it as a generation failure or prompt-quality issue. The skill should propose a revised prompt direction and should not solve the problem by silently shortening the user content.

## Packaging And Release

Default packaging should prioritize `tastecraft-image`.

The existing legacy skills remain in source, but default release docs and default package output should not present all skills as equal. A future compatibility option may include legacy skills explicitly.

Sensitive-file scanning should cover the new template and log areas, especially custom templates and tastecraft-image project logs.

## HTML Console Role

The HTML console remains as a development and debugging aid:

- preview prompt behavior;
- inspect template variants;
- stress-test dense content;
- compare generated prompts.

It is not the ordinary user's default path.

The console should eventually read from the same structured template source as `tastecraft-image` rather than owning a separate hard-coded template list.

## Testing Plan

Required tests for implementation:

- skill metadata validates;
- built-in template JSON validates;
- custom template JSON validates;
- prompt output includes Chinese primary prompt and English variant;
- prompt preserves full Chinese body copy by default;
- template names and IDs do not appear as visible image text instructions;
- keyword topics do not trigger fixed concrete object lists;
- dense content emits readability risk without deleting body text;
- prompt creation writes a `draft_prompt` log record;
- image confirmation path appends a `generated_image` log record;
- default packaging plans or builds `tastecraft-image` as the main package;
- legacy skills are not presented as the default V1 entry.

## Non-Goals For First Implementation

- No template marketplace.
- No automatic scoring system.
- No multi-page deck generator.
- No database or browser localStorage for prompt history.
- No full visual UI rebuild.
- No deletion of legacy skills in the first implementation.
- No automatic image generation before explicit confirmation.

## Open Decisions Resolved In Brainstorming

- New main skill name: `tastecraft-image`.
- Default flow: prompt first, image generation only after explicit confirmation.
- Main path: Codex conversation, not HTML console.
- Custom templates: natural-language description, AI extracts and fills assumptions.
- Custom templates: explicit user save is enough; real testing is not required before saving.
- Custom templates: saved as git-managed project assets by default.
- Template source: structured JSON source of truth.
- Built-in templates: keep six, with direct Chinese names that include color or material cues.
- Prompt language: Chinese primary prompt plus English variant.
- Logging: JSONL ledger plus Markdown daily summary.
- Recommendation logs: save summary, not hidden reasoning.
- Aspect ratio: default 16:9, user can override.
- Dense content: warn and suggest split, do not silently shorten.
