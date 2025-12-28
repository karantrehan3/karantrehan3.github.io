import { ReactElement, useEffect, useState } from "react";
import {
  Burger,
  Center,
  Container,
  Drawer,
  Group,
  Image,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";
import helpers from "@/utils/Helpers";

import classes from "./CommonHeader.module.css";

interface Link {
  link: string;
  label: string;
  hidden?: boolean;
  links?: {
    link: string;
    label: string;
    hidden?: boolean;
    iconSource?: string;
    iconAlt?: string;
  }[];
}

const links: Link[] = [
  { link: "#home", label: "Home" },
  ...(config.get("HEADER.LINKS") || []),
];

export function CommonHeader(): ReactElement {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  // Get section IDs from navigation links using helper function (DRY)
  const sectionIds = helpers.getSectionIdsFromLinks(links);

  // Use scroll spy hook for automatic navigation highlighting
  const activeSection = useScrollSpy({
    sectionIds,
    offset: 80, // Reduced offset for better detection
    threshold: 0.1,
  });

  // Set active link based on scroll position or location
  const [active, setActive] = useState<string>(links[0].link);

  useEffect(() => {
    if (activeSection) {
      setActive(`#${activeSection}`);
    } else {
      // Fallback to location-based active state
      const currentPath = location.pathname;
      const activeLink = links.find((link) => link.link === currentPath);
      if (activeLink) {
        setActive(activeLink.link);
      }
    }
  }, [activeSection, location]);

  const handleHeaderClick = (event: any, link: string, label: string): void => {
    event.preventDefault();

    // Track navigation click
    const isExternal = link.startsWith("http");
    analytics.trackNavigationClick(link, label, isExternal);

    if (!isExternal) {
      const section = document.querySelector(link);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    close();
  };

  const handleLogoClick = (): void => {
    analytics.trackNavigationClick("#home", "Logo");
    const homeSection = document.querySelector("#home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = links
    .map((link) => {
      if (link.hidden) {
        // Hide link if the page is made hidden
        return null;
      }

      if (!link.links?.length) {
        return (
          <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event): void =>
              handleHeaderClick(event, link.link, link.label)
            }
          >
            {link.label}
          </a>
        );
      }

      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              data-active={active === link.link || undefined}
              onClick={(event): void =>
                handleHeaderClick(event, link.link, link.label)
              }
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <Icon name="IconChevronDown" size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>
            {link.links
              .map((item) => {
                if (item.hidden) {
                  // Hide sub-link if the item is made hidden
                  return null;
                }
                return (
                  <Menu.Item
                    key={item.link}
                    onClick={(event) => {
                      event.preventDefault();
                      analytics.trackNavigationClick(
                        item.link,
                        item.label,
                        true
                      );
                      window.open(item.link, "_self");
                      close();
                    }}
                  >
                    <div className={classes.subLabel}>
                      {item.iconSource && (
                        <Image
                          src={item.iconSource}
                          alt={item.iconAlt || `${item.label} icon`}
                          className={classes.icon}
                        />
                      )}
                      {item.label}
                    </div>
                  </Menu.Item>
                );
              })
              .filter(Boolean)}
          </Menu.Dropdown>
        </Menu>
      );
    })
    .filter(Boolean);

  return (
    <header className={classes.header}>
      <Container size="xxl" className={classes.inner}>
        <Group visibleFrom="xs" className={classes.wrapper}>
          {/* Logo on the left */}
          <Group className={classes.logo}>
            <Image
              src={config.get(
                `HEADER.LOGO.${colorScheme === "dark" ? "DARK" : "LIGHT"}`
              )}
              alt={config.get(
                `HEADER.LOGO_ALT.${colorScheme === "dark" ? "DARK" : "LIGHT"}`
              )}
              className={classes.logoImage}
              onClick={handleLogoClick}
            />
          </Group>

          <Group gap={5} visibleFrom="xs" className={classes.center}>
            {items}
          </Group>
          <Group visibleFrom="xs" className={classes.right}>
            <ThemeToggle />
          </Group>
        </Group>
        {/* Mobile: Burger left, Logo center, Theme Toggle right */}
        <Group hiddenFrom="xs" className={classes.mobileWrapper}>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            className={classes.mobileBurger}
          />
          <div className={classes.mobileLogo}>
            <Image
              src={config.get(
                `HEADER.LOGO.${colorScheme === "dark" ? "DARK" : "LIGHT"}`
              )}
              alt={config.get(
                `HEADER.LOGO_ALT.${colorScheme === "dark" ? "DARK" : "LIGHT"}`
              )}
              className={classes.logoImage}
              onClick={handleLogoClick}
            />
          </div>
          <div className={classes.mobileThemeToggle}>
            <ThemeToggle />
          </div>
        </Group>

        <Drawer opened={opened} onClose={close} hiddenFrom="xs" padding="md">
          <Group className={classes.drawer}>{items}</Group>
        </Drawer>
      </Container>
    </header>
  );
}
