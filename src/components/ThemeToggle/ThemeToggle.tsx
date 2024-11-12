import React, { useEffect } from "react";
import {
  useMantineColorScheme,
  useMantineTheme,
  ActionIcon,
  MantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeToggle() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme, setColorScheme } =
    useMantineColorScheme();

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("mantine-color-scheme-value");
    if (savedColorScheme && ["light", "dark"].includes(savedColorScheme)) {
      setColorScheme(savedColorScheme as MantineColorScheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setColorScheme(prefersDarkScheme ? "dark" : "light");
    }
  }, [setColorScheme]);

  return (
    <ActionIcon
      variant="outline"
      color={
        colorScheme === "dark" ? theme.colors.yellow[5] : theme.colors.blue[5]
      }
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      size="lg"
    >
      {colorScheme === "dark" ? <IconSun size={23} /> : <IconMoon size={23} />}
    </ActionIcon>
  );
}
