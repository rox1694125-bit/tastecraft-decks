---
name: presentation-router
description: Route TasteCraft Decks requests to the correct execution skill. Use when a user provides a presentation brief, a tastecraft.deck.json export, or asks which deck workflow should produce an editable PPTX, browser-native HTML deck, or image-enhanced deck.
---

# Presentation Router

## Purpose

Turn an open-ended deck request or exported TasteCraft spec into a clear execution path. The router does not create the final deck unless the user explicitly asks for routing plus execution in one turn.

## Inputs

- User brief, notes, outline, existing slides, or `tastecraft.deck.json`.
- Required contract: `../../schema/tastecraft.deck.schema.json`.
- Image workflow contract, when prompts are involved: `../../schema/prompt-pack.schema.json`.
- Shared project guidance: load only the relevant files under `../../references/` as needed, especially routing, visual rules, and QA guidance when present.

## Routing Rules

1. If the user asks for PowerPoint, .pptx, investor deck, board deck, editable slides, or Office handoff, route to `$editable-pptx`.
2. If the user asks for a web presentation, local browser preview, interactive deck, scroll/keyboard navigation, or HTML/CSS output, route to `$html-deck`.
3. If the user asks for AI-generated visuals, image prompt packs, cover art, visual contact sheets, or image-rich PPTX delivery, route to `$image-enhanced-deck`.
4. If `output.target_format` is set, honor it unless it conflicts with the user's latest instruction.
5. If `output.target_format` is `auto`, choose the smallest workflow that satisfies the delivery need.

## Workflow

1. Normalize the request into a TasteCraft deck spec shape: project, brief, output, theme, pages, and QA.
2. Check obvious schema risks before routing: missing audience, goal, slide count, target format, aspect ratio, or page list.
3. Choose exactly one primary execution skill. Mention secondary skills only when they are genuinely needed, such as image prompts feeding an editable PPTX.
4. Return a concise routing decision with the selected skill, the reason, and any missing inputs that block execution.
5. When asked to continue, pass the normalized spec and unresolved assumptions to the selected skill.

## Guardrails

- Keep V1 scoped to presentations: no SaaS, WYSIWYG editor, cloud sync, or Word report workflow.
- Do not invent private brand assets. Use placeholders unless the user provides approved assets.
- Preserve inspectability: prefer structured spec fields over prose-only decisions.
