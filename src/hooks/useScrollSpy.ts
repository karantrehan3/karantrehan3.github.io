import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  threshold?: number;
}

export const useScrollSpy = ({
  sectionIds,
  offset = 0,
  threshold = 0.1,
}: UseScrollSpyOptions): string => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionElements: Element[] = [];
    const sectionIntersections: Map<string, number> = new Map<string, number>();

    // Create intersection observer for each section
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) {
        return;
      }

      sectionElements.push(element);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;

            if (entry.isIntersecting) {
              // Store the intersection ratio for this section
              sectionIntersections.set(sectionId, entry.intersectionRatio);
            } else {
              // Remove from map when not intersecting
              sectionIntersections.delete(sectionId);
            }

            // Find the section with the highest intersection ratio
            let maxRatio = 0;
            let mostVisibleSection = "";

            sectionIntersections.forEach((ratio, id) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisibleSection = id;
              }
            });

            // Update active section if we found one with intersection
            if (mostVisibleSection && maxRatio > 0.1) {
              setActiveSection(mostVisibleSection);
            }
          });
        },
        {
          rootMargin: `-${offset}px 0px -${offset}px 0px`,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // More granular thresholds
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Cleanup function
    return () => {
      observers.forEach((observer, index) => {
        observer.unobserve(sectionElements[index]);
        observer.disconnect();
      });
    };
  }, [sectionIds, offset, threshold]);

  return activeSection;
};
