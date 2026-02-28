import { memo, ReactElement, useCallback } from "react";
import { Button } from "@mantine/core";

import { Icon } from "@/components";

import classes from "./ScrollToTopButton.module.css";

interface ScrollToTopButtonProps {
  visible: boolean;
  onScrollToTop?: () => void;
}

function ScrollToTopButtonComponent({
  visible,
  onScrollToTop,
}: ScrollToTopButtonProps): ReactElement | null {
  const handleScrollToTop = useCallback((): void => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [onScrollToTop]);

  if (!visible) {
    return null;
  }

  return (
    <Button
      className={classes["scroll-to-top"]}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <Icon name="IconArrowUp" size={20} />
    </Button>
  );
}

export const ScrollToTopButton = memo(ScrollToTopButtonComponent);
