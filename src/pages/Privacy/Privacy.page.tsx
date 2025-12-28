import { ReactElement } from "react";
import {
  Anchor,
  Button,
  Container,
  Divider,
  List,
  Text,
  Title,
} from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import config from "@/utils/Config";

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
}

export function PrivacyPage(): ReactElement {
  const handleBackClick = (): void => {
    window.location.hash = "/";
  };

  // Get config values
  const lastUpdated = config.get("PRIVACY.LAST_UPDATED");
  const pageTitle = config.get("PRIVACY.TITLE");
  const backButton = config.get("PRIVACY.BACK_BUTTON");
  const ownerName = config.get("META.TITLE");
  const ownerEmail = config.get("SOCIALS.EMAIL.ID");

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
  const renderSimpleSection = (section: SectionConfig): ReactElement => (
    <div className={classes.privacy__section}>
      <Title order={2} size="h3" className={classes["privacy__section-title"]}>
        {section.TITLE}
      </Title>
      <Text className={classes["privacy__section-text"]}>
        {replacePlaceholders(section.CONTENT || "")}
      </Text>
    </div>
  );

  // Render a section with intro and simple string items
  const renderSimpleListSection = (section: SectionConfig): ReactElement => (
    <div className={classes.privacy__section}>
      <Title order={2} size="h3" className={classes["privacy__section-title"]}>
        {section.TITLE}
      </Title>
      <Text mb="sm" className={classes["privacy__section-text"]}>
        {section.INTRO}
      </Text>
      <List spacing="xs" className={classes.privacy__list}>
        {(section.ITEMS as string[])?.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
    </div>
  );

  // Render a section with intro and labeled items
  const renderLabeledListSection = (section: SectionConfig): ReactElement => (
    <div className={classes.privacy__section}>
      <Title order={2} size="h3" className={classes["privacy__section-title"]}>
        {section.TITLE}
      </Title>
      <Text mb="sm" className={classes["privacy__section-text"]}>
        {section.INTRO}
      </Text>
      <List spacing="xs" className={classes.privacy__list}>
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
                >
                  {item.LINK_TEXT}
                </Anchor>
                )
              </>
            )}
          </List.Item>
        ))}
      </List>
    </div>
  );

  // Render contact section with email link
  const renderContactSection = (section: SectionConfig): ReactElement => {
    const content = replacePlaceholders(section.CONTENT || "");
    const emailParts = content.split(ownerEmail);

    return (
      <div className={classes.privacy__section}>
        <Title
          order={2}
          size="h3"
          className={classes["privacy__section-title"]}
        >
          {section.TITLE}
        </Title>
        <Text className={classes["privacy__section-text"]}>
          {emailParts[0]}
          <Anchor href={`mailto:${ownerEmail}`}>{ownerEmail}</Anchor>
          {emailParts[1]}
        </Text>
      </div>
    );
  };

  return (
    <div className={classes.privacy}>
      {/* Fixed header with back button and theme toggle */}
      <div className={classes.privacy__back}>
        <div className={classes["privacy__back-container"]}>
          <Button
            className={classes.privacy__backButton}
            variant="outline"
            leftSection={<Icon name="IconArrowLeft" size={16} />}
            onClick={handleBackClick}
          >
            {backButton}
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <Container size="md" className={classes.privacy__container}>
        <div className={classes.privacy__card}>
          <div className={classes.privacy__header}>
            <Title order={1} className={classes.privacy__title}>
              {pageTitle}
            </Title>
            {lastUpdated && (
              <Text size="sm" c="dimmed">
                Last updated: {lastUpdated}
              </Text>
            )}
          </div>

          {renderSimpleSection(sections.INTRODUCTION)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderLabeledListSection(sections.INFORMATION_COLLECTED)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderSimpleListSection(sections.NOT_COLLECTED)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderLabeledListSection(sections.COOKIES)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderLabeledListSection(sections.YOUR_RIGHTS)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderSimpleSection(sections.DATA_RETENTION)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderLabeledListSection(sections.THIRD_PARTY)}

          <Divider my="lg" className={classes.privacy__divider} />

          {renderContactSection(sections.CONTACT)}
        </div>
      </Container>
    </div>
  );
}
