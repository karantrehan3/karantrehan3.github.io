import { Welcome } from "@/components/Welcome/Welcome";
import { Header } from "@/components/Header/Header";
import { InProgress } from "@/components/InProgress/InProgress";
import classes from "./Home.module.css";

export function HomePage() {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <div className={classes.center}>
        <Welcome />
        <InProgress />
      </div>
    </div>
  );
}
