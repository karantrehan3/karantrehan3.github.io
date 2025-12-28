import "@mantine/core/styles.css";
import "./global.css";

import { ReactElement } from "react";
import { MantineProvider } from "@mantine/core";

import { CookieConsent } from "@/components/Common/CookieConsent";
import { Router } from "@/Router";
import { theme } from "@/theme";

export default function App(): ReactElement {
  return (
    <MantineProvider theme={theme}>
      <Router />
      <CookieConsent />
    </MantineProvider>
  );
}
