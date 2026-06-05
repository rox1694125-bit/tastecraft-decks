# Prompt Recipes

Use prompt recipes for image-enhanced deck work and single-page visual experiments. A prompt pack may include only confirmed prompts.

## Prompt Pack Rules

- Every generated image prompt must map to one `page_id`.
- `page_type` must be one of: `cover`, `agenda`, `chapter`, `content`, `data`, `visual`, `closing`.
- Keep factual claims, private names, private logos, and regulated product claims out of image prompts unless the user provides approved source material.
- Every prompt needs a positive prompt, negative prompt, reference notes, generation parameters, and confirmation status.
- Do not export speculative prompts. Use `status=needs_prompt` in the deck spec until confirmed.

## Global Prompt Template

```text
Create a presentation-ready image for a TasteCraft deck.
Page purpose: {page_objective}
Audience and scenario: {audience}, {scenario}
Composition: {composition}
Subject matter: {subject}
Style direction: {style_direction}
Palette alignment: use {palette_id}; emphasize {primary_color}, {secondary_color}, and {accent_color} without reducing readability
Brand constraints: {brand_constraints}
Output use: {cover background | section divider | content illustration | visual evidence | closing image}
Aspect ratio: {aspect_ratio}
Lighting and finish: {lighting_finish}
Leave negative space for text: {text_safe_area}
Avoid: {forbidden_elements}
```

## Negative Prompt Template

```text
Avoid illegible text, fake logos, distorted UI, extra fingers, warped faces, stock-photo cliches, low-resolution details, busy backgrounds, watermarks, copyrighted characters, unapproved brand marks, misleading charts, medical/legal/financial claims, and any forbidden element listed in the deck brief.
```

## Page-Type Recipes

### Cover Image

Use when the cover needs a strong first-viewport visual.

```text
Create a polished editorial cover image for "{deck_title}".
Show {subject_or_scene} with a clear focal point and premium presentation lighting.
Reserve clean negative space on the {safe_area} for title and subtitle.
Use a {camera_or_render_style} style, refined textures, and restrained depth.
Palette: {palette_id}; background mood {background_mood}; accent hints {accent_color}.
No text, no logos, no labels, no fake interface elements.
```

### Chapter Divider

```text
Create a minimal section-divider image for chapter "{chapter_title}".
Use an abstract but subject-relevant scene: {scene_metaphor}.
Composition should be calm, spacious, and directional, guiding the eye toward {title_area}.
Palette: {palette_id}; keep contrast high enough for overlaid heading text.
No readable text, no symbols that imply false certification, no logos.
```

### Content Illustration

```text
Create a clean explanatory illustration for the idea: {takeaway}.
Represent {core_entities} in a clear spatial relationship: {relationship}.
Style: {style_direction}; presentation-grade, not cartoonish unless requested.
Use simple forms, limited detail, and space for labels around the image.
No embedded text, no UI hallucinations, no brand marks.
```

### Data Background Or Motif

```text
Create a subtle analytical background motif for a data slide about {data_topic}.
Use abstract lines, grids, or material details that support the subject without looking like a real chart.
Keep the center and chart area low contrast and uncluttered.
Palette: {palette_id}; muted background, one accent glow or marker only.
No numbers, no axes, no fake charts, no text.
```

### Product Or Service Visual

```text
Create a presentation visual showing {product_or_service} in use by {user_type}.
Show real workflow context: {context}.
Keep interfaces generic unless approved screenshots are supplied.
Use realistic proportions, clear hierarchy, and professional lighting.
Leave space for callout labels on {label_area}.
No private logos, no fake customer data, no unreadable screen text.
```

### Closing Image

```text
Create a decisive closing image for a deck ending with: {final_ask}.
Mood: confident, resolved, forward-looking.
Composition: one strong focal point with open space for the final message.
Palette: {palette_id}; use accent color sparingly.
No text, no logos, no celebratory cliches unless requested.
```

## Prompt Confirmation Checklist

Before adding a prompt to `prompt-pack.json`, confirm:

- Page ID and page type are correct.
- Prompt purpose matches the page objective.
- Text-safe area is explicit.
- Palette ID is named.
- Brand constraints and forbidden elements are included.
- Negative prompt blocks fake logos, text artifacts, and misleading charts.
- Aspect ratio matches the deck.
- User or workflow has confirmed the prompt.

## Failure Handling

- If generated output contains text artifacts, regenerate with stronger "no text, no labels, no watermark" language.
- If composition leaves no title space, regenerate with a named safe area.
- If the image invents data, charts, certifications, or logos, discard it.
- If the image style conflicts with the deck, adjust prompt style direction before changing the entire deck theme.
- If image generation is unavailable, replace the page with an editable visual layout and mark the prompt as not exported.

