# 2026-06-08 Codex Image Prompt Ledger

## Purpose

Record the exact prompts used for the June 8 Codex built-in image-generation preview round, so generated images can be reviewed against the prompt that produced them.

Codex built-in `image_gen` saved PNG files only. It did not save prompt metadata beside the images. The mapping below is reconstructed from the generation call order and the PNG file modification times.

## Run Metadata

- Workflow: pure AI whole-slide finished PPT image preview.
- Tool path: Codex built-in `image_gen`.
- Slide brief: Chinese / US tax revenue composition comparison.
- Prompt language used in this run: English prompt scaffold with Chinese slide title, required labels, numbers, and text-accuracy rules.
- Target aspect ratio: 16:9.
- Image directory: /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237
- Repository policy: do not commit generated PNG binaries unless a separate review decision allows it.

## Image Mapping

| Order | Template | Image path | Initial note |
| --- | --- | --- | --- |
| 1 | `citrus-editorial` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b7961dd081989c395df956bd74f6.png | More visually distinctive, but the metaphor may be less natural for a tax-comparison board slide. |
| 2 | `market-slate` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b7e44f908198998b13823243658a.png | Still at risk of drifting toward an ordinary executive dashboard. |
| 3 | `atelier-rose` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b839e1288198a707607958fb851b.png | Warmer editorial feel; needs content-fit review for technical financial topics. |
| 4 | `harbor-mint` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b8809fc88198bc0fad6b6ced2bcd.png | Clean service-design direction, but still risks feeling like a normal dashboard. |
| 5 | `ink-copper` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b8d90888819887d9665a9fa6d3f5.png | One of the strongest visual-ceiling candidates in this pass. |
| 6 | `orchard-lab` | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_09def4c3c6113071016a25b92a8a2c8198a0181d0a244b9f22.png | One of the strongest visual-ceiling candidates in this pass. |

