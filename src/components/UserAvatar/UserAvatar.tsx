import { Avatar, Indicator } from "@mantine/core";
import classes from "./UserAvatar.module.css";
import DP from "@/assets/dp/profile.jpg";

export function UserAvatar() {
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
        <Avatar src={DP} className={classes.avatar} />
      </Indicator>
    </div>
  );
}
