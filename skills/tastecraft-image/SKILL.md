---
name: tastecraft-image
description: "Use when 用户粘贴完整 slide 内容，需要将其转换为 Codex 图片 prompt，经明确确认后生成 PPT-ready 的 16:9 finished-slide 图片。"
---

# TasteCraft Image

## Purpose

Turn complete user-provided slide content into one confirmed Codex image prompt, then generate a PPT-ready image only after explicit confirmation. Default output is a single 16:9 finished-slide image, not a deck, HTML view, editable PPT slide, or overlay mockup.

## Load Before Work

- Load `assets/tastecraft-image/templates.json` from the repository root or packaged skill root.
- Load `assets/tastecraft-image/custom-templates.json` from the repository root or packaged skill root.
- When working inside this repo or a packaged copy, use `scripts/tastecraft_image_log.py` to record prompt and generation logs.
- If a required file is missing, report the missing dependency clearly and continue only with the available template context.

## Default Workflow

1. Read the user's complete pasted content before choosing a visual direction.
2. Identify the slide title, content type, content modules, must-preserve text, key numbers, density, aspect ratio, and any explicit constraints.
3. Recommend one Chinese template and give a short reason tied to the page purpose and content structure.
4. When useful, provide 1-2 alternative templates with brief tradeoffs.
5. Output these fixed sections in order:
   - `内容识别摘要`
   - `推荐模板`
   - `中文主 Prompt`
   - `English Variant`
   - `确认生图`
6. Record the draft with log type `draft_prompt` before image generation is requested. The JSONL event should preserve the generated prompt text so the user can inspect it later; do not log hidden reasoning.
7. Wait for explicit generation confirmation.
8. After confirmation, generate the image using the Chinese primary prompt by default unless the user explicitly chooses the English variant.
9. Record the generated result with log type `generated_image`.
10. Review the generated image against the Image Review checklist before reporting completion.

## Confirmation Rules

Only action wording can trigger image generation, such as:

- "生成图片"
- "用这个 prompt 生图"
- "开始生成"
- "就用这个模板"
- "确认，生成图片"

Do not treat weak approval or direction feedback as permission to generate. Phrases such as "方向不错", "可以", "看起来不错", "挺好", or "先这样" mean the prompt direction is acceptable, but they are not explicit generation confirmation.

## Full-Content Policy

- Preserve the user's body text by default. Do not summarize, delete, compress, merge, or rewrite substantive content unless the user explicitly asks for compression, refinement, summary, or simplification.
- Treat markers such as `【主标题】`, subtitles, `Subtitle`, parentheses, bullets, numbering, and section labels as structure hints. Do not ask the image model to render wrapper symbols literally unless the user explicitly wants them displayed.
- If the content is dense, first warn about readability risk and suggest splitting into pages, but still provide a single-page prompt when requested.
- For dense single-page prompts, reduce decoration, use tighter information architecture, and give the body text the main visual attention.
- Preserve key numbers, names, constraints, comparisons, and ordered logic exactly as supplied.

## Template Selection

Select templates by content type, density, seriousness, page purpose, industry relevance, and visual risk. Do not use fixed object routing such as "insurance equals shield", "Hong Kong equals skyline", or "finance equals ledger". Concrete metaphors are allowed only when they naturally emerge from the user's content and the page objective.

Prefer templates that protect legibility and hierarchy over templates with impressive decoration. If an industry visual could add stereotype risk, unsupported claims, or visual noise, choose a more neutral composition.

## Prompt Requirements

Every image prompt must specify:

- Pure AI full-page finished presentation image.
- 16:9 PPT-ready slide by default, unless the user asks for another aspect ratio.
- No HTML, browser screenshot, PPT overlay, editable-object mockup, wireframe, UI chrome, template preview, or visible construction frame.
- Only the user-provided title, body text, numbers, and necessary labels should appear as readable text.
- Do not add conclusions, disclaimers, ratings, scores, source labels, citations, template names, internal instructions, or claims that the user did not provide.
- Keep the full body text by default; make it the main focus of the visual system.
- Decoration must serve the content, improve hierarchy, and never compete with or obscure the text.

The Chinese primary prompt should be directly usable for Codex image generation and should include layout, typography, color, material, density handling, and avoid rules.

## English Variant

Provide an English variant that mirrors the generation instructions, composition, style, density handling, and avoid rules. Keep the user's Chinese title and body text in Chinese. Do not translate the supplied slide content unless the user explicitly asks for translation.

## Custom Templates

When the user describes a new template in natural language:

1. Extract intent, usage scenario, visual temperament, composition, color and material direction, and avoid rules.
2. If information is missing, complete one version with tasteful assumptions.
3. Show `我补齐的模板假设` with 3-5 concise assumptions.
4. Generate a test prompt using the proposed custom template.
5. Append to `assets/tastecraft-image/custom-templates.json` only after the user explicitly says to save the template.
6. Save new custom templates with `status: draft`.
7. After saving, remind the user that the custom template JSON file is git-managed and should be checked for private information before commit or push.

A real image test is not a prerequisite for saving a custom template.

## Logging

- Record every prompt as `draft_prompt`.
- Record every generated image as `generated_image`.
- Use the daily TasteCraft Image JSONL ledger and daily TasteCraft Image Markdown summary under `docs/project-log/`.
- The JSONL ledger intentionally preserves the full generated prompt text, including the user-provided content embedded in that prompt, so it can be reviewed later.
- The Markdown summary should stay compact: title, status, template, image path, feedback, or review summary rather than full prompt text.
- Log recommendation summary, selected template, alternatives, aspect ratio, prompt language, confirmation phrase, generated image reference, and review result when available.
- Because logs are git-managed project files, check for private or customer-identifying information before commit or push.
- Do not log hidden reasoning, private chain-of-thought, or unrelated conversation details.

## Image Review

After generation, check:

- Title, body text, numbers, and constraints are complete and accurate.
- No unprovided disclaimer, source, rating, score, template name, or internal instruction is visible.
- Core information occupies enough visual attention.
- Decoration supports readability and does not interfere with content.
- The image reads as a finished presentation slide, not a UI, screenshot, HTML page, PPT editor view, or template demo.

Treat any of the following as failure or prompt-quality problems: garbled text, missing body text, wrong numbers, unrelated objects, fake disclaimer, visible template name, excessive decoration, or visual elements that crowd out the content.
