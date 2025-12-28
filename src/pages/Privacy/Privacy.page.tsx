import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  Anchor,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  List,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { getConsentStatus } from "@/components/Common/CookieConsent";
import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import config from "@/utils/Config";
import Constants from "@/utils/Constants";

import classes from "./Privacy.module.css";

// Type definitions for config structure
interface ListItemWithLabel {
  LABEL: string;
  DESCRIPTION: string;
  LINK?: string;
  LINK_TEXT?: string;
}

interface SectionConfig {
  TITLE: string;
  CONTENT?: string;
  INTRO?: string;
  ITEMS?: (string | ListItemWithLabel)[];
  BUTTON_TEXT?: string;
  BUTTON_DESCRIPTION?: string;
}

export function PrivacyPage(): ReactElement {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [consentStatus, setConsentStatus] = useState<
    "granted" | "denied" | "pending"
  >(Constants.CONSENT_STATUS_PENDING);
  const [tocOpened, { open: openToc, close: closeToc }] = useDisclosure(false);

  // Get config values
  const lastUpdated = config.get("PRIVACY.LAST_UPDATED");
  const effectiveDate = config.get("PRIVACY.EFFECTIVE_DATE");
  const pageTitle = config.get("PRIVACY.TITLE");
  const backButton = config.get("PRIVACY.BACK_BUTTON");
  const ownerName = config.get("META.TITLE");
  const ownerEmail = config.get("SOCIALS.EMAIL.ID");
  const scrollTopThreshold = config.get(
    "PRIVACY.SCROLL.SCROLL_TOP_THRESHOLD"
  ) as number;
  const hashNavigationTimeout = config.get(
    "PRIVACY.SCROLL.HASH_NAVIGATION_TIMEOUT"
  ) as number;
  const consentStatusLabels = config.get("PRIVACY.CONSENT_STATUS_LABELS") as {
    GRANTED: string;
    DENIED: string;
    PENDING: string;
  };
  const sectionOrder = config.get("PRIVACY.SECTION_ORDER") as string[];

  const handleBackClick = (): void => {
    window.location.hash = "/";
  };

  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetConsent = (): void => {
    // Remove consent from localStorage to reset it
    const consentKey = config.get("ANALYTICS.CONSENT_KEY");
    localStorage.removeItem(consentKey);
    // Set flag to show banner immediately after reload
    localStorage.setItem("show-cookie-banner-immediately", "true");
    setConsentStatus(Constants.CONSENT_STATUS_PENDING);
    // Reload page to show cookie banner again
    window.location.reload();
  };

  // Generate section IDs for anchor links
  const getSectionId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Handle scroll to section
  const handleScrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

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

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > scrollTopThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTopThreshold]);

  useEffect(() => {
    // Get current consent status
    setConsentStatus(getConsentStatus());

    // Listen for storage changes to update consent status
    const handleStorageChange = (e: StorageEvent): void => {
      const consentKey = config.get("ANALYTICS.CONSENT_KEY");
      if (e.key === consentKey) {
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
          }, hashNavigationTimeout);
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
  }, [handleScrollToSection, hashNavigationTimeout]);

  // Helper to replace placeholders in text
  const replacePlaceholders = (text: string): string => {
    return text
      .replace("{OWNER_NAME}", ownerName)
      .replace("{OWNER_EMAIL}", ownerEmail);
  };

  // Get sections from config
  const sections = config.get("PRIVACY.SECTIONS") as Record<
    string,
    SectionConfig
  >;

  // Render a simple section with just content
  const renderSimpleSection = (section: SectionConfig): ReactElement => {
    const sectionId = getSectionId(section.TITLE);
    const titleId = `${sectionId}-title`;
    return (
      <section
        id={sectionId}
        className={classes.privacy__section}
        aria-labelledby={titleId}
      >
        <Title
          order={2}
          size="h3"
          id={titleId}
          className={classes["privacy__section-title"]}
        >
          <span className={classes["privacy__section-title-wrapper"]}>
            {section.TITLE}
            <Anchor
              href={`#${sectionId}`}
              className={classes["privacy__section-link"]}
              aria-label={`Link to ${section.TITLE}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(sectionId);
              }}
            >
              🔗
            </Anchor>
          </span>
        </Title>
        <Text className={classes["privacy__section-text"]}>
          {replacePlaceholders(section.CONTENT || "")}
        </Text>
      </section>
    );
  };

  // Render a section with intro and simple string items
  const renderSimpleListSection = (section: SectionConfig): ReactElement => {
    const sectionId = getSectionId(section.TITLE);
    const titleId = `${sectionId}-title`;
    return (
      <section
        id={sectionId}
        className={classes.privacy__section}
        aria-labelledby={titleId}
      >
        <Title
          order={2}
          size="h3"
          id={titleId}
          className={classes["privacy__section-title"]}
        >
          <span className={classes["privacy__section-title-wrapper"]}>
            {section.TITLE}
            <Anchor
              href={`#${sectionId}`}
              className={classes["privacy__section-link"]}
              aria-label={`Link to ${section.TITLE}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(sectionId);
              }}
            >
              🔗
            </Anchor>
          </span>
        </Title>
        <Text mb="sm" className={classes["privacy__section-text"]}>
          {section.INTRO}
        </Text>
        <List
          spacing="xs"
          className={classes.privacy__list}
          aria-label={`${section.TITLE} items`}
        >
          {(section.ITEMS as string[])?.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </section>
    );
  };

  // Render a section with intro and labeled items
  const renderLabeledListSection = (section: SectionConfig): ReactElement => {
    const sectionId = getSectionId(section.TITLE);
    const titleId = `${sectionId}-title`;
    return (
      <section
        id={sectionId}
        className={classes.privacy__section}
        aria-labelledby={titleId}
      >
        <Title
          order={2}
          size="h3"
          id={titleId}
          className={classes["privacy__section-title"]}
        >
          <span className={classes["privacy__section-title-wrapper"]}>
            {section.TITLE}
            <Anchor
              href={`#${sectionId}`}
              className={classes["privacy__section-link"]}
              aria-label={`Link to ${section.TITLE}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(sectionId);
              }}
            >
              🔗
            </Anchor>
          </span>
        </Title>
        <Text mb="sm" className={classes["privacy__section-text"]}>
          {section.INTRO}
        </Text>
        <List
          spacing="xs"
          className={classes.privacy__list}
          aria-label={`${section.TITLE} items`}
        >
          {(section.ITEMS as ListItemWithLabel[])?.map((item, index) => (
            <List.Item key={index}>
              <strong>{item.LABEL}:</strong> {item.DESCRIPTION}
              {item.LINK && (
                <>
                  {" "}
                  (
                  <Anchor
                    href={item.LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.LINK_TEXT} (opens in new tab)`}
                  >
                    {item.LINK_TEXT}
                  </Anchor>
                  )
                </>
              )}
            </List.Item>
          ))}
        </List>
      </section>
    );
  };

  // Render consent management section with dynamic content
  const renderConsentManagementSection = (
    section: SectionConfig
  ): ReactElement => {
    const currentStatus =
      consentStatus === Constants.CONSENT_STATUS_GRANTED
        ? consentStatusLabels.GRANTED
        : consentStatus === Constants.CONSENT_STATUS_DENIED
          ? consentStatusLabels.DENIED
          : consentStatusLabels.PENDING;
    const sectionId = getSectionId(section.TITLE);
    const titleId = `${sectionId}-title`;

    return (
      <section
        id={sectionId}
        className={classes.privacy__section}
        aria-labelledby={titleId}
      >
        <Title
          order={2}
          size="h3"
          id={titleId}
          className={classes["privacy__section-title"]}
        >
          <span className={classes["privacy__section-title-wrapper"]}>
            {section.TITLE}
            <Anchor
              href={`#${sectionId}`}
              className={classes["privacy__section-link"]}
              aria-label={`Link to ${section.TITLE}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(sectionId);
              }}
            >
              🔗
            </Anchor>
          </span>
        </Title>
        <Text mb="md" className={classes["privacy__section-text"]}>
          {section.INTRO} Your current preference is:{" "}
          <strong
            className={`${classes["privacy__consent-status"]} ${
              classes[`privacy__consent-status--${consentStatus}`]
            }`}
          >
            {currentStatus}
          </strong>
        </Text>
        <Button
          variant="outline"
          color="orange"
          onClick={handleResetConsent}
          leftSection={<Icon name="IconCookie" size={16} />}
          aria-label="Reset cookie consent preferences"
        >
          {section.BUTTON_TEXT}
        </Button>
        <Text
          size="sm"
          c="dimmed"
          mt="sm"
          className={classes["privacy__section-text"]}
        >
          {section.BUTTON_DESCRIPTION}
        </Text>
      </section>
    );
  };

  // Render contact section with email link
  const renderContactSection = (section: SectionConfig): ReactElement => {
    const content = replacePlaceholders(section.CONTENT || "");
    const emailParts = content.split(ownerEmail);
    const sectionId = getSectionId(section.TITLE);
    const titleId = `${sectionId}-title`;

    return (
      <section
        id={sectionId}
        className={classes.privacy__section}
        aria-labelledby={titleId}
      >
        <Title
          order={2}
          size="h3"
          id={titleId}
          className={classes["privacy__section-title"]}
        >
          <span className={classes["privacy__section-title-wrapper"]}>
            {section.TITLE}
            <Anchor
              href={`#${sectionId}`}
              className={classes["privacy__section-link"]}
              aria-label={`Link to ${section.TITLE}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(sectionId);
              }}
            >
              🔗
            </Anchor>
          </span>
        </Title>
        <Text className={classes["privacy__section-text"]}>
          {emailParts[0]}
          <Anchor
            href={`mailto:${ownerEmail}`}
            aria-label={`Send email to ${ownerEmail}`}
          >
            {ownerEmail}
          </Anchor>
          {emailParts[1]}
        </Text>
      </section>
    );
  };

  // Generate table of contents from sections in the correct order
  const tableOfContents = sectionOrder.map((key) => ({
    title: sections[key].TITLE,
    id: getSectionId(sections[key].TITLE),
  }));

  // Get section IDs for scroll spy
  const sectionIds = tableOfContents.map((item) => item.id);

  // Use scroll spy to track active section
  const activeSection = useScrollSpy({
    sectionIds,
    offset: 100,
    threshold: 0.1,
  });

  return (
    <div className={classes.privacy}>
      {/* Skip to main content link for accessibility */}
      <a href="#privacy-main-content" className={classes.privacy__skipLink}>
        Skip to main content
      </a>

      {/* Header with back button and theme toggle */}
      <nav
        className={classes.privacy__back}
        aria-label="Privacy page navigation"
      >
        <Container size="xxl" className={classes["privacy__back-container"]}>
          {/* Desktop: Back button and Theme toggle */}
          <Group visibleFrom="lg" className={classes["privacy__back-desktop"]}>
            <Button
              className={classes.privacy__backButton}
              variant="outline"
              color="orange"
              leftSection={
                <span className={classes["privacy__backButton-icon"]}>
                  <Icon name="IconArrowLeft" size={16} />
                </span>
              }
              onClick={handleBackClick}
              aria-label={backButton}
            >
              <span className={classes["privacy__backButton-text"]}>
                {backButton}
              </span>
            </Button>
            <ThemeToggle />
          </Group>

          {/* Mobile and Tablet: Burger, Back button, Theme toggle */}
          <Group hiddenFrom="lg" className={classes["privacy__back-mobile"]}>
            <Burger
              opened={tocOpened}
              onClick={openToc}
              size="sm"
              className={classes.privacy__burger}
              aria-label="Toggle table of contents"
            />
            <Button
              className={classes.privacy__backButton}
              variant="outline"
              color="orange"
              leftSection={
                <span className={classes["privacy__backButton-icon"]}>
                  <Icon name="IconArrowLeft" size={16} />
                </span>
              }
              onClick={handleBackClick}
              aria-label={backButton}
            >
              <span className={classes["privacy__backButton-text"]}>
                {backButton}
              </span>
            </Button>
            <ThemeToggle />
          </Group>
        </Container>
      </nav>

      <div className={classes.privacy__contentWrapper}>
        {/* Desktop Table of Contents Sidebar */}
        <aside
          className={classes.privacy__sidebar}
          aria-label="Table of contents"
        >
          <nav className={classes.privacy__sidebarNav}>
            <Title
              order={3}
              size="h4"
              className={classes.privacy__sidebarTitle}
            >
              Table of Contents
            </Title>
            <List spacing="xs" className={classes.privacy__tocList}>
              {tableOfContents.map((item) => (
                <List.Item key={item.id}>
                  <Anchor
                    href={`#${item.id}`}
                    className={classes.privacy__tocLink}
                    data-active={activeSection === item.id ? "" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection(item.id);
                    }}
                  >
                    {item.title}
                  </Anchor>
                </List.Item>
              ))}
            </List>
          </nav>
        </aside>

        <Container size="md" className={classes.privacy__container}>
          <main id="privacy-main-content" className={classes.privacy__card}>
            <header className={classes.privacy__header}>
              <Title order={1} className={classes.privacy__title}>
                {pageTitle}
              </Title>
              <div className={classes.privacy__dates}>
                {effectiveDate && (
                  <Text size="sm" c="dimmed" aria-label="Effective date">
                    Effective: {effectiveDate}
                  </Text>
                )}
                {lastUpdated && effectiveDate !== lastUpdated && (
                  <Text size="sm" c="dimmed" aria-label="Last updated date">
                    Last updated: {lastUpdated}
                  </Text>
                )}
                {lastUpdated && !effectiveDate && (
                  <Text size="sm" c="dimmed" aria-label="Last updated date">
                    Last updated: {lastUpdated}
                  </Text>
                )}
              </div>
            </header>

            {renderSimpleSection(sections.INTRODUCTION)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(sections.INFORMATION_COLLECTED)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleListSection(sections.NOT_COLLECTED)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(sections.COOKIES)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleSection(sections.DATA_RETENTION)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(sections.THIRD_PARTY)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(sections.YOUR_RIGHTS)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderConsentManagementSection(sections.COOKIE_PREFERENCES)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleSection(sections.POLICY_CHANGES)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderContactSection(sections.CONTACT)}
          </main>
        </Container>
      </div>

      {/* Table of Contents Drawer */}
      <Drawer
        opened={tocOpened}
        onClose={closeToc}
        title="Table of Contents"
        position="left"
        size="md"
        className={classes.privacy__drawer}
      >
        <List spacing="xs" className={classes.privacy__tocList}>
          {tableOfContents.map((item) => (
            <List.Item key={item.id}>
              <Anchor
                href={`#${item.id}`}
                className={classes.privacy__tocLink}
                data-active={activeSection === item.id ? "" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item.id);
                }}
              >
                {item.title}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Drawer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className={classes.privacy__scrollTop}
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <Icon name="IconArrowUp" size={20} />
        </Button>
      )}
    </div>
  );
}
