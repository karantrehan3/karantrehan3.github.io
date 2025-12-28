import { ReactElement, useEffect, useState } from "react";
import { Anchor, Button, Group, Text } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";
import Constants from "@/utils/Constants";

import classes from "./CookieConsent.module.css";

export type ConsentStatus = "granted" | "denied" | "pending";

/**
 * Get the current consent status from localStorage
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") {
    return Constants.CONSENT_STATUS_PENDING;
  }

  const consentKey = config.get("ANALYTICS.CONSENT_KEY");
  const stored = localStorage.getItem(consentKey);
  if (!stored) {
    return Constants.CONSENT_STATUS_PENDING;
  }

  try {
    const { status, version } = JSON.parse(stored);
    // If version changed, re-ask for consent
    const consentVersion = config.get("ANALYTICS.CONSENT_VERSION");
    if (version !== consentVersion) {
      return Constants.CONSENT_STATUS_PENDING;
    }
    return status as ConsentStatus;
  } catch {
    return Constants.CONSENT_STATUS_PENDING;
  }
}

/**
 * Check if analytics consent has been granted
 */
export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === Constants.CONSENT_STATUS_GRANTED;
}

export function CookieConsent(): ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const status = getConsentStatus();
    if (status === Constants.CONSENT_STATUS_PENDING) {
      // Check if banner should appear immediately (e.g., after resetting consent)
      const showImmediately = localStorage.getItem(
        "show-cookie-banner-immediately"
      );
      if (showImmediately === "true") {
        // Remove the flag and show banner immediately
        localStorage.removeItem("show-cookie-banner-immediately");
        setVisible(true);
      } else {
        // Small delay for better UX on initial page load
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } else if (status === Constants.CONSENT_STATUS_GRANTED) {
      // Initialize analytics if already consented
      analytics.initialize();
    }
  }, []);

  const handleClose = (status: ConsentStatus) => {
    // Save consent status
    const consentKey = config.get("ANALYTICS.CONSENT_KEY");
    const consentVersion = config.get("ANALYTICS.CONSENT_VERSION");
    localStorage.setItem(
      consentKey,
      JSON.stringify({
        status,
        version: consentVersion,
      })
    );

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("consentChanged"));

    // Animate out
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);

      // Initialize analytics if accepted
      if (status === Constants.CONSENT_STATUS_GRANTED) {
        analytics.initialize();
        analytics.trackPageView();
      }
    }, 300);
  };

  if (!visible) {
    return null;
  }

  // Get text from config
  const cookieConsentConfig = config.get("ANALYTICS.COOKIE_CONSENT");
  const title = cookieConsentConfig.TITLE;
  const description = cookieConsentConfig.DESCRIPTION;
  const learnMoreText = cookieConsentConfig.LEARN_MORE_TEXT;
  const declineButton = cookieConsentConfig.DECLINE_BUTTON;
  const acceptButton = cookieConsentConfig.ACCEPT_BUTTON;

  return (
    <div
      className={`${classes.banner} ${isClosing ? classes["banner--closing"] : ""}`}
    >
      <div className={classes.banner__content}>
        <div className={classes.banner__icon}>
          <Icon name="IconCookie" size={24} />
        </div>
        <div className={classes.banner__text}>
          <Text size="sm" fw={500}>
            {title}
          </Text>
          <Text size="xs" c="dimmed">
            {description}{" "}
            <Anchor href="#/privacy" size="xs">
              {learnMoreText}
            </Anchor>
          </Text>
        </div>
        <Group gap="xs" className={classes.banner__actions}>
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            onClick={() => handleClose(Constants.CONSENT_STATUS_DENIED)}
          >
            {declineButton}
          </Button>
          <Button
            size="xs"
            variant="filled"
            color="orange"
            onClick={() => handleClose(Constants.CONSENT_STATUS_GRANTED)}
          >
            {acceptButton}
          </Button>
        </Group>
      </div>
    </div>
  );
}
