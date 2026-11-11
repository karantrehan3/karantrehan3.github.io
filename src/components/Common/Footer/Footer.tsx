import { ReactElement, useEffect, useRef, useState } from "react";
import { Anchor, Group, Text } from "@mantine/core";

import { Icon, ShareDialog } from "@/components/Common";
import config from "@/utils/Config";

import classes from "./Footer.module.css";

export function Footer(): ReactElement {
  const [dialogOpened, setDialogOpened] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Publish the pinned footer's live height so the page can pad for it and
  // sections can size to the space between the header and the footer.
  useEffect(() => {
    const footer = footerRef.current;
    const root = document.documentElement;
    if (!footer || typeof ResizeObserver === "undefined") {
      return undefined;
    }
    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty(
        "--footer-height",
        `${Math.ceil(entry.borderBoxSize?.[0]?.blockSize ?? footer.offsetHeight)}px`
      );
    });
    observer.observe(footer);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--footer-height");
    };
  }, []);

  const handleShareClick = (): void => {
    setDialogOpened(true);
  };

  return (
    <>
      <footer ref={footerRef} className={classes.footer}>
        <Group gap="xs" justify="center" wrap="wrap">
          <Text className={classes.footer__copyright}>
            &copy; {config.get("HOME.TITLE.NAME")}, {new Date().getFullYear()}
          </Text>
          <Text className={classes.footer__separator}>•</Text>
          <Anchor
            href="#"
            className={classes.footer__link}
            onClick={(e) => {
              e.preventDefault();
              handleShareClick();
            }}
          >
            <Icon name="IconShare" size={16} />
            {config.get("CTAS.SHARE.BUTTON_TEXT")}
          </Anchor>
          <Text className={classes.footer__separator}>•</Text>
          <Anchor href="#/privacy" className={classes.footer__link}>
            <Icon name="IconShieldCheck" size={16} />
            Privacy Policy
          </Anchor>
        </Group>
      </footer>

      <ShareDialog
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
      />
    </>
  );
}
