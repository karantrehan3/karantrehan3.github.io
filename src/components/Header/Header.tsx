import { IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect, ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Group, Burger, Drawer, Menu, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import config from "@/utils/Config";
import classes from "./Header.module.css";

interface Link {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}

const links: Link[] = [
  { link: "/home", label: "Home" },
  ...(config.get("HEADER.LINKS") || []),
];

export function Header(): ReactElement {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string>(links[0].link);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = links.find((link) => link.link === currentPath);
    if (activeLink) {
      setActive(activeLink.link);
    }
  }, [location]);

  const items = links.map((link) => {
    if (!link.links?.length) {
      return (
        <a
          key={link.label}
          href={link.link}
          className={classes.link}
          data-active={active === link.link || undefined}
          onClick={(event) => {
            event.preventDefault();
            navigate(link.link);
            close();
          }}
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
            onClick={(event) => {
              event.preventDefault();
              navigate(link.link);
              close();
            }}
          >
            <Center>
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Center>
          </a>
        </Menu.Target>
        <Menu.Dropdown>
          {link.links.map((item) => (
            <Menu.Item
              key={item.link}
              onClick={(event) => {
                event.preventDefault();
                window.open(item.link, "_self");
                close();
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  });

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
          <Group>
            {items}
            <ThemeToggle />
          </Group>
        </Drawer>
      </Container>
    </header>
  );
}
