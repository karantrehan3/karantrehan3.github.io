import { ReactElement } from "react";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Calendar } from "@/components/Calendar/Calendar";
import { Socials } from "@/components/Socials/Socials";
import classes from "./Contact.module.css";

export function ContactPage(): ReactElement {
  return (
    <PageLayout>
      <div className={classes.container}>
        <div className={classes.left}>
          <Socials />
        </div>
        <div className={classes.right}>
          <Calendar />
        </div>
      </div>
    </PageLayout>
  );
}
