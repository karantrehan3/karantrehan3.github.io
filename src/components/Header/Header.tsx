import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import classes from "./Header.module.css";

const links = [
  { link: "/home", label: "Home" },
  { link: "/about", label: "About Me" },
  { link: "/projects", label: "Projects" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

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
      </Container>
    </header>
  );
}
