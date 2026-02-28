import { useEffect } from "react";

/**
 * Sets --spotlight-x and --spotlight-y CSS variables on the container
 * based on mouse position. Disabled on touch devices and reduced motion.
 */
export function useCursorSpotlight(
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {return;}

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    if (prefersReducedMotion || isTouch) {return;}

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--spotlight-x", `${x}px`);
      container.style.setProperty("--spotlight-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);
}
