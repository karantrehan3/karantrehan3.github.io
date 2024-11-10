import "@mantine/core/styles.css";

import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import config from "@/utils/Config";

export default function App() {
  useEffect(() => {
    document.title = config.get("TITLE.NAME");
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/jpeg";
    link.href = config.get("LINK.FAV_ICON_PATH");
    document.head.appendChild(link);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
