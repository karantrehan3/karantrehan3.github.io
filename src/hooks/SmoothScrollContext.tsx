import { createContext, FC, ReactNode, useContext, useRef } from "react";

import { useSmoothScroll } from "./useSmoothScroll";

interface SmoothScrollContextValue {
  scrollTo: (target: string, options?: { offset?: number }) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  contentRef: { current: null },
});

export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: FC<SmoothScrollProviderProps> = ({
  children,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useSmoothScroll(contentRef);

  const scrollTo = (target: string, options?: { offset?: number }) => {
    const lenis = lenisRef.current;
    const container = contentRef.current;

    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? -60 });
    } else if (container) {
      const el = container.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, contentRef }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
