import { ReactElement } from "react";
import { Text, Button } from "@mantine/core";
import { BouncyLoader } from "@/components/Loaders/BouncyLoader";
import { useNavigate } from "react-router-dom";
import classes from "./InProgress.module.css";

export function InProgress(): ReactElement {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/projects");
  };

  return (
    <div>
      <Text className={classes.text}>
        This portfolio is a build in progress.
      </Text>
      <BouncyLoader className={classes.loader} />
      <Button className={classes.button} onClick={handleButtonClick}>
        Meanwhile, How about you view my Projects?
      </Button>
    </div>
  );
}
