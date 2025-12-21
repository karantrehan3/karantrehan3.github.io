import "@mantine/core/styles.css";
import "./global.css";

import { ReactElement } from "react";
import { MantineProvider } from "@mantine/core";

import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Router } from "@/Router";
import { theme } from "@/theme";

export default function App(): ReactElement {
  useDocumentMeta();

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
