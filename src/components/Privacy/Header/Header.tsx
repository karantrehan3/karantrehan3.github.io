import { memo, ReactElement, useCallback } from "react";
import { Box, Burger, Button, Container, Group, Text } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";

import classes from "./Header.module.css";

interface HeaderProps {
  backButtonText: string;
  tocOpened: boolean;
  onTocOpen: () => void;
}

function HeaderComponent({
  backButtonText,
  tocOpened,
  onTocOpen,
}: HeaderProps): ReactElement {
  const handleBackClick = useCallback((): void => {
    window.location.hash = "/";
  }, []);

  return (
    <nav className={classes.header} aria-label="Privacy page navigation">
      <Container size="xxl" className={classes.header__container}>
        {/* Desktop: Back button and Theme toggle */}
        <Group visibleFrom="lg" className={classes.header__desktop}>
          <Button
            className={classes["header__back-button"]}
            variant="outline"
            color="orange"
            leftSection={
              <Box
                component="span"
                className={classes["header__back-button-icon"]}
              >
                <Icon name="IconArrowLeft" size={16} />
              </Box>
            }
            onClick={handleBackClick}
            aria-label={backButtonText}
          >
            <Text
              component="span"
              className={classes["header__back-button-text"]}
            >
              {backButtonText}
            </Text>
          </Button>
          <ThemeToggle />
        </Group>

        {/* Mobile and Tablet: Burger, Back button, Theme toggle */}
        <Group hiddenFrom="lg" className={classes.header__mobile}>
          <Burger
            opened={tocOpened}
            onClick={onTocOpen}
            size="sm"
            className={classes.header__burger}
            aria-label="Toggle table of contents"
          />
          <Button
            className={classes["header__back-button"]}
            variant="outline"
            color="orange"
            leftSection={
              <Box
                component="span"
                className={classes["header__back-button-icon"]}
              >
                <Icon name="IconArrowLeft" size={16} />
              </Box>
            }
            onClick={handleBackClick}
            aria-label={backButtonText}
          >
            <Text
              component="span"
              className={classes["header__back-button-text"]}
            >
              {backButtonText}
            </Text>
          </Button>
          <ThemeToggle />
        </Group>
      </Container>
    </nav>
  );
}

export const Header = memo(HeaderComponent);
