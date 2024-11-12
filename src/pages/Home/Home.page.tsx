import { Welcome } from "@/components/Welcome/Welcome";
import { Header } from "@/components/Header/Header";
import { InProgress } from "@/components/InProgress/InProgress";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import classes from "./Home.module.css";

export function HomePage() {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <div className={classes.content}>
        <div className={classes.left}>
          <UserAvatar />
        </div>
        <div className={classes.right}>
          <Welcome />
          <InProgress />
        </div>
      </div>
    </div>
  );
}
