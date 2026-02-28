import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scroll on a given scroll container.
 * Respects prefers-reduced-motion.
 */
export function useSmoothScroll(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {return;}

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {return;}

    const lenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - 2**(-10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [containerRef]);

  return lenisRef;
}
