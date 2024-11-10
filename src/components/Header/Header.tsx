import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Group, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import classes from "./Header.module.css";

const links = [
  { link: "/home", label: "Home" },
  { link: "/about", label: "About Me" },
  { link: "/projects", label: "Projects" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const navigate = useNavigate();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
        close();
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
