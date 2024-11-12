import { useState } from "react";
import { Avatar, Indicator, Loader } from "@mantine/core";
import classes from "./UserAvatar.module.css";
import DP from "@/assets/dp/profile.jpg";

export function UserAvatar() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Indicator
        inline
        label={<span className={classes.label}>👋</span>}
        size={100}
        offset={60}
        position="bottom-end"
        withBorder={false}
        className={classes.transparent}
      >
        {loading && <Loader className={classes.loader} type="dots" size="xl" />}
        <Avatar
          src={DP}
          className={loading ? classes.hidden : classes.avatar}
          onLoad={() => setLoading(false)}
        />
      </Indicator>
    </div>
  );
}
