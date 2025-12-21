import { ReactElement, useEffect, useState } from "react";
import { Paper, Text } from "@mantine/core";

import classes from "./TypingEffect.module.css";

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypingEffect({
  texts,
  typingSpeed = 50,
  deletingSpeed = 20,
  pauseTime = 2000,
}: TypingEffectProps): ReactElement {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect animation
  useEffect(() => {
    const typeText = () => {
      const currentFullText = texts[currentTypingIndex];

      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setTimeout(() => {
            setCurrentText(currentFullText.slice(0, currentText.length + 1));
          }, typingSpeed);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else if (currentText.length > 0) {
        setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTypingIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(
      typeText,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentTypingIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <Paper className={classes.typingSection} p="xl" radius="md">
      <div className={classes.typingContainer}>
        <Text size="xl" className={classes.typingText}>
          {currentText}
          <span className={classes.cursor}>|</span>
        </Text>
      </div>
    </Paper>
  );
}
