import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  primaryColor: "orange",
  focusRing: "auto",
  headings: {
    fontWeight: "700",
  },
  components: {
    Button: { defaultProps: { radius: "md" } },
    Paper: { defaultProps: { radius: "md" } },
    ActionIcon: { defaultProps: { radius: "md" } },
  },
});
