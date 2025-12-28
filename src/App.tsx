import "@mantine/core/styles.css";
import "./global.css";

import { ReactElement, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

import { CookieConsent } from "@/components/Common/CookieConsent";
import { Router } from "@/Router";
import { theme } from "@/theme";
import helpers from "@/utils/Helpers";

export default function App(): ReactElement {
  // Capture UTM parameters on initial page load
  useEffect(() => {
    helpers.captureAndStoreUtmParams();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Router />
      <CookieConsent />
    </MantineProvider>
  );
}
