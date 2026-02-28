import { ReactElement } from "react";
import { Text, Title } from "@mantine/core";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import config from "@/utils/Config";

import classes from "./Welcome.module.css";

function RevealWords({
  text,
  stagger,
  delay,
  className,
}: {
  text: string;
  stagger: number;
  delay: number;
  className?: string;
}) {
  const { ref, isRevealed } = useScrollReveal({
    threshold: 0.1,
    rootMargin: "0px",
  });
  const words = text.split(" ");

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`${classes.word} ${isRevealed ? classes.wordVisible : ""}`}
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
          aria-hidden="true"
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export function Welcome(): ReactElement {
  const greeting = config.get("HOME.TITLE.GREETING") || "";
  const name = config.get("HOME.TITLE.NAME") || "";
  const subtitle = config.get("HOME.TITLE.SUBTITLE") || "";

  return (
    <div aria-label={`${greeting} ${name}. ${subtitle}`}>
      <Title className={classes.title}>
        <RevealWords text={greeting} stagger={100} delay={200} />
        <span className={classes.gradientName}>
          <RevealWords text={name} stagger={120} delay={600} />
        </span>
      </Title>
      <Text size="lg" className={classes.subtitle}>
        <RevealWords text={subtitle} stagger={60} delay={1200} />
      </Text>
    </div>
  );
}
