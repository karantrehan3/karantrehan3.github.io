import { ReactElement } from "react";
import { Calendar } from "@/components/Calendar/Calendar";
import { Socials } from "@/components/Socials/Socials";
import classes from "./Contact.module.css";

export default function ContactPage(): ReactElement {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Socials />
      </div>
      <div className={classes.right}>
        <Calendar />
      </div>
    </div>
  );
}
