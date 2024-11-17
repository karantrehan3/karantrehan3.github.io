import { Suspense as Sus, FC, ReactNode } from "react";
import { Loader } from "@mantine/core";
import classes from "./Suspense.module.css";

interface SuspenseProps {
  children: ReactNode;
}

export const Suspense: FC<SuspenseProps> = ({ children }) => {
  return (
    <Sus
      fallback={
        <div className={classes.center}>
          <Loader className={classes.loader} type="dots" size="xl" />
        </div>
      }
    >
      {children}
    </Sus>
  );
};
