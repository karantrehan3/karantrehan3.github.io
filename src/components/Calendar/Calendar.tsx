import { ReactElement, useState } from "react";
import { Loader } from "@mantine/core";
import clsx from "clsx";

import config from "@/utils/Config";

import classes from "./Calendar.module.css";

export function Calendar(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div>
      {loading && (
        <div className={classes.center}>
          <Loader className={classes.loader} type="dots" size="xl" />
        </div>
      )}
      <iframe
        id="calendar-iframe"
        title="Connect on Calendar"
        src={config.get("CONTACT.CALENDAR.LINK")}
        className={clsx(classes.iframe, {
          [classes.hidden]: loading,
        })}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
