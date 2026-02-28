import { ReactElement, useEffect, useState } from "react";

import { HomeActions, UserAvatar, Welcome } from "@/components/Home";

import classes from "./Home.module.css";

export default function HomePage(): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <div className={classes.content} data-loaded={loaded || undefined}>
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
