import { ReactElement } from "react";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Error } from "@/components/Error/Error";
import classes from "./Error.module.css";

export function ErrorPage(): ReactElement {
  return (
    <PageLayout header={false}>
      <div className={classes.center}>
        <Error />
      </div>
    </PageLayout>
  );
}
