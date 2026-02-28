import { createContext, FC, ReactNode, useContext } from "react";

import { useSmoothScroll } from "./useSmoothScroll";

interface SmoothScrollContextValue {
  scrollTo: (target: string, options?: { offset?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});

export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: FC<SmoothScrollProviderProps> = ({
  children,
}) => {
  const lenisRef = useSmoothScroll();

  const scrollTo = (target: string, options?: { offset?: number }) => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? -60 });
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
