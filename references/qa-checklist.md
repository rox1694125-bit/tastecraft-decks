# QA Checklist

Use this 100-point rubric before delivering any TasteCraft deck. A deck is export-ready at 85 points or above with no critical failures.

## Critical Failures

Any critical failure blocks delivery regardless of score:

- Private logo, client data, or personal information appears without approval.
- Generated image contains fake logo, fake readable text, misleading chart, or regulated claim.
- Required output format is not satisfied.
- Pages are unreadable at delivery size.
- Deck spec violates schema page types, density values, or prompt-pack confirmation rules.
- A source, legal, financial, medical, or compliance claim is presented as verified when it is not.

## 100-Point Rubric

### 1. Brief And Routing: 10 Points

- 3 pts: Audience, scenario, goal, tone, and constraints are explicit.
- 2 pts: Output format matches the user's actual need.
- 2 pts: Page count and aspect ratio are respected.
- 2 pts: Route decision is documented when `auto` is used.
- 1 pt: Unresolved assumptions are recorded.

### 2. Page Type Fit: 10 Points

- 2 pts: Every page uses one of the seven valid page types.
- 2 pts: Cover, agenda, chapter, content, data, visual, and closing rules are followed where used.
- 2 pts: Page titles state takeaways.
- 2 pts: No page carries two competing objectives.
- 2 pts: Appendix or dense pages are labeled clearly.

### 3. Density And Layout: 15 Points

- 4 pts: Density mode matches audience behavior.
- 3 pts: Text and object budgets are within limits.
- 3 pts: Margins, alignment, and spacing are consistent.
- 2 pts: Overflow is split instead of over-compressed.
- 2 pts: Tables and charts remain readable.
- 1 pt: Navigation or section context is clear.

### 4. Color And Contrast: 10 Points

- 3 pts: Palette roles are applied consistently.
- 3 pts: Text contrast is acceptable on all backgrounds.
- 2 pts: Accent color is used sparingly and meaningfully.
- 1 pt: Data colors are distinguishable.
- 1 pt: Brand overrides do not damage readability.

### 5. Typography: 10 Points

- 3 pts: Type scale matches density and format.
- 2 pts: Font choices are available or safely substituted.
- 2 pts: Titles do not wrap awkwardly.
- 2 pts: Body copy is scannable and aligned.
- 1 pt: Mixed-language typography is checked when relevant.

### 6. Logo And Brand: 10 Points

- 3 pts: Logo placement matches brand mode and schema placement.
- 2 pts: Logo sizing and clearspace are correct.
- 2 pts: Reverse logo use is approved and readable.
- 2 pts: Co-branding hierarchy is clear when present.
- 1 pt: White-label decks contain no stray TasteCraft marks.

### 7. Imagery And Prompt Pack: 15 Points

- 3 pts: Every generated image maps to a confirmed prompt.
- 3 pts: Images support actual page meaning, not generic atmosphere.
- 2 pts: Safe areas allow readable text overlays.
- 2 pts: Negative prompts address text, logos, artifacts, and forbidden elements.
- 2 pts: Generated images are inspected for artifacts.
- 2 pts: Image style matches palette and typography.
- 1 pt: Fallback is documented when generation is unavailable.

### 8. Output-Specific Quality: 10 Points

- 4 pts: PPTX editability or HTML responsiveness meets the route requirement.
- 2 pts: Exported files open without errors.
- 2 pts: Charts, links, animations, or interactions work as intended.
- 1 pt: File naming is clear.
- 1 pt: Delivery notes include known caveats.

### 9. Final Review: 10 Points

- 3 pts: Spelling, grammar, and naming are checked.
- 2 pts: Sources and footnotes are present where needed.
- 2 pts: No placeholder text remains.
- 2 pts: Slide order tells a coherent story.
- 1 pt: Final score and blockers are documented.

## Scoring Bands

- 95 to 100: Ready for executive delivery.
- 85 to 94: Ready with minor caveats.
- 70 to 84: Needs revision before delivery.
- Below 70: Rebuild structure or route.
- Any critical failure: Blocked.

## Failure Handling

When QA fails:

1. Identify whether failure is critical or score-based.
2. Fix critical failures before cosmetic improvements.
3. Re-score only the affected sections after each fix.
4. If a requested constraint causes failure, document the conflict and preserve user intent only when safe.
5. If the deck cannot reach 85 points in the requested format, recommend the nearest viable route and explain the tradeoff.

