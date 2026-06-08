---
name: tastecraft-image
description: "Use when 用户粘贴完整 slide 内容，需要转换为 Codex 图片 prompt；或提供 PPT 样图，需要学习风格、反解析审美优点并沉淀模板草案。"
---

# TasteCraft Image

## Purpose

Turn complete user-provided slide content into one confirmed Codex image prompt, then generate a PPT-ready image only after explicit confirmation. Default output is a single 16:9 finished-slide image, not a deck, HTML view, editable PPT slide, or overlay mockup.

## Core Principles

- **Structure before style / 结构先于风格**: identify the title, subtitle, content modules, required body text, key numbers, page purpose, density, and explicit constraints before choosing a template or visual direction.
- **Visuals serve the argument / 视觉服务论证**: every visual device must clarify the message, reading path, hierarchy, comparison, or emphasis. Do not add decoration only to make the image feel premium.
- **One explicit confirmation / 一次明确确认**: produce the recommended template and full prompt first, then generate only after the user gives action wording that clearly asks for image generation.

## Mode Selection

- `content-to-prompt`: use when the user provides slide content and wants a Codex image prompt or generated PPT-ready image.
- `style-learning` / `样图风格学习`: use when the user provides or references a PPT image and asks to learn the style, reverse-analyze it, explain why it works, or turn it into a reusable template draft.

Common `style-learning` triggers include "学习这张图的风格", "反解析这张 PPT 图", "从这个样例提炼模板", "总结这张图为什么好看", and "把这张图沉淀成模板".

## Load Before Work

- Load `assets/tastecraft-image/templates.json` from the repository root or packaged skill root.
- Load `assets/tastecraft-image/custom-templates.json` from the repository root or packaged skill root.
- When working inside this repo or a packaged copy, use `scripts/tastecraft_image_log.py` to record prompt and generation logs.
- If a required file is missing, report the missing dependency clearly and continue only with the available template context.

## Default Workflow

1. Read the user's complete pasted content before choosing a visual direction.
2. Identify the slide title, content type, content modules, must-preserve text, key numbers, density, aspect ratio, and any explicit constraints.
3. Decide whether the page is mainly for reading, explanation, comparison, roadshow persuasion, or research analysis before selecting a style.
4. Recommend one Chinese template and give a short reason tied to the page purpose, density, and content structure.
5. When useful, provide 1-2 alternative templates with brief tradeoffs.
6. Output these fixed sections in order:
   - `内容识别摘要`
   - `推荐模板`
   - `中文主 Prompt`
   - `English Variant`
   - `确认生图`
7. Record the draft with log type `draft_prompt` before image generation is requested. The JSONL event should preserve the generated prompt text so the user can inspect it later; do not log hidden reasoning.
8. Wait for explicit generation confirmation.
9. After confirmation, generate the image using the Chinese primary prompt by default unless the user explicitly chooses the English variant.
10. Record the generated result with log type `generated_image`, including the exact `imagegen_prompt` that was sent to the image model.
11. Review the generated image against the Image Review checklist before reporting completion.

If the actual image-generation prompt changes after confirmation, such as a retry prompt, shortened prompt, or reformatted prompt for tool stability, record that final prompt. The log must let the user recover the exact prompt that produced each image.

## Style-Learning Workflow

Style-learning is not image replication. It extracts transferable aesthetic principles, information architecture, color/material treatment, and template guidance. It must not produce a 1:1 reconstruction prompt, exact coordinate map, logo extraction, character likeness, or reference-specific copy instruction.

When using `style-learning`, output these fixed sections:

1. `审美分析`: main temperament, layout structure, color/material direction, typography and hierarchy, main visual strategy, and the 3-5 strengths worth learning.
2. `迁移判断`: suitable content types, unsuitable content types, reusable elements, elements that should not be hard-applied, and the boundary from 1:1 replication.
3. `模板草案`: a draft custom-template schema with direct Chinese naming, use cases, selection signals, art direction, composition, color rules, palette, avoid rules, density fit, and `status: draft`.
4. `测试建议`: the best first content type, suitable density, whether to use existing or synthetic test content, and visual risks to inspect after generation.

Template names generated from reference images must be direct, Chinese-first, and include a primary color or style cue. Avoid abstract names that ordinary users cannot understand.

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

Select templates by content type, density, seriousness, page purpose, industry relevance, and visual risk. Do not use fixed one-to-one mappings from industry keywords to visual objects. Concrete metaphors are allowed only when they naturally emerge from the user's content and the page objective.

Prefer templates that protect legibility and hierarchy over templates with impressive decoration. If an industry visual could add stereotype risk, unsupported claims, or visual noise, choose a more neutral composition.

Use spatial-depth templates when the page benefits from roadshow presence, client persuasion, or a premium advisory atmosphere. Use reading-first templates when the user provides dense body text, many numbers, terms, or conditions. Use balanced templates when both presentation polish and body-text fidelity matter.

## Prompt Requirements

Every image prompt must specify:

- Pure AI full-page finished presentation image.
- 16:9 PPT-ready slide by default, unless the user asks for another aspect ratio.
- No HTML, browser screenshot, PPT overlay, editable-object mockup, wireframe, UI chrome, template preview, or visible construction frame.
- Only the user-provided title, body text, numbers, and necessary labels should appear as readable text.
- Do not add conclusions, disclaimers, ratings, scores, source labels, citations, template names, internal instructions, or claims that the user did not provide.
- Keep the full body text by default; make it the main focus of the visual system.
- Decoration must serve the content, improve hierarchy, and never compete with or obscure the text.
- The prompt should state why the visual system exists, such as organizing clause hierarchy, preserving comparison logic, emphasizing key numbers, or guiding the reading path.

The Chinese primary prompt should be directly usable for Codex image generation and should include layout, typography, color, material, density handling, and abstract avoid principles.

Avoid rules should stay principle-level by default: prevent unsupported, off-topic, distracting, or content-competing visuals. Do not generate long concrete object blacklists unless the user explicitly provides forbidden elements or asks to prevent a specific failure from a previous image.

## English Variant

Provide an English variant that mirrors the generation instructions, composition, style, density handling, and abstract avoid principles. Keep the user's Chinese title and body text in Chinese. Do not translate the supplied slide content unless the user explicitly asks for translation.

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

## Style-Learning Save Rules

Only save a style-learning result when the user explicitly says to save it, such as "保存到模板", "保存这个模板", or "把这个样图学习结果保存下来". Weak approval such as "方向可以" or "挺好" is not enough to write project files.

When saving, append the machine-usable draft template to `assets/tastecraft-image/custom-templates.json` and append the analysis record to `docs/project-log/style-learning/YYYY-MM-DD-style-learning.jsonl`.

Do not save the source image. Do not save exact coordinates, copy-this-layout instructions, proprietary logos, identifiable brand elements, or descriptions that enable close replication of a copyrighted reference image.

## Logging

- Record every prompt as `draft_prompt`.
- Record every generated image as `generated_image` and include the exact `imagegen_prompt` used for that image.
- Record saved reference-image learning sessions as `style_learning` JSONL records under `docs/project-log/style-learning/`; these records preserve aesthetic analysis and template reasoning but never the source image itself.
- Use the daily TasteCraft Image JSONL ledger and daily TasteCraft Image Markdown summary under `docs/project-log/`.
- The JSONL ledger intentionally preserves the full generated prompt text, including the user-provided content embedded in that prompt, so it can be reviewed later.
- The Markdown summary should stay compact: title, status, template, image path, prompt-saved marker, feedback, or review summary rather than full prompt text.
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
