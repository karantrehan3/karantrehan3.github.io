import { ReactElement } from "react";
import { Welcome } from "@/components/Welcome/Welcome";
import { InProgress } from "@/components/InProgress/InProgress";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import classes from "./Home.module.css";

export default function HomePage(): ReactElement {
  return (
    <div className={classes.content}>
      <div className={classes.left}>
        <UserAvatar />
      </div>
      <div className={classes.right}>
        <Welcome />
        <InProgress />
      </div>
    </div>
  );
}
