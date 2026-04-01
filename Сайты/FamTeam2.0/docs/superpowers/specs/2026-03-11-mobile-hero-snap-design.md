# Mobile Hero Snap 1=1 — Design Spec

**Date:** 2026-03-11
**Status:** Approved
**Scope:** Mobile only (≤768px). No other sections touched.

---

## Problem

On mobile, scroll-snap is disabled globally. The hero section is already sized to exactly one viewport (`100svh - nav-h`), but without snap the user can stop scrolling at any position inside the hero — breaking the intended "1 screen = 1 scroll" experience.

## Goal

On mobile, the hero section must behave as a single snap unit: one scroll gesture either keeps the user at the hero or carries them past it to the next section. All other sections remain with natural scrolling.

---

## Solution: CSS mandatory snap + zero-height anchor div

### Mechanism

Two CSS snap points are established on mobile:

1. **Hero start** — `scrollTop: 0` — via existing `scroll-snap-align: start` on `.hero-page`
2. **Hero end** — `scrollTop: heroHeight` — via a new `.mobile-hero-snap-anchor` div (height: 0, scroll-snap-align: start) inserted immediately after `<HeroSection />`

With `scroll-snap-type: y mandatory` re-enabled on `.snap-scroll` for mobile, the browser snaps to the nearest of these two points when scroll comes to rest. Once past the anchor (scrollTop > heroHeight), there are no further snap points, so natural scrolling resumes for all remaining sections.

### Why this approach

- **CSS-only** — no JavaScript required
- **Zero layout impact** — anchor element has `height: 0`, invisible, `aria-hidden="true"`
- **Cross-browser** — mandatory snap with two anchor points is well-specified and consistent across Chrome, Safari, Firefox
- **Isolated** — no changes to VisionMission or any other section

---

## Changes

### 1. `src/index.css` — re-enable snap on mobile

In `@media (max-width: 768px)`:

```css
/* Before */
.snap-scroll {
  scroll-snap-type: none;
}

/* After */
.snap-scroll {
  scroll-snap-type: y mandatory;
}
```

Note: `.snap-page` already has `scroll-snap-align: none` in the mobile media query — all non-hero sections remain without snap alignment. No changes needed there.

### 2. `src/index.css` — add anchor class + snap-stop on hero

```css
/* Mobile hero snap anchor — zero-height element creates second snap point
   at the exact bottom edge of the hero, releasing mandatory snap after hero */
.mobile-hero-snap-anchor {
  display: none;
}

@media (max-width: 768px) {
  .mobile-hero-snap-anchor {
    display: block;
    height: 0;
    scroll-snap-align: start;
  }

  /* Prevent fast-fling from skipping over the hero snap point entirely.
     scroll-snap-stop: always forces the browser to always settle at this
     snap point, even on high-velocity gestures. */
  .hero-page {
    scroll-snap-stop: always;
  }
}
```

### 3. `src/pages/Index.tsx` — insert anchor element

The anchor must be placed directly after `<HeroSection />` with no elements between them. `<VisionMissionSection />` follows immediately after the anchor with no additional margin/padding at its top edge that would create a gap between the anchor snap point and the section's visual start. If VisionMission has top margin on mobile, it must remain as-is — the anchor's snap position (`scrollTop = heroHeight`) and VisionMission's visual start will differ by that margin, which is acceptable UX (the user sees VisionMission content beginning, not a gap).

```tsx
<HeroSection />
<div aria-hidden="true" className="mobile-hero-snap-anchor" />
<VisionMissionSection />
```

---

## Constraints

- Desktop behavior unchanged
- All sections except hero unchanged on mobile
- No JavaScript
- No layout changes (anchor is zero-height, does not affect document flow)
- `--nav-h` is a CSS custom property set to `49px` (hardcoded in `:root`), no JavaScript dependency — snap position is stable on load

---

## Known limitations

**Snap threshold is browser-determined.** With `scroll-snap-type: y mandatory`, the exact point at which a partially-scrolled position snaps back vs. forward is controlled by each browser's internal heuristics (typically near the midpoint of the snap region). This is intentional — we rely on native behavior rather than specifying an exact percentage.

**iOS Safari overscroll bounce.** iOS Safari's rubber-band overscroll can create brief visual inconsistency when the user overscrolls at the top of the page. This is native OS behavior and not a regression; the snap behavior itself remains correct after bounce settles.

**Fallback.** If a browser handles zero-height snap anchors inconsistently, the worst case is the hero does not snap on that browser — it degrades gracefully to the current free-scroll behavior. No JavaScript fallback is planned at this stage.

---

## Testing

- [ ] Mobile viewport (375px): hero occupies exactly one screen on load
- [ ] Slow scroll down: browser snaps to either hero-top or hero-bottom (browser-determined threshold)
- [ ] Fast fling down: `scroll-snap-stop: always` forces settle at hero-bottom snap point before continuing
- [ ] After anchor snap point, all remaining sections scroll freely (no snap)
- [ ] Desktop: no regression — all sections still snap as before
- [ ] iOS Safari 15+: snap behavior is consistent (overscroll bounce does not break snap)
- [ ] Chrome Android: snap behavior is consistent
