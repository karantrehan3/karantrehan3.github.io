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

import { ConsentStatus } from "@/components/Common/CookieConsent";
import {
  ConsentManagementSection,
  ContactSection,
  getConsentStatus,
  LabeledListSection,
  Navigation,
  PageHeader,
  ScrollToTopButton,
  SectionConfig,
  Sidebar,
  SimpleListSection,
  SimpleSection,
  TableOfContentsItem,
  TocDrawer,
} from "@/components/Privacy";
import config from "@/utils/Config";
import Constants from "@/utils/Constants";

import classes from "./Privacy.module.css";

function PrivacyPageComponent(): ReactElement {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(
    Constants.CONSENT_STATUS_PENDING
  );
  const [tocOpened, { open: openToc, close: closeToc }] = useDisclosure(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Memoize config values to avoid repeated lookups
  const configValues = useMemo(
    () => ({
      lastUpdated: config.get("PRIVACY.LAST_UPDATED"),
      effectiveDate: config.get("PRIVACY.EFFECTIVE_DATE"),
      pageTitle: config.get("PRIVACY.TITLE"),
      backButton: config.get("PRIVACY.BACK_BUTTON"),
      ownerName: config.get("META.TITLE"),
      ownerEmail: config.get("SOCIALS.EMAIL.ID"),
      scrollTopThreshold: config.get(
        "PRIVACY.SCROLL.SCROLL_TOP_THRESHOLD"
      ) as number,
      hashNavigationTimeout: config.get(
        "PRIVACY.SCROLL.HASH_NAVIGATION_TIMEOUT"
      ) as number,
      consentStatusLabels: config.get("PRIVACY.CONSENT_STATUS_LABELS") as {
        GRANTED: string;
        DENIED: string;
        PENDING: string;
      },
      sectionOrder: config.get("PRIVACY.SECTION_ORDER") as string[],
      sections: config.get("PRIVACY.SECTIONS") as Record<string, SectionConfig>,
    }),
    []
  );

  // Memoize section ID generator
  const getSectionId = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }, []);

  // Handle scroll to section
  const handleScrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        // Set active section for highlighting
        setActiveSection(id);

        // Simple smooth scroll to section
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
    // Remove consent from localStorage to reset it
    localStorage.removeItem(Constants.CONSENT_KEY);
    // Set flag to show banner immediately after reload
    localStorage.setItem(Constants.SHOW_COOKIE_BANNER_FLAG, "true");
    setConsentStatus(Constants.CONSENT_STATUS_PENDING);
    // Clear section hash to prevent unwanted scroll on reload
    // Preserve the base route (#/privacy) but remove any section hash
    window.history.replaceState(null, "", "#/privacy");
    // Reload page to show cookie banner again
    window.location.reload();
  }, []);

  // Memoize placeholder replacement function
  const replacePlaceholders = useCallback(
    (text: string): string => {
      return text
        .replace("{OWNER_NAME}", configValues.ownerName)
        .replace("{OWNER_EMAIL}", configValues.ownerEmail);
    },
    [configValues.ownerName, configValues.ownerEmail]
  );

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > configValues.scrollTopThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [configValues.scrollTopThreshold]);

  useEffect(() => {
    // Get current consent status
    setConsentStatus(getConsentStatus());

    // Listen for storage changes to update consent status
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === Constants.CONSENT_KEY) {
        setConsentStatus(getConsentStatus());
      }
    };

    // Listen for custom event from CookieConsent component
    const handleConsentChange = (): void => {
      setConsentStatus(getConsentStatus());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("consentChanged", handleConsentChange);

    // Handle initial hash navigation if present
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

  // Memoize table of contents generation
  const tableOfContents: TableOfContentsItem[] = useMemo(
    () =>
      configValues.sectionOrder.map((key) => ({
        title: configValues.sections[key].TITLE,
        id: getSectionId(configValues.sections[key].TITLE),
      })),
    [configValues.sectionOrder, configValues.sections, getSectionId]
  );

  return (
    <Box className={classes.privacy}>
      {/* Skip to main content link for accessibility */}
      <Anchor
        href="#privacy-main-content"
        className={classes.privacy__skipLink}
      >
        Skip to main content
      </Anchor>

      {/* Header with back button and theme toggle */}
      <Navigation
        backButtonText={configValues.backButton}
        tocOpened={tocOpened}
        onTocOpen={openToc}
      />

      <Box className={classes.privacy__contentWrapper}>
        {/* Desktop Table of Contents Sidebar */}
        <Sidebar
          items={tableOfContents}
          activeSection={activeSection}
          onSectionClick={handleScrollToSection}
        />

        <Container size="md" className={classes.privacy__container}>
          <main id="privacy-main-content" className={classes.privacy__card}>
            <PageHeader
              title={configValues.pageTitle}
              effectiveDate={configValues.effectiveDate}
              lastUpdated={configValues.lastUpdated}
            />

            <SimpleSection
              section={configValues.sections.INTRODUCTION}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
              replacePlaceholders={replacePlaceholders}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <LabeledListSection
              section={configValues.sections.INFORMATION_COLLECTED}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <SimpleListSection
              section={configValues.sections.NOT_COLLECTED}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <LabeledListSection
              section={configValues.sections.COOKIES}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <SimpleSection
              section={configValues.sections.DATA_RETENTION}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
              replacePlaceholders={replacePlaceholders}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <LabeledListSection
              section={configValues.sections.THIRD_PARTY}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <LabeledListSection
              section={configValues.sections.YOUR_RIGHTS}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <ConsentManagementSection
              section={configValues.sections.COOKIE_PREFERENCES}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
              consentStatus={consentStatus}
              consentStatusLabels={configValues.consentStatusLabels}
              onResetConsent={handleResetConsent}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <SimpleSection
              section={configValues.sections.POLICY_CHANGES}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
              replacePlaceholders={replacePlaceholders}
            />

            <Divider my="lg" className={classes.privacy__divider} />

            <ContactSection
              section={configValues.sections.CONTACT}
              getSectionId={getSectionId}
              onSectionClick={handleScrollToSection}
              ownerEmail={configValues.ownerEmail}
              replacePlaceholders={replacePlaceholders}
            />
          </main>
        </Container>
      </Box>

      {/* Table of Contents Drawer */}
      <TocDrawer
        opened={tocOpened}
        onClose={closeToc}
        items={tableOfContents}
        activeSection={activeSection}
        onSectionClick={handleScrollToSection}
      />

      {/* Scroll to top button */}
      <ScrollToTopButton visible={showScrollTop} />
    </Box>
  );
}

export const PrivacyPage = memo(PrivacyPageComponent);
