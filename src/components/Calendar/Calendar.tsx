import { ReactElement, useState } from "react";
import { Loader } from "@mantine/core";

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
        title="Connect on Calendar"
        src={config.get("CONTACT.CALENDAR.LINK")}
        className={loading ? classes.hidden : classes.iframe}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
