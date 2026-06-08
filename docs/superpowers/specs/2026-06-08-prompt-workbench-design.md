# Prompt Workbench Design

Date: 2026-06-08

## Goal

Design a simple HTML-first workflow for ordinary content users who want to turn pasted Chinese slide content into image-generation prompts for Codex.

The first version is a prompt workbench, not an image-generation app. It helps the user preview, understand, edit, and copy prompts before they use Codex's image capability in the Codex conversation.

## Target User

Primary user: an ordinary content user.

They usually have a block of source material, such as a title, product copy, report notes, or a complete slide draft. They do not want to understand deck schema, page maps, QA gates, prompt-pack internals, or visual-system controls.

## Non-Goals

- Do not call an image model directly from the HTML page.
- Do not require an API key, backend server, or external account.
- Do not expose the current seven-panel professional console as the default first-run experience.
- Do not ask the user to fill a large structured form before pasting content.
- Do not make page-map planning, prompt-pack QA, or deck JSON export part of the default flow.

## Chosen Flow

Use a single-page, three-stage workflow.

### Stage 1: Paste Content

The first screen shows one large text area and one primary action.

Primary text area:

- Label: `粘贴完整内容`
- Helper text: `粘贴你的标题、正文、要点或完整文案。`
- Input: free-form source content

Primary action:

- `生成 Codex 拆解请求`

Secondary actions should be visually quiet:

- `加载示例`
- `清空`

No visual templates, page-map controls, QA status, or export buttons appear in the first viewport.

### Stage 2: Ask Codex To Structure The Content

The page generates a copyable Codex request prompt. The user copies this request into Codex.

The request asks Codex to return structured content for the workbench, including:

- title
- subtitle
- audience or scenario if inferable
- core modules or sections
- body copy that must be preserved
- key numbers and claims
- forbidden visual elements inferred from user intent only when explicit
- style intent if the user provided one
- notes about density or readability risk

The HTML page does not pretend this step is automatic. It should show clear instructions:

1. Copy the request.
2. Send it to Codex.
3. Paste Codex's structured result back here.

Input for Codex result:

- Label: `粘贴 Codex 返回的结构化结果`
- Accept JSON first, but allow a readable Markdown fallback for early use.

### Stage 3: Review And Copy Image Prompt

After the user pastes the structured result, the page shows a small editable review form.

Default visible fields:

- `标题`
- `副标题`
- `核心内容模块`
- `必须完整保留`
- `禁止出现`
- `风格倾向`

These fields are editable because the user may need to correct Codex's interpretation before generating the final image prompt.

The default output area shows one recommended image prompt.

Primary action:

- `复制推荐 Prompt 到 Codex 生图`

Secondary expandable area:

- `展开查看 6 个风格版本`

The six style prompts use the existing palette/template system, but they are hidden by default. Each style card should show only:

- style name
- one-sentence use case
- copy button

Do not show full internal metadata unless the user expands a prompt.

## Information Architecture

The first version should be a new simplified entry experience rather than a small tweak to the current professional console.

Recommended page hierarchy:

1. Simple header: product name and one-line purpose.
2. Stage indicator: `1 粘贴内容` / `2 交给 Codex 拆解` / `3 确认 Prompt`
3. Active stage body.
4. Result area.
5. Quiet footer link: `高级控制台`

The current seven-panel console can remain available behind the advanced link, but it should not be the default view for ordinary users.

## Data Model

The simple workbench can map into existing state rather than replacing it.

Suggested intermediate shape:

```json
{
  "raw_content": "",
  "structured_content": {
    "title": "",
    "subtitle": "",
    "audience": "",
    "scenario": "",
    "sections": [
      {
        "heading": "",
        "body": ""
      }
    ],
    "must_preserve": [],
    "forbidden_elements": [],
    "style_intent": "",
    "density_notes": ""
  },
  "recommended_template_id": "market-slate",
  "expanded_templates": false
}
```

Mapping to existing console state:

- `structured_content.title` maps to the selected page title.
- `structured_content.sections` and `must_preserve` map to page content notes.
- `audience`, `scenario`, and `style_intent` map to brief and visual direction fields.
- `forbidden_elements` maps to imagery forbidden elements.
- `recommended_template_id` maps to the palette preset used for the default prompt.

## Prompt Behavior

The workbench must preserve the recent prompt-template decisions:

- User-provided body copy is full-content by default.
- Do not summarize, shorten, or delete body copy unless the user explicitly asks.
- Raw labels such as `【主标题】`, `副标：`, parentheses, and bullets are structure hints, not visible text.
- Template names and IDs stay out of the generated image prompt body.
- Concrete visual metaphors are allowed only when they naturally come from user content and page objective.
- Do not inject fixed object lists based on keywords such as insurance, Hong Kong, finance, or AI.

## Error Handling

Empty input:

- Disable `生成 Codex 拆解请求`.
- Show one inline hint: `先粘贴一段内容。`

Very long input:

- Allow it.
- Show a density warning only after the request is generated: `内容较长，后续会优先调整版式密度，而不是删除正文。`

Codex result is not valid JSON:

- Accept Markdown fallback.
- Show a small warning: `未识别为 JSON，可以继续手动整理字段。`

Missing title:

- Use the first meaningful line as a provisional title.
- Mark the title field as needing review.

No style intent:

- Default to the safe professional template.
- Let the user expand six styles later.

## Testing Plan

Unit tests:

- The simple workbench can generate a Codex structuring request from raw content.
- The recommended prompt preserves full-content policy.
- Insurance, Hong Kong, finance, and AI keywords do not trigger fixed object lists.
- Six style variants remain available behind the expanded section.

Browser smoke tests:

- Paste content, generate structuring request, copy request.
- Paste valid structured JSON, review fields, generate recommended prompt.
- Expand six styles and copy one style prompt.
- Verify the first viewport remains simple and does not expose the professional seven-panel console by default.

Manual review:

- Use the Sun Life dense insurance copy as a stress test.
- Confirm the user sees one main action at each stage.
- Confirm advanced controls are discoverable but not visually dominant.

## Implementation Notes

The implementation should keep the change narrow:

- Add a simple-mode entry to the existing static HTML.
- Reuse current prompt-generation functions where possible.
- Keep the existing professional console available for later advanced workflows.
- Avoid adding frameworks, build tooling, API calls, or backend services.

The first implementation should focus on the ordinary-user prompt workflow only. Advanced page maps, full deck export, and image-result tracking can be layered later.
