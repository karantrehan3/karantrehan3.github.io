import { ReactElement } from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import Icon from "@/components/Common/Icons";

import classes from "./Error.module.css";

export function Error(): ReactElement {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <Title className={classes.title} ta="center">
          Whoops{" "}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "yellow", to: "red" }}
          >
            404!
          </Text>{" "}
          This page does not exist.
        </Title>
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
          If this was a mistake, head back to the home page.
        </Text>
        <br />
        <Group justify="center">
          <Button
            variant="gradient"
            title="Home"
            onClick={() => navigate("/")}
            size="lg"
            gradient={{ from: "yellow", to: "red" }}
          >
            <Icon name="IconHome" style={{ marginRight: 5 }} />
            Home
          </Button>
        </Group>
      </Container>
    </div>
  );
}
