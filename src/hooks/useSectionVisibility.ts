import { useEffect, useRef, useState } from "react";

interface UseSectionVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

/**
 * Hook to detect when a section is visible in the viewport
 * Returns true when the section is intersecting with the viewport
 */
export const useSectionVisibility = (
  options: UseSectionVisibilityOptions = {}
): [boolean, React.RefObject<HTMLDivElement>] => {
  const {
    threshold = 0.2,
    rootMargin = "-10% 0px -10% 0px",
    enabled = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, enabled]);

  return [isVisible, sectionRef];
};