## Prompt 1: citrus-editorial

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Citrus Editorial candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: citrus-editorial / Citrus Editorial / culinary editorial magazine. Art direction: culinary editorial magazine energy translated into a business presentation: warm paper stock, citrus-toned editorial ribbons, tactile table-top depth, fresh optimistic pacing, one precise analytical layer instead of a plain dashboard. Composition grammar: asymmetric magazine spread, generous title field, one hero comparison moment, small annotated evidence modules, refined shadows, light material texture, no boxed-card grid. Color usage rules: use primary citrus for the title and one hero value, secondary teal for comparison structure, accent yellow only for small editorial ticks or one key highlight. Palette roles: background #FFF9F0, surface #FFFFFF, text #1F2328, muted text #667085, primary #D9480F, secondary #0F766E, accent #F2B705.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt 2: market-slate

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Market Slate candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: market-slate / Market Slate / executive market intelligence. Art direction: executive market intelligence system: crisp board-review analytics, institutional confidence, subtle market-map linework, glassy but restrained data surfaces, consulting-grade hierarchy. Composition grammar: modular executive command page, strong invisible grid, controlled whitespace rhythm, one dominant insight zone, compact evidence strip, precise comparison geometry, never a default dashboard. Color usage rules: use slate primary for title/navigation and lead series, green secondary for structural counterpoint, coral accent only for risk/delta/callout values. Palette roles: background #F7F8FA, surface #FFFFFF, text #18202A, muted text #5D6B7A, primary #205B73, secondary #2F855A, accent #E76F51.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt 3: atelier-rose

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Atelier Rose candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: atelier-rose / Atelier Rose / premium hospitality editorial. Art direction: premium hospitality editorial system: warm human intelligence, luxury magazine pacing, soft rose editorial panels, refined service-detail texture, calm confidence rather than corporate dashboarding. Composition grammar: layered editorial spread with soft surfaces, framed hero statement, human-scale spacing, quiet comparative diagram, subtle depth and shadow, premium brochure craft without becoming an advertisement. Color usage rules: use rose primary for expressive headings, green secondary for grounded comparison lines, gold accent as small premium markers only. Palette roles: background #FAF6F3, surface #FFFFFF, text #27211F, muted text #7A6B64, primary #9F3A4A, secondary #406A5D, accent #D79A3D.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt 4: harbor-mint

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Harbor Mint candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: harbor-mint / Harbor Mint / calm service-design system. Art direction: calm service-design system: clean SaaS/service blueprint clarity, mint technical calm, workflow-map precision, airy product-system feel, practical but visually elevated. Composition grammar: service blueprint page with flowing paths, interface-like alignment without fake UI screens, clear step/contrast zones, low-friction reading path, light technical grids and soft depth. Color usage rules: use teal primary for structure and titles, green secondary for completed/stable states, yellow accent for one active point or single hero metric. Palette roles: background #F4FBFA, surface #FFFFFF, text #172326, muted text #617073, primary #007C89, secondary #5B8C5A, accent #FFB703.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt 5: ink-copper

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Ink Copper candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: ink-copper / Ink Copper / dark executive keynote. Art direction: dark executive keynote system: dramatic high-contrast leadership page, ink-black environment, copper editorial light, cinematic but disciplined financial narrative, premium stage presence. Composition grammar: one powerful focal structure with dark negative space, copper-lit data architecture, sculptural dividers, bold hierarchy, sparse but decisive evidence, no nightclub glow or decorative spectacle. Color usage rules: use copper primary for hero emphasis and chapter-like anchors, teal secondary for cool structural contrast, gold accent only as tiny signal markers. Palette roles: background #151A1E, surface #242A2F, text #F7F2EA, muted text #B8C0C2, primary #C46A3A, secondary #66A6A0, accent #F0C75E.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt 6: orchard-lab

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate the Orchard Lab candidate for a Chinese board-review slide.

Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide. Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. Output: 16:9 aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions. Style template: orchard-lab / Orchard Lab / research lab field notebook. Art direction: research lab field notebook system: natural precision, field-research optimism, lab-note grids, botanical/scientific detail translated into business evidence, fresh but rigorous. Composition grammar: research notebook meets polished board slide: measured grid, annotated specimens or abstract evidence markers, calm comparison zones, clean margin notes, subtle paper/lab materiality. Color usage rules: use green primary for growth and main conclusion, teal secondary for analytical contrast, amber accent for thresholds or experimental markers. Palette roles: background #FBFCF5, surface #FFFFFF, text #20251D, muted text #66705C, primary #4F7D24, secondary #1E6F78, accent #E0A100.

Slide brief: topic 中美税收结构对比; scenario board-review; audience 财税顾问和企业主; goal 用一页图说明中美税制收入结构差异。 Page: data; title "中美税收结构对比"; objective 突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。 visual role executive comparison page; layout intent executive-tax-comparison; density balanced. visual ambition: create a premium consulting/keynote-grade one-page visual that clearly benefits from image generation, with material depth, refined background graphics, and a stronger spatial idea than ordinary cards or default charts. Information architecture: make the main insight visually dominant, compress supporting evidence into secondary modules, use invisible alignment, readable hierarchy, and deliberate dense/sparse contrast.

Text rules: Use Chinese text. Prioritize exact rendering of title 《中美税收结构对比》 and these key labels/numbers: 中国 增值税38% 企业所得税22% 个人所得税8%; 美国 个人所得税49% 社保税36% 企业所得税9%. Do not rewrite countries, categories, or values. If the body is too much, compress secondary labels but preserve title and hero numbers. Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words. Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup.

Avoid: generic card layout, default dashboard, flat HTML-like chart, plain two-column infographic, decorative clutter, fake logos, watermark, stock-photo cliche, misleading chart, invented numbers, garbled text, tiny unreadable labels, warped typography, low-resolution details.
```

## Prompt Retention Rule For Future Image Runs

Before every image-generation call, append a new entry to the current prompt ledger. The entry should be written before calling the image tool, then updated with the image path after generation.

Recommended entry shape:

```text
## Run Entry: {timestamp} / {template_id}

