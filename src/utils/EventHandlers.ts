import type { KeyboardEvent } from "react";

/**
 * Creates a keyboard event handler that stops propagation for Enter and Space keys
 * Useful for preventing parent element handlers from firing
 */
export const createStopPropagationHandler = () => {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
    }
  };
};

/**
 * Creates a keyboard event handler that triggers a callback and stops propagation
 * for Enter and Space keys
 */
export const createKeyboardActionHandler = (
  callback: () => void
): ((e: KeyboardEvent) => void) => {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      callback();
    }
  };
};
