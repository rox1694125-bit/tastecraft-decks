# HTML Deck Guide

Use this guide for browser-native deck delivery.

## Delivery Standard

An HTML deck is successful when it presents cleanly in a browser, scales predictably across target viewports, and preserves the intended visual hierarchy without relying on a slide editor.

## Structure Rules

- Use one semantic section per slide.
- Maintain a fixed slide aspect ratio unless the user explicitly requests scroll-native storytelling.
- Keep slide content inside a consistent safe area.
- Use CSS variables for palette roles and typography.
- Use accessible text for real copy; reserve images for visual content.
- Avoid nested cards and decorative containers that reduce usable space.

## Recommended CSS Tokens

```css
:root {
  --tc-bg: #ffffff;
  --tc-surface: #f6f7f8;
  --tc-text: #1f2328;
  --tc-muted: #667085;
  --tc-primary: #d9480f;
  --tc-secondary: #0f766e;
  --tc-accent: #f2b705;
  --tc-safe-x: clamp(40px, 6vw, 96px);
  --tc-safe-y: clamp(28px, 5vh, 72px);
}
```

## Responsive Rules

- Use a fixed internal slide coordinate system and scale the slide container.
- Do not scale font size directly with viewport width.
- Test at desktop 1440 x 900, laptop 1280 x 720, and mobile portrait if mobile is in scope.
- Ensure text does not overlap when viewport height is constrained.
- Keep interactive controls outside the slide canvas when possible.

## Interaction Rules

- Use keyboard navigation only if it is reliable: left, right, space, and escape.
- Provide visible slide progress when decks exceed 12 slides.
- Use motion for state changes, not decoration.
- Keep animation duration between 120 ms and 500 ms.
- Respect reduced-motion preferences.

## Imagery Rules

- Use responsive image containers with stable aspect ratios.
- Do not use dark blurred stock-like images when the subject must be inspectable.
- For generated images, keep editable text as HTML overlay.
- Use object-fit intentionally: `cover` for atmospheric full-bleed visuals, `contain` for product or UI inspection.

## QA Steps

1. Open locally in browser.
2. Check first, middle, data-heavy, visual, and closing slides.
3. Resize viewport and confirm no overlap or clipping.
4. Verify keyboard and pointer interactions.
5. Inspect console for runtime errors.
6. Confirm palette and logo behavior match the deck spec.

## Failure Handling

- If content clips on shorter screens, reduce objects or split the slide rather than using tiny text.
- If a layout needs PowerPoint editing, route to `editable-pptx`.
- If animation causes jank or distracts from the message, remove it.
- If assets fail to load, use local relative paths and provide fallback background colors.
- If mobile cannot be made usable for the selected density, document desktop-only scope.