- Tool path:
- Prompt source:
- Prompt language:
- Template:
- Slide/page:
- Status:
- Output image path:
- Review notes:

### Prompt Actually Sent

...
```

Operational rules:

- Keep prompts in Markdown for immediate readability.
- Do not rely on the image file directory to preserve prompts; current Codex built-in image generation only saved PNG files in this test.
- Do not commit generated PNG files by default.
- If a later run uses `prompt-pack.json`, paste or reference the exact `prompt_variants.zh-CN` or `prompt_variants.en` text that was actually sent.
- If a prompt is edited manually after export, record the final edited prompt, not only the source template.

## Run Metadata - Synthetic Vital Test

- Workflow: pure AI whole-slide finished PPT image preview.
- Tool path: Codex built-in `image_gen`.
- Slide brief: Starlight Mutual Hong Kong critical illness insurance value proposition, based on user-provided Chinese product notes.
- Prompt language used in this run: `zh-CN` active prompt variant with a short English use-case wrapper.
- Target aspect ratio: 16:9.
- Prompt pack: `docs/project-log/2026-06-08-synthetic-vital-test-prompt-pack.json`.
- Status: invalidated by user review because the prompt compressed the supplied full content without being asked.
- Content compression used in this invalidated run: preserve the title, four shield labels, and key numbers; do not attempt to typeset every paragraph.
- Correction rule: if the user provides full slide content, the prompt must ask the model to place the full content into the image; do not summarize, shorten, delete information points, or keep only highlights unless the user explicitly asks for summary, extraction, or compression.
- Repository policy: do not commit generated PNG binaries unless a separate review decision allows it.

## Synthetic Vital Test Image Mapping

| Order | Template | Image path | Initial note |
| --- | --- | --- | --- |
| 1 | `citrus-editorial` / Editorial Paper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25c8f8365c819ba31a7af1c0b6f427.png | Invalidated: prompt compressed the supplied content into title, four shield labels, and key numbers. |
| 2 | `market-slate` / Market Slate | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25c95520e4819bae3baf00c9308572.png | Invalidated: prompt compressed the supplied content; also showed the risk of literal shield/family-photo imagery. |
| 3 | `atelier-rose` / Sovereign Gold | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25c9bfe378819bb7ac30bbcaf0ec72.png | Invalidated: useful style signal, but not a valid full-content density test. |
| 4 | `harbor-mint` / Precision Blueprint | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25ca23b8b4819bb7cc80ad2817a622.png | Invalidated: useful blueprint signal, but not a valid full-content density test. |
| 5 | `ink-copper` / Ink Copper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25ca8754fc819bbfe336cdf85e150c.png | Invalidated: color direction looked stable, but prompt used unauthorized content compression. |
| 6 | `orchard-lab` / Evidence Lab | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25caef9084819b8fa4812df14e3110.png | Invalidated: useful clean research signal, but not a valid full-content density test. |

## Run Metadata - Synthetic Vital Full-Content Test

- Workflow: pure AI whole-slide finished PPT image preview.
- Tool path: Codex built-in `image_gen`.
- Slide brief: Starlight Mutual Hong Kong critical illness insurance value proposition, based on user-provided Chinese product notes.
- Prompt language used in this run: `zh-CN` active prompt variant with a short English use-case wrapper.
- Target aspect ratio: 16:9.
- Prompt pack: `docs/project-log/2026-06-08-synthetic-vital-full-content-test-prompt-pack.json`.
- Content policy: place the full user-provided content into the image; no summarization, shortening, omission, or label-only replacement unless the user explicitly asks for it.
- Extra test constraint: `四大核心守护盾` is treated as a section name only; do not draw literal shield icons, shield emblems, crests, fake brand marks, family stock photos, or hospital scenes.
- Repository policy: do not commit generated PNG binaries unless a separate review decision allows it.

## Synthetic Vital Full-Content Test Image Mapping

| Order | Template | Image path | Initial note |
| --- | --- | --- | --- |
| 1 | `citrus-editorial` / Editorial Paper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25cc721028819b8d562490398b65c2.png | Valid full-content test. Editorial paper style carried the full text better than the compressed run, but still needs review for serious insurance fit. |
| 2 | `market-slate` / Market Slate | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25cccebfd0819b953a3f00f4dd26d2.png | Valid full-content test. Professional and dense, but the model appeared to add an extra summary line at the bottom. |
| 3 | `atelier-rose` / Sovereign Gold | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25cd305580819b93dec4b6e01daed1.png | Valid full-content test. Premium finance direction held up under dense copy, with some residual shield-like section markers. |
| 4 | `harbor-mint` / Precision Blueprint | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25cd958b40819bac10da04700d24db.png | Valid full-content test. Blueprint differentiation is clear; review possible skyline/decorative drift and shield-like icons. |
| 5 | `ink-copper` / Ink Copper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25cdfe1d18819bb93fe8e7f7b80b5f.png | Valid full-content test. Dark copper palette stayed stable and avoided the previous red-blue clash. |
| 6 | `orchard-lab` / Evidence Lab | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04d903e343a9e707016a25ce689950819b82957a614cf1207e.png | Valid full-content test. Evidence dossier direction stayed clean; review for any residual icon literalism and text fidelity. |

## User Review Feedback

### 1. citrus-editorial

Status: reject for finance / serious report use.

Findings:

- Literal citrus imagery and white flowers appeared in the generated page.
- Those objects conflict with the professional tax-comparison message and dilute the seriousness of the slide.
- The central China / US data comparison was too compressed by surrounding visual elements.
- The ring charts looked slightly flattened rather than perfectly circular.
- The useful part is the paper texture, material feel, and distinctive editorial surface language.

Next template change:

- Keep only the non-literal editorial paper texture and refined print feel.
- Remove culinary, citrus, fruit, flower, food, plant, lifestyle, and still-life cues.
- Mark this template as unsuitable as the default for financial or conservative board-review topics.

### 2. market-slate

Status: keep as safe choice.

Findings:

- Usable and professional.
- It is restrained and unlikely to fail.
- It is not visually surprising, so it should be positioned as the safe baseline rather than the highest visual-ceiling option.
- The model should not add disclaimers, footnotes, or bottom notes unless the user explicitly asks for them.

Next template change:

- Keep the conservative executive-market direction.
- Add a global rule: no self-added disclaimers, footnotes, source notes, or remarks unless provided in the brief.

### 3. atelier-rose

Status: replace.

Findings:

- Rose / floral / hospitality-style direction is not useful for normal TasteCraft finance and business workflows.
- Replace with a more financial, premium, and dignified style.

Next template change:

- Replace with `Sovereign Gold`: private wealth / asset-management / premium finance direction.
- Use institutional navy, antique gold, ivory, and bronze rather than rose or floral cues.

### 4. harbor-mint

Status: replace or strongly reposition.

Findings:

- Too similar to `market-slate`.
- If templates overlap, the six-template comparison loses value.

Next template change:

- Reposition as `Precision Blueprint`: technical finance, mechanism explanation, architecture maps, exact linework, and structural diagrams.
- Make it more blueprint / systems-oriented and less dashboard-like.

### 5. ink-copper

Status: keep direction, revise palette.

Findings:

- Dark executive direction is useful.
- Current blue and red pairing looked awkward on a dark background.
- Palette should use mature color harmony rather than leaving the model to improvise saturated red/blue contrast.

Next template change:

- Keep dark executive keynote direction.
- First revision moved to ink black, warm copper, ivory, cool steel-blue in small roles, and champagne gold.
- Later user review found the near-black background too limited in practical use; current revision moves to deep mineral green graphite, warm copper, ivory, muted mineral sage, and antique gold.
- Avoid large saturated red or blue fields and avoid flat pure-black stage backgrounds.

### 6. orchard-lab

Status: keep layout direction, remove plant metaphor.

Findings:

- Plant imagery is unrelated to the tax-comparison topic and should not appear.
- The overall clean research feel and distinctive layout are useful.
- The explanatory structure is clearly differentiated from the other templates.

Next template change:

- Reposition as `Evidence Lab`.
- Keep clean research / dossier / evidence-marker language.
- Remove orchard, plant, field, leaf, flower, botanical, and natural specimen imagery.

## Second User Review Feedback - Full-Content Insurance Test

The user then reviewed the six full-content Synthetic Vital images and clarified the intended boundary between useful AI interpretation and unwanted prompt literalism.

### Accepted Or Adjusted

- `citrus-editorial` / Editorial Paper: color, texture, and layout are acceptable. The main fix is text interpretation: input markers such as `【主标题】`, `副标：`, and wrapper parentheses should be parsed as structure, not rendered literally.
- `market-slate`: the light bottom summary is acceptable when highly relevant to the content. The unrelated world map and stock-line decoration remain weak because they are not aligned with the Hong Kong insurance content.
- `atelier-rose` / Sovereign Gold: overall accepted. Shield-like symbols are acceptable because concrete, content-relevant metaphors can make generated images stronger.
- `harbor-mint` / Precision Blueprint: overall accepted, with the same raw input-label issue as Editorial Paper.
- `ink-copper`: pure black or near-black background has too few practical use cases. The dark template should switch to a more usable mineral-copper palette.
- `orchard-lab` / Evidence Lab: color and style remain distinctive, but visible template language such as `Evidence Lab`, `Evidence Rating`, `Lab Index`, and fake evidence metrics makes the output unusable.

### Resulting Prompt Rules

- Full content must still be preserved, but raw input labels and wrappers are not content. Convert them into clean title, subtitle, section heading, item, or body text.
- Template IDs, display names, and style signatures are internal art-direction labels. They must not appear as visible slide copy.
- Concrete visual metaphors are allowed when they are directly related to the subject. The prompt should block unrelated objects rather than trying to ban all AI interpretation.
- `market-slate` may use restrained subject-relevant Hong Kong, insurance, regulatory, or industry cues; it should not use generic world maps or awkward market-line decorations unless the brief supports them.
- `ink-copper` uses a deep mineral green graphite background with copper, ivory, muted mineral sage, and antique gold instead of a flat black stage.

## Prompt Template Card Review Decisions

After reviewing P0/P1 issue cards in the Codex conversation, the user approved the following implementation rules for the next prompt-template version:

- Do not put template IDs, display names, or signatures into the image-generation prompt body. They remain in JSON metadata, UI labels, and logs only.
- Do not use field-label metadata such as `页面简报`, `页面`, `版式意图`, `Slide brief`, or `layout intent` as prompt body text. Rewrite those as natural generation instructions.
- Default to full body copy. Only compress when the user explicitly asks for compression, extraction, summary, or a concise version.
- Dense content should first reduce decoration and adjust layout density instead of deleting body copy.
- Use `core information body` as the generic 60-70% proportion rule. Add the data-comparison-specific rule only for data or comparison pages.
- Remove global insurance / Hong Kong example metaphors from the base prompt. Keep subject-relevant metaphor examples content-aware.
- Delete global hard-coded negative terms for fruit, flowers, plants, leaves, and food still life; do not replace them with conditional negative injection in this pass.
- Shorten the prompt into hard rules, page content, visual requirements, visual style, and a concise negative prompt.
- Replace abstract visual-ambition wording with executable layout rules: one visual anchor, 3-5 ordered information groups, a clear title area, and a stable reading path.
- Strengthen the distinction between conclusion-oriented executive briefing (`market-slate`) and mechanism / system blueprint explanation (`harbor-mint`).
- Keep HEX color roles but also specify color proportions.
- Replace broad `普通双栏信息图` with failure terms such as cheap two-column template, stock infographic style, and mechanical side-by-side boxes.
- Do not add page-type-specific prompt templates yet.
- Add four fixed smoke brief types to the protocol: no-copy style test, short sales page, long Chinese full-copy page, and non-financial topic page.

## Run Metadata - Synthetic Vital Optimized Template Retest

- Workflow: pure AI whole-slide finished PPT image preview.
- Tool path: Codex built-in `image_gen`.
- Prompt source: current `assets/tastecraft-console/app.js` after the June 8 prompt-template optimization.
- Slide brief: Starlight Mutual Hong Kong critical illness insurance value proposition, based on the full user-provided Chinese product notes.
- Prompt language used in this run: `zh-CN` active prompt variant with a short English use-case wrapper.
- Target aspect ratio: 16:9.
- Content policy: place the full user-provided content into the image; no summarization, shortening, omission, or label-only replacement unless the user explicitly asks for it.
- Structural-label policy: `【主标题】`, `副标：`, brackets, and parentheses are treated as structure hints, not visible text.
- Repository policy: do not commit generated PNG binaries unless a separate review decision allows it.

## Synthetic Vital Optimized Retest Image Mapping

| Order | Template | Image path | Initial note |
| --- | --- | --- | --- |
| 1 | `citrus-editorial` / Editorial Paper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a263e410d48819b8ab4f42e1ce8e5d9.png | Optimized retest. Verify whether the removed citrus/flower prompt cues prevent unrelated objects while preserving the editorial paper texture. |
| 2 | `market-slate` / Market Slate | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a263f0fb268819bb66be7135d1325df.png | Optimized retest. Safe executive direction; review any model-added bottom synthesis strip or extra remarks. |
| 3 | `atelier-rose` / Sovereign Gold | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a26407337e8819b895d463722f816b6.png | Optimized retest. Replaces the former rose/hospitality direction with a private-wealth finance direction. |
| 4 | `harbor-mint` / Precision Blueprint | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a2641550fc0819bbf6d449105adcb21.png | Optimized retest. Blueprint direction is separated from the safe executive brief direction; review any extra footer synthesis. |
| 5 | `ink-copper` / Ink Copper | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a264233f2a4819bb3e4f9aef449bcfd.png | Optimized retest. Uses deep mineral green/copper instead of pure black; review text contrast and remaining decorative skyline drift. |
| 6 | `orchard-lab` / Evidence Lab | /Users/jack/.codex/generated_images/019ea34b-598b-7301-83c7-8f489e08d237/ig_04ee0283c750bce5016a26431c68c0819b8a2c36467704be6f.png | Optimized retest. Prompt removed visible template names and fake lab metrics; review any model-added summary text or residual pseudo-labels. |

## Optimized Retest Prompt 1: citrus-editorial / Editorial Paper

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 1/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：温暖的编辑印刷纸感，适合较轻的商业主题：高级纸张纹理、精致边距线、克制编辑缎带、印刷材质深度，以及一个精准分析层，避免无关生活方式摆件。构图语法：非对称编辑跨页，充足标题区，一个占主导的信息主体区，小型注释证据模块，精致阴影，细微纸张颗粒，避免盒子卡片网格。 色彩使用规则：暖赭主色用于标题和一个主数值，低饱和青绿色用于对比结构，古金强调色只用于小型编辑标记或一个关键高亮。调色角色：背景 #FBF7EF，面板 #FFFFFF，正文 #20242A，弱化文字 #68707A，主色 #A75E2B，辅色 #2F6F73，强调色 #C9A646。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```

