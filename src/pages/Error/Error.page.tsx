import { Error } from "@/components/Error/Error";
import classes from "./Error.module.css";

export function ErrorPage() {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.center}>
        <Error />
      </div>
    </div>
  );
}
