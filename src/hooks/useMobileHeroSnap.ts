import { useEffect, useRef } from 'react';

const MOBILE_BREAKPOINT = 768;
const DEBOUNCE_MS = 150;

/**
 * On mobile (≤768px), snaps the scroll container to either the top or
 * bottom of the hero section when the user stops scrolling mid-hero.
 *
 * Behaviour:
 *  - scrollTop < heroHeight / 2  → snap to 0   (show full hero)
 *  - scrollTop ≥ heroHeight / 2  → snap to heroHeight (show next section)
 *  - scrollTop ≥ heroHeight       → no action (free scroll)
 *
 * Uses a debounced scroll listener instead of CSS scroll-snap so that
 * all sections below the hero retain natural, unsnapped scrolling.
 */
export function useMobileHeroSnap() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const container = document.querySelector('.snap-scroll') as HTMLElement | null;
    const hero = document.querySelector('.hero-page') as HTMLElement | null;

    if (!container || !hero) return;

    const handleScroll = () => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        if (window.innerWidth > MOBILE_BREAKPOINT) return;

        const scrollTop = container.scrollTop;
        const heroHeight = hero.offsetHeight;

        if (scrollTop <= 0 || scrollTop >= heroHeight) return;

        const snapTo = scrollTop < heroHeight / 2 ? 0 : heroHeight;
        container.scrollTo({ top: snapTo, behavior: 'smooth' });
      }, DEBOUNCE_MS);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timerRef.current);
    };
  }, []);
}
