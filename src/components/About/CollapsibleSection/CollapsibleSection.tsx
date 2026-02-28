import {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ActionIcon, Collapse, Group, Paper, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";

import Icon from "@/components/Common/Icons";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

import classes from "./CollapsibleSection.module.css";

interface CollapsibleSectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  enableScrollAutoExpand?: boolean;
  icon?: string;
  customHeader?: ReactNode;
}

export function CollapsibleSection({
  id,
  title,
  children,
  defaultExpanded = false,
  enableScrollAutoExpand = true,
  icon,
  customHeader,
}: CollapsibleSectionProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [lastManualToggle, setLastManualToggle] = useState<number | null>(null);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
  const [isVisible, sectionRef] = useSectionVisibility({
    threshold: 0.4,
    rootMargin: "-25% 0px -25% 0px",
    enabled: enableScrollAutoExpand,
  });

  useEffect(() => {
    if (enableScrollAutoExpand && isVisible && !hasAutoExpanded) {
      const timeSinceLastToggle = lastManualToggle
        ? Date.now() - lastManualToggle
        : Infinity;

      if (timeSinceLastToggle > 3000) {
        setIsExpanded(true);
        setHasAutoExpanded(true);
      }
    }
  }, [isVisible, enableScrollAutoExpand, lastManualToggle, hasAutoExpanded]);

  const handleToggle = (): void => {
    setLastManualToggle(Date.now());
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      className={clsx(classes.collapsibleSection, {
        [classes.expanded]: isExpanded,
      })}
    >
      <Paper
        className={classes.sectionHeader}
        p={customHeader ? "lg" : "xl"}
        radius="md"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={handleKeyDown}
      >
        <Group justify="space-between" className={classes.headerGroup}>
          {customHeader ? (
            <>
              <div style={{ flex: 1, width: "100%" }}>{customHeader}</div>
              <ActionIcon
                variant="subtle"
                size="lg"
                className={clsx(classes.toggleIcon, {
                  [classes.expanded]: isExpanded,
                })}
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                tabIndex={-1}
              >
                <IconChevronDown size={20} />
              </ActionIcon>
            </>
          ) : (
            <>
              <Group gap="sm">
                {icon && <Icon name={icon as any} size={24} />}
                <Title order={3} className={classes.sectionTitle}>
                  {title}
                </Title>
              </Group>
              <ActionIcon
                variant="subtle"
                size="lg"
                className={clsx(classes.toggleIcon, {
                  [classes.expanded]: isExpanded,
                })}
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
                tabIndex={-1}
              >
                <IconChevronDown size={20} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Paper>
      <Collapse in={isExpanded} transitionDuration={400}>
        <div className={classes.sectionContent}>{children}</div>
      </Collapse>
    </div>
  );
}
