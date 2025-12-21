import { ReactElement } from "react";
import { Text, Title } from "@mantine/core";

import { Calendar, Socials } from "@/components/Contact";
import config from "@/utils/Config";

import classes from "./Contact.module.css";

export default function ContactPage(): ReactElement {
  const sectionData = config.get("CONTACT.SECTION");

  return (
    <div className={classes.pageContainer}>
      {/* Section Header */}
      <div className={classes.headerSection}>
        <div className={classes.header}>
          <Title order={1} className={classes.mainTitle}>
            {sectionData.TITLE}
          </Title>
          <Text size="lg" className={classes.subtitle}>
            {sectionData.DESCRIPTION}
          </Text>
        </div>
      </div>

      {/* Contact Content */}
      <div className={classes.container}>
        <div className={classes.left}>
          <Socials />
        </div>
        <div className={classes.right}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