## Optimized Retest Prompt 2: market-slate / Market Slate

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 2/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：机构级高管简报方向：清晰的董事会分析感、明确结论、业务判断、关键证据；只有 brief 支持时才使用与主题相关的地域、监管或行业线稿；咨询级信息层级。构图语法：模块化高管简报页，强隐形网格，受控留白节奏，一个主结论区，紧凑证据带，精确对比几何，绝不做默认仪表盘，不要画机制流程图，不使用无关世界地图或突兀股价折线装饰。 色彩使用规则：石板主色用于标题/导航和主数据序列，绿色辅助色用于结构对照，珊瑚强调色只用于风险、差异或单个重点数值。调色角色：背景 #F7F8FA，面板 #FFFFFF，正文 #18202A，弱化文字 #5D6B7A，主色 #205B73，辅色 #2F855A，强调色 #E76F51。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```

## Optimized Retest Prompt 3: atelier-rose / Sovereign Gold

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 3/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：克制的私行/资管方向：机构海军蓝、古金细节、高级金融信任感、安静权威；避免酒店服务业、生活方式或浪漫装饰线索。构图语法：有层次的金融编辑跨页，框定式主洞察，精致账簿式分隔线，安静对比图解，纪律化留白，保持高级金融画册质感但不变成广告。 色彩使用规则：古金主色用于高级标题和主强调，深海军蓝辅助色用于结构和对比线，克制青铜强调色只作为小型数值标记。调色角色：背景 #F6F1E6，面板 #FFFFFF，正文 #1B2230，弱化文字 #6E6A61，主色 #8A6A2F，辅色 #243B5A，强调色 #B98A44。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```

