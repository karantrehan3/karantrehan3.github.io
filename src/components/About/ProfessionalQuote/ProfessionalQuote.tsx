import { ReactElement } from "react";
import { Blockquote, Paper } from "@mantine/core";

import classes from "./ProfessionalQuote.module.css";

interface ProfessionalQuoteProps {
  quote: string;
  author: string;
}

export function ProfessionalQuote({
  quote,
  author,
}: ProfessionalQuoteProps): ReactElement {
  return (
    <Paper className={classes.quoteSection} p="xl" radius="md">
      <Blockquote cite={`— ${author}`}>{quote}</Blockquote>
    </Paper>
  );
}
