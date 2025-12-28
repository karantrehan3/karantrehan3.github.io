// Shared type definitions for Privacy components

export interface ListItemWithLabel {
  LABEL: string;
  DESCRIPTION: string;
  LINK?: string;
  LINK_TEXT?: string;
}

export interface SectionConfig {
  TITLE: string;
  CONTENT?: string;
  INTRO?: string;
  ITEMS?: (string | ListItemWithLabel)[];
  BUTTON_TEXT?: string;
  BUTTON_DESCRIPTION?: string;
}

export interface TableOfContentsItem {
  title: string;
  id: string;
}
