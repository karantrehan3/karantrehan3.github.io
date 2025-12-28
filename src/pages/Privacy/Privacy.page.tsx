import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  ConsentStatus,
  getConsentStatus,
} from "@/components/Common/CookieConsent";
import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
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

  const handleBackClick = useCallback((): void => {
    window.location.hash = "/";
  }, []);

  const handleScrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  // Memoize placeholder replacement function
  const replacePlaceholders = useCallback(
    (text: string): string => {
      return text
        .replace("{OWNER_NAME}", configValues.ownerName)
        .replace("{OWNER_EMAIL}", configValues.ownerEmail);
    },
    [configValues.ownerName, configValues.ownerEmail]
  );

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
          <Box
            component="span"
            className={classes["privacy__section-title-wrapper"]}
          >
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
          </Box>
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
          <Box
            component="span"
            className={classes["privacy__section-title-wrapper"]}
          >
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
          </Box>
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
          <Box
            component="span"
            className={classes["privacy__section-title-wrapper"]}
          >
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
          </Box>
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
              <Text component="span">
                <Text component="strong" fw={600} span>
                  {item.LABEL}:
                </Text>{" "}
                {item.DESCRIPTION}
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
              </Text>
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
        ? configValues.consentStatusLabels.GRANTED
        : consentStatus === Constants.CONSENT_STATUS_DENIED
          ? configValues.consentStatusLabels.DENIED
          : configValues.consentStatusLabels.PENDING;
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
          <Box
            component="span"
            className={classes["privacy__section-title-wrapper"]}
          >
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
          </Box>
        </Title>
        <Text mb="md" className={classes["privacy__section-text"]}>
          {section.INTRO} Your current preference is:{" "}
          <Text
            component="span"
            fw={600}
            className={`${classes["privacy__consent-status"]} ${
              classes[`privacy__consent-status--${consentStatus}`]
            }`}
          >
            {currentStatus}
          </Text>
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
    const emailParts = content.split(configValues.ownerEmail);
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
          <Box
            component="span"
            className={classes["privacy__section-title-wrapper"]}
          >
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
          </Box>
        </Title>
        <Text className={classes["privacy__section-text"]}>
          {emailParts[0]}
          <Anchor
            href={`mailto:${configValues.ownerEmail}`}
            aria-label={`Send email to ${configValues.ownerEmail}`}
          >
            {configValues.ownerEmail}
          </Anchor>
          {emailParts[1]}
        </Text>
      </section>
    );
  };

  // Memoize table of contents generation
  const tableOfContents = useMemo(
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
                <Box
                  component="span"
                  className={classes["privacy__backButton-icon"]}
                >
                  <Icon name="IconArrowLeft" size={16} />
                </Box>
              }
              onClick={handleBackClick}
              aria-label={configValues.backButton}
            >
              <Text
                component="span"
                className={classes["privacy__backButton-text"]}
              >
                {configValues.backButton}
              </Text>
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
                <Box
                  component="span"
                  className={classes["privacy__backButton-icon"]}
                >
                  <Icon name="IconArrowLeft" size={16} />
                </Box>
              }
              onClick={handleBackClick}
              aria-label={configValues.backButton}
            >
              <Text
                component="span"
                className={classes["privacy__backButton-text"]}
              >
                {configValues.backButton}
              </Text>
            </Button>
            <ThemeToggle />
          </Group>
        </Container>
      </nav>

      <Box className={classes.privacy__contentWrapper}>
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
                {configValues.pageTitle}
              </Title>
              <Stack gap="xs" className={classes.privacy__dates}>
                {configValues.effectiveDate && (
                  <Text size="sm" c="dimmed" aria-label="Effective date">
                    Effective: {configValues.effectiveDate}
                  </Text>
                )}
                {configValues.lastUpdated &&
                  configValues.effectiveDate !== configValues.lastUpdated && (
                    <Text size="sm" c="dimmed" aria-label="Last updated date">
                      Last updated: {configValues.lastUpdated}
                    </Text>
                  )}
                {configValues.lastUpdated && !configValues.effectiveDate && (
                  <Text size="sm" c="dimmed" aria-label="Last updated date">
                    Last updated: {configValues.lastUpdated}
                  </Text>
                )}
              </Stack>
            </header>

            {renderSimpleSection(configValues.sections.INTRODUCTION)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(
              configValues.sections.INFORMATION_COLLECTED
            )}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleListSection(configValues.sections.NOT_COLLECTED)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(configValues.sections.COOKIES)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleSection(configValues.sections.DATA_RETENTION)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(configValues.sections.THIRD_PARTY)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderLabeledListSection(configValues.sections.YOUR_RIGHTS)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderConsentManagementSection(
              configValues.sections.COOKIE_PREFERENCES
            )}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderSimpleSection(configValues.sections.POLICY_CHANGES)}

            <Divider my="lg" className={classes.privacy__divider} />

            {renderContactSection(configValues.sections.CONTACT)}
          </main>
        </Container>
      </Box>

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
    </Box>
  );
}

export const PrivacyPage = memo(PrivacyPageComponent);
