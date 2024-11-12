import { Header } from "@/components/Header/Header";
import { Calendar } from "@/components/Calendar/Calendar";
import { Socials } from "@/components/Socials/Socials";
import classes from "./Contact.module.css";

export function ContactPage() {
  return (
    <div className={classes.pageContainer}>
      <Header />
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
