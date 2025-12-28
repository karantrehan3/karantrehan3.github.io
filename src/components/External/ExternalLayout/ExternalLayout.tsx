import { FC, ReactNode } from "react";

import classes from "./ExternalLayout.module.css";

interface ExternalLayoutProps {
  children: ReactNode;
}

const ExternalLayout: FC<ExternalLayoutProps> = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default ExternalLayout;
export { ExternalLayout };
