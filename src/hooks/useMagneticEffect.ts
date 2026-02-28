import { useCallback, useEffect, useRef } from "react";

/**
 * Magnetic hover effect — element subtly follows cursor when within proximity.
 * Disabled on touch devices and reduced motion.
 */
export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) {return;}

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const proximityZone = Math.max(rect.width, rect.height) * 1.5;

      if (distance < proximityZone) {
        const pull = 1 - distance / proximityZone;
        el.style.transform = `translate(${distX * strength * pull}px, ${distY * strength * pull}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transform = "translate(0, 0)";
      el.style.transition =
        "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      setTimeout(() => {
        if (el) {el.style.transition = "";}
      }, 400);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    if (prefersReducedMotion || isTouch) {return;}

    document.addEventListener("mousemove", handleMouseMove);
    const el = ref.current;
    if (el) {
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (el) {
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
