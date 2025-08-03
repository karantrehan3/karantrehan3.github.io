import { ReactElement } from "react";

import { HomeActions } from "@/components/HomeActions/HomeActions";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import { Welcome } from "@/components/Welcome/Welcome";

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
