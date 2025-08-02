import { IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Menu,
  Center,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import config from "@/utils/Config";
import classes from "./Header.module.css";

interface Link {
  link: string;
  label: string;
  hidden?: boolean;
  links?: {
    link: string;
    label: string;
    hidden?: boolean;
    iconSource?: string;
  }[];
}

const links: Link[] = [
  { link: "#home", label: "Home" },
  ...(config.get("HEADER.LINKS") || []),
];

export function Header(): ReactElement {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string>(links[0].link);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = links.find((link) => link.link === currentPath);
    if (activeLink) {
      setActive(activeLink.link);
    }
  }, [location]);

  const handleHeaderClick = (event: any, link: string): void => {
    event.preventDefault();
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    close();
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
            onClick={(event): void => handleHeaderClick(event, link.link)}
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
              onClick={(event): void => handleHeaderClick(event, link.link)}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
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
                      window.open(item.link, "_self");
                      close();
                    }}
                  >
                    <div className={classes.subLabel}>
                      {item.iconSource && (
                        <Image src={item.iconSource} className={classes.icon} />
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
          <Group gap={5} visibleFrom="xs" className={classes.center}>
            {items}
          </Group>
          <Group visibleFrom="xs" className={classes.right}>
            <ThemeToggle />
          </Group>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Drawer opened={opened} onClose={close} hiddenFrom="xs" padding="md">
          <Group className={classes.drawer}>{items}</Group>
        </Drawer>
        <Group hiddenFrom="xs" className={classes.right}>
          <ThemeToggle />
        </Group>
      </Container>
    </header>
  );
}
