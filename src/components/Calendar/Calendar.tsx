import { useState } from "react";
import { Loader } from "@mantine/core";
import config from "@/utils/Config";
import classes from "./Calendar.module.css";
export function Calendar() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <div className={classes.center}>
          <Loader className={classes.loader} type="dots" size="xl" />
        </div>
      ) : (
        <iframe
          title="Connect on Calendar"
          src={config.get("CONTACT.CALENDAR.LINK")}
          className={classes.iframe}
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
  );
}
