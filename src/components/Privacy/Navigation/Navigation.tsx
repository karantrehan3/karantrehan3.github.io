import { memo, ReactElement, useCallback } from "react";
import { Box, Burger, Button, Container, Group, Text } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { ThemeToggle } from "@/components/Common/ThemeToggle";

import classes from "./Navigation.module.css";

interface NavigationProps {
  backButtonText: string;
  tocOpened: boolean;
  onTocOpen: () => void;
}

function NavigationComponent({
  backButtonText,
  tocOpened,
  onTocOpen,
}: NavigationProps): ReactElement {
  const handleBackClick = useCallback((): void => {
    window.location.hash = "/";
  }, []);

  return (
    <nav className={classes.navigation} aria-label="Privacy page navigation">
      <Container size="xxl" className={classes.navigation__container}>
        {/* Desktop: Back button and Theme toggle */}
        <Group visibleFrom="lg" className={classes.navigation__desktop}>
          <Button
            className={classes["navigation__back-button"]}
            variant="outline"
            color="orange"
            leftSection={
              <Box
                component="span"
                className={classes["navigation__back-button-icon"]}
              >
                <Icon name="IconArrowLeft" size={16} />
              </Box>
            }
            onClick={handleBackClick}
            aria-label={backButtonText}
          >
            <Text
              component="span"
              className={classes["navigation__back-button-text"]}
            >
              {backButtonText}
            </Text>
          </Button>
          <ThemeToggle />
        </Group>

        {/* Mobile and Tablet: Burger, Back button, Theme toggle */}
        <Group hiddenFrom="lg" className={classes.navigation__mobile}>
          <Burger
            opened={tocOpened}
            onClick={onTocOpen}
            size="sm"
            className={classes.navigation__burger}
            aria-label="Toggle table of contents"
          />
          <Button
            className={classes["navigation__back-button"]}
            variant="outline"
            color="orange"
            leftSection={
              <Box
                component="span"
                className={classes["navigation__back-button-icon"]}
              >
                <Icon name="IconArrowLeft" size={16} />
              </Box>
            }
            onClick={handleBackClick}
            aria-label={backButtonText}
          >
            <Text
              component="span"
              className={classes["navigation__back-button-text"]}
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

export const Navigation = memo(NavigationComponent);