## Optimized Retest Prompt 4: harbor-mint / Precision Blueprint

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 4/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：适合科技金融和机制解释的机制蓝图方向：冷静蓝图纸、精确线稿、层叠架构图、因果路径、层级结构、流程关系和分析清晰度。构图语法：蓝图式解释页，有度量路径、结构叠层、类坐标导引、清晰机制区、节点路径、局部放大标注、低阻阅读路径，不伪造 UI 屏幕，不要做普通高管仪表盘。 色彩使用规则：钢蓝主色用于结构和标题，技术青辅助色用于机制路径，低饱和黄铜强调色用于一个活跃节点或主指标。调色角色：背景 #F3F7FC，面板 #FFFFFF，正文 #172033，弱化文字 #5C6878，主色 #1F5E8C，辅色 #2B7480，强调色 #BFA15A。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```

## Optimized Retest Prompt 5: ink-copper / Ink Copper

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 5/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：深矿物绿铜金高管 Keynote 系统：用深矿物绿石墨背景替代纯黑，暖铜层级、象牙白文字、低饱和矿物鼠尾草只作为结构辅助，电影感但克制的高管叙事，避免红蓝冲突。构图语法：一个有力量的焦点结构，深矿物色负空间，铜光数据架构，雕塑感分隔，强层级，稀疏但果断的证据，避免夜店光效、纯黑舞台或装饰奇观。 色彩使用规则：铜色主色用于主强调和章节锚点，矿物鼠尾草辅助色只用于细线结构对比和冷静数据辅助，古金强调只作为极小信号标记；避免大面积高饱和蓝色、红色或平面纯黑。调色角色：背景 #17221E，面板 #22302A，正文 #F2ECE0，弱化文字 #AEB6A8，主色 #C1783D，辅色 #88A39C，强调色 #D4B36A。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```

