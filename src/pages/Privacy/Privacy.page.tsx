import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Anchor, Box, Container, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  ConsentStatus,
  ContentHeader,
  getConsentStatus,
  PrivacyHeader,
  PrivacySection,
  ScrollToTopButton,
  TableOfContentsItem,
  TocDrawer,
  TocSidebar,
  UnifiedSection,
} from "@/components";
import config from "@/utils/Config";
import Constants from "@/utils/Constants";

import classes from "./Privacy.module.css";

function PrivacyPageComponent(): ReactElement {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(
    Constants.CONSENT_STATUS_PENDING
  );
  const [tocOpened, { open: openToc, close: closeToc }] = useDisclosure(false);

  const configValues = useMemo(
    () => ({
      lastUpdated: config.get("PRIVACY.LAST_UPDATED"),
      effectiveDate: config.get("PRIVACY.EFFECTIVE_DATE"),
      pageTitle: config.get("PRIVACY.TITLE"),
      backButton: config.get("PRIVACY.BACK_BUTTON"),
      scrollTopThreshold: config.get(
        "PRIVACY.SCROLL.SCROLL_TOP_THRESHOLD"
      ) as number,
      hashNavigationTimeout: config.get(
        "PRIVACY.SCROLL.HASH_NAVIGATION_TIMEOUT"
      ) as number,
      sections: config.get("PRIVACY.SECTIONS") as PrivacySection[],
    }),
    []
  );

  const getSectionId = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }, []);

  const handleScrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });

        // Update URL hash properly - preserve #/privacy if present
        const currentHash = window.location.hash;
        if (currentHash.includes("#/privacy")) {
          window.history.pushState(null, "", `#/privacy#${id}`);
        } else if (currentHash.startsWith("#/")) {
          window.history.pushState(null, "", `${currentHash}#${id}`);
        } else {
          window.history.pushState(null, "", `#${id}`);
        }
      }
      closeToc();
    },
    [closeToc]
  );

  const handleResetConsent = useCallback((): void => {
    localStorage.removeItem(Constants.CONSENT_KEY);
    // Set flag to show banner immediately after reload
    localStorage.setItem(Constants.SHOW_COOKIE_BANNER_FLAG, "true");
    setConsentStatus(Constants.CONSENT_STATUS_PENDING);
    // Clear section hash to prevent unwanted scroll on reload
    window.history.replaceState(null, "", "#/privacy");
    window.location.reload();
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > configValues.scrollTopThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [configValues.scrollTopThreshold]);

  useEffect(() => {
    setConsentStatus(getConsentStatus());

    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === Constants.CONSENT_KEY) {
        setConsentStatus(getConsentStatus());
      }
    };

    const handleConsentChange = (): void => {
      setConsentStatus(getConsentStatus());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("consentChanged", handleConsentChange);

    const handleHashNavigation = (): void => {
      const hash = window.location.hash;
      if (hash && hash.includes("#")) {
        const sectionId = hash.split("#").pop();
        if (sectionId) {
          setTimeout(() => {
            handleScrollToSection(sectionId);
          }, configValues.hashNavigationTimeout);
        }
      }
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("consentChanged", handleConsentChange);
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [handleScrollToSection, configValues.hashNavigationTimeout]);

  const tableOfContents: TableOfContentsItem[] = useMemo(
    () =>
      configValues.sections.map((section) => ({
        title: section.title,
        id: getSectionId(section.title),
      })),
    [configValues.sections, getSectionId]
  );

  return (
    <Box className={classes.privacy}>
      <Anchor
        href="#privacy-main-content"
        className={classes.privacy__skipLink}
      >
        Skip to main content
      </Anchor>

      <PrivacyHeader
        backButtonText={configValues.backButton}
        tocOpened={tocOpened}
        onTocOpen={openToc}
      />

      <Box className={classes.privacy__contentWrapper}>
        <TocSidebar
          items={tableOfContents}
          onSectionClick={handleScrollToSection}
        />

        <Container size="md" className={classes.privacy__container}>
          <main id="privacy-main-content" className={classes.privacy__card}>
            <ContentHeader
              title={configValues.pageTitle}
              effectiveDate={configValues.effectiveDate}
              lastUpdated={configValues.lastUpdated}
            />

            {configValues.sections.map((section, index) => (
              <div key={getSectionId(section.title)}>
                <UnifiedSection
                  section={section}
                  getSectionId={getSectionId}
                  onSectionClick={handleScrollToSection}
                  consentStatus={consentStatus}
                  buttonHandlers={{
                    resetConsent: handleResetConsent,
                  }}
                />
                {index < configValues.sections.length - 1 && (
                  <Divider my="lg" className={classes.privacy__divider} />
                )}
              </div>
            ))}
          </main>
        </Container>
      </Box>

      <TocDrawer
        opened={tocOpened}
        onClose={closeToc}
        items={tableOfContents}
        onSectionClick={handleScrollToSection}
      />

      <ScrollToTopButton visible={showScrollTop} />
    </Box>
  );
}

export const PrivacyPage = memo(PrivacyPageComponent);
