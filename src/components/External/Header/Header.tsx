import { FC } from "react";
import { Button, Group } from "@mantine/core";
import { IconHome, IconArrowBack } from "@tabler/icons-react";
import Layout from "@/components/External/Layout/Layout";
import classes from "./Header.module.css";

const Header: FC = () => {
  return (
    <Layout>
      <Group className={classes.iframe_container}>
        <Button
          onClick={() => window.history.back()}
          leftSection={<IconArrowBack />}
          className={classes.custom_button}
        >
          Back
        </Button>
        <Button
          onClick={() => window.open("https://karantrehan3.github.io/", "_top")}
          leftSection={<IconHome />}
          className={classes.custom_button}
        >
          Home
        </Button>
      </Group>
    </Layout>
  );
};

export default Header;