## Optimized Retest Prompt 6: orchard-lab / Evidence Lab

```text
Use case: productivity-visual
Asset type: PPT-ready 16:9 whole-slide image preview
Primary request: Generate candidate 6/6 for a Chinese Hong Kong critical illness insurance product value proposition slide with FULL USER-PROVIDED CONTENT.

你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。 硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。 输出：16:9 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。 页面内容：这是一张面向 香港保险顾问、高净值家庭客户、理财顾问 的 client-presentation 演示页，主题是 星河安康计划香港重疾险价值主张，目标是 用一页图承载完整产品卖点文本，测试六套模板在真实高密度保险销售页中的可读性、专业感和信息组织能力。。页面标题必须呈现为《星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹》。页面需要服务这个目标：把用户提供的完整保险产品文案排版进一张高可信度、高密度、仍然可读的产品价值主张页。。整体气质接近 premium high-density insurance product value proposition slide，信息密度为 reading-first。 内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：【主标题】
星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹
（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）

【四大核心“守护盾”】

 1. 极致性价比：亲民费率 + 分红升值
现金价值双驱动： 20/25年交，缴费期满时现金价值不仅保证回本，更有额外非保证分红，真正实现“有病赔钱，无病养老”。

费率极具竞争力： 剔除冗余品牌溢价，在同等保障深度下，费率处于市场最一梯队，用更小的投入撬动更大的杠杆，让每一分保费都花在刀刃上。

多重保费豁免： 缴费期内，罹患重疾豁免后续保费；罹患轻症豁免24个月保费（可多次触发），确保在最困难的时刻，保障依然坚挺。

2. 核心赔付强：最高700%的守护力
黄金期赠送： 20岁前投保首20年（20岁后首10年）额外获赠60%保额。买100万得160万，在人生责任最重的阶段加码守护。

多次赔付条款优： 涵盖癌症、中风、心脏病等高发重疾，最高可理赔7次！癌症、中风、心脏病之间豁免等候期，条款更为友好。

保额还原功能： 获赔早期或儿童重疾后，只需等候1年，重疾保额即可100%还原，不因轻症理赔而削减未来的“保命钱”。

3. 保障无死角：全面覆盖+定向加护
保障全面覆盖： 涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术（涵盖未知疾病风险），保障数量与深度行业领先。

定向额外加护： 针对男/女性特定器官疾病额外赔付20%。同时针对特定复杂手术提供额外保障，完美抵御未来医疗技术更新带来的未知风险。

重疾现金支持： 确诊可申领每月1%保额的支援金，长达18个月。除了赔一笔钱，星河还能提前预支保额，缓解家庭收入中断的阵痛。

4. 品牌硬实力：百年星河，安心托付
百年稳健底蕴： 星河保障1865年成立于加拿大，深耕香港130余年。大品牌、高评级，理赔口碑与资产管理实力全球公认。

全方位增值权益： 提供免费癌症检查、5张免费体检券、全球顶尖名医第二意见等服务，是全家人的健康管家，而不止是一张保单。 视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。 信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。 主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。 视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须服务内容，不能变成无关装饰。 若主题明确涉及保险或保障，可以使用保单、层级保护结构等直接服务内容的具象化元素。 若主题明确涉及香港，可以使用克制的香港地域线索。 若主题明确涉及金融或资管，可以使用账簿、资产结构、风险分层或精致金融标记。 图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。 视觉风格：研究档案式方向：干净研究桌严谨感、分析档案纸、仪器感线稿、抽象证据标记和平静对比推理，避免伪档案指标。构图语法：研究档案遇到精修董事会幻灯片：有度量网格、抽象验证标记、平静对比区、只来自内容本身的干净边注、微妙纸张材质，并且和仪表盘模板明显区分，不出现模板标签。 色彩使用规则：石板蓝主色用于证据层级，干燥鼠尾草辅助色用于分析对比，低饱和黄铜强调色用于阈值或验证标记。调色角色：背景 #F7F8F4，面板 #FFFFFF，正文 #20242A，弱化文字 #687060，主色 #4E6375，辅色 #66775A，强调色 #C2A24D。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。 字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。 保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。

Full-content rendering mandate: Put all supplied Chinese content into the image. The title, subtitle, all four numbered modules, and every explanatory paragraph must be represented. Do not summarize, shorten, omit, or replace paragraphs with labels. Use a dense but readable presentation layout: multi-column, sectioned, table-like, annotated ledger, or appendix-style treatment is acceptable. Raw input markers such as 【主标题】 and 副标： are structure hints, not visible text.

Avoid: 乱码文字, 扭曲字体, 过小不可读文字, 编造数字, 误导性图表, 虚假 logo, 水印, 输入结构标签上屏, 模板名上屏, 低清细节, 库存信息图风格, 廉价模板感, 廉价双栏模板感, 机械左右并列大框, watermark, fake logo, random QR code, medical horror imagery, hospital bed photo, no fake brand marks, no random QR code, no hospital scenes
```
