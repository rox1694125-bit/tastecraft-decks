# Page Types

TasteCraft V1 supports exactly seven page types. The page type controls layout options, density limits, visual role, logo policy, and QA expectations.

## 1. Cover

Purpose: establish topic, audience promise, brand tone, and date or venue.

Required elements:

- Deck title, no more than 14 words.
- Optional subtitle, no more than 22 words.
- Owner, client, event, or date when relevant.
- One dominant visual or clear typographic hierarchy.

Rules:

- Use one primary message, not a table of contents.
- Logo may be larger here than on internal pages.
- Use `speaker-led` or `balanced` density unless the cover doubles as a document title page.
- Avoid more than three text blocks.

Recommended variants:

- Full-bleed image with title overlay.
- Split editorial field with large type and supporting metadata.
- Minimal branded cover with strong color block.

## 2. Agenda

Purpose: make the deck path scannable before detail begins.

Required elements:

- Three to seven agenda items.
- Optional timing, owner, or chapter number.
- Clear indicator of current sequence only if used during a live presentation.

Rules:

- Do not include detailed findings.
- Keep agenda item labels parallel in grammar.
- If there are more than seven items, group them into chapters.
- Use small logo treatment or no logo unless brand mode is `strong-brand`.

Recommended variants:

- Numbered vertical agenda.
- Horizontal journey strip.
- Chapter cards without nested cards.

## 3. Chapter

Purpose: reset context and signal a major shift.

Required elements:

- Chapter title, no more than 10 words.
- Optional one-sentence section promise.
- Section number when the deck uses numbered sections.

Rules:

- One idea only.
- Prefer high whitespace or a single strong visual.
- Do not place dense charts or tables on chapter pages.
- Logo placement may be `section-only` or footer-subtle.

Recommended variants:

- Large type on color field.
- Image-led section divider.
- Number-led divider with brief context line.

## 4. Content

Purpose: carry the argument, recommendation, process, or explanation.

Required elements:

- Action title that states the takeaway.
- Two to five supporting blocks.
- Optional diagram, quote, process, or callout.

Rules:

- Use content pages for claims that can be explained without heavy numeric evidence.
- Each page should answer one audience question.
- Do not mix more than two layout systems on one page.
- If data drives the conclusion, use `data` instead.

Recommended variants:

- Two-column argument and implication.
- Process steps with one highlighted decision.
- Problem, insight, action.
- Comparison table with no more than five rows.

## 5. Data

Purpose: present numeric evidence, charted trends, model output, tables, or KPI scorecards.

Required elements:

- Action title with the conclusion, not just chart topic.
- Source or basis note when facts are external or model-derived.
- Chart, table, metric row, or scorecard.
- One explicit interpretation.

Rules:

- Every chart needs labeled axes or direct labels.
- Tables must use alignment by data type: text left, numbers right, dates centered or left by locale.
- Use no more than two chart types per page.
- Use `reading-first` or `appendix-heavy` only when the page must stand alone.
- Do not decorate data with unrelated images.

Recommended variants:

- KPI strip plus interpretation.
- Single chart with side insight.
- Ranked table with highlight row.
- Before/after or scenario comparison.

## 6. Visual

Purpose: let image, scene, product view, customer journey, architecture map, or spatial comparison carry the message.

Required elements:

- Title or short caption.
- Dominant visual occupying at least 50% of slide area.
- One takeaway, label set, or annotation layer.

Rules:

- Use only visuals that reveal actual subject matter, not generic atmosphere.
- Generated visuals must have a confirmed prompt pack entry.
- Keep annotation count below seven.
- Do not use a visual page as a disguised text slide.

Recommended variants:

- Product screenshot or mockup with labels.
- Full-bleed generated scene with sparse overlay.
- Journey map or service blueprint.
- Side-by-side visual comparison.

## 7. Closing

Purpose: end with decision, next steps, ask, recap, or appendix transition.

Required elements:

- Final recommendation, decision ask, or next action.
- Owner or contact only when appropriate.
- Optional recap of up to three points.

Rules:

- Do not introduce new evidence unless closing an appendix.
- Stronger logo placement is allowed on final page.
- Keep final ask concrete: approve, review, fund, launch, schedule, or align.
- For training, close with practice task or assessment next step.

Recommended variants:

- Decision ask plus next steps.
- Three-point recap.
- Contact and brand lockup.
- Appendix start marker.

## Cross-Type Rules

- Every page title must describe the page-specific takeaway.
- A page may borrow visual patterns from another type, but its schema `type` must match the page objective.
- Use the smallest type that satisfies the objective; do not create chapter pages just for decoration.
- If a page fails its type rules, change the content or change the type before export.

