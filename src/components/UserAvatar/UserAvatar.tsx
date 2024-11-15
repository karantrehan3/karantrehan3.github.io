import { useState } from "react";
import { Avatar, Indicator, Loader } from "@mantine/core";
import classes from "./UserAvatar.module.css";
import config from "@/utils/Config";

export function UserAvatar() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Indicator
        inline
        label={<span className={classes.label}>👋</span>}
        position="bottom-end"
        withBorder={false}
        className={classes.indicator}
      >
        {loading && <Loader className={classes.loader} type="dots" size="xl" />}
        <div className={classes.avatarContainer}>
          <Avatar
            src={config.get("AVATAR")}
            className={loading ? classes.hidden : classes.avatar}
            onLoad={() => setLoading(false)}
            onContextMenu={(event) => event.preventDefault()} // Prevent users from downloading image
          />
          <div
            className={classes.avatarOverlay}
            onContextMenu={(event) => event.preventDefault()} // Prevent users from downloading image
          />
        </div>
      </Indicator>
    </div>
  );
}
