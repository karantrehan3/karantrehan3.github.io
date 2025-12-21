import { ReactElement } from "react";

import { HomeActions, UserAvatar, Welcome } from "@/components/Home";

import classes from "./Home.module.css";

export default function HomePage(): ReactElement {
  return (
    <div className={classes.content}>
      <div className={classes.left}>
        <UserAvatar />
      </div>
      <div className={classes.right}>
        <Welcome />
        <HomeActions />
      </div>
    </div>
  );
}
