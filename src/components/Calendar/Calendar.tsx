import config from "@/utils/Config";
import classes from "./Calendar.module.css";

export function Calendar() {
  return (
    <div>
      <iframe
        title="Connect on Calendar"
        src={config.get("CONTACT.CALENDAR.LINK")}
        className={classes.iframe}
      />
    </div>
  );
}
