import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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

  const stored = localStorage.getItem(Constants.CONSENT_KEY);
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

function CookieConsentComponent(): ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const status = getConsentStatus();
    if (status === Constants.CONSENT_STATUS_PENDING) {
      // Check if banner should appear immediately (e.g., after resetting consent)
      const showImmediately = localStorage.getItem(
        Constants.SHOW_COOKIE_BANNER_FLAG
      );
      if (showImmediately === "true") {
        // Remove the flag and show banner immediately
        localStorage.removeItem(Constants.SHOW_COOKIE_BANNER_FLAG);
        setVisible(true);
      } else {
        // Small delay for better UX on initial page load
        const timer = setTimeout(
          () => setVisible(true),
          Constants.COOKIE_BANNER_DELAY
        );
        return () => clearTimeout(timer);
      }
    } else if (status === Constants.CONSENT_STATUS_GRANTED) {
      // Initialize analytics if already consented
      analytics.initialize();
    }
  }, []);

  const handleClose = useCallback((status: ConsentStatus) => {
    // Save consent status
    const consentVersion = config.get("ANALYTICS.CONSENT_VERSION");
    localStorage.setItem(
      Constants.CONSENT_KEY,
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
    }, Constants.CLOSE_ANIMATION_DURATION);
  }, []);

  const handleDecline = useCallback(() => {
    handleClose(Constants.CONSENT_STATUS_DENIED);
  }, [handleClose]);

  const handleAccept = useCallback(() => {
    handleClose(Constants.CONSENT_STATUS_GRANTED);
  }, [handleClose]);

  // Memoize config values to avoid repeated lookups
  const cookieConsentConfig = useMemo(
    () => config.get("ANALYTICS.COOKIE_CONSENT"),
    []
  );

  // Memoize banner className - must be called before early return to follow Rules of Hooks
  const bannerClassName = useMemo(
    () =>
      `${classes.banner} ${isClosing ? classes["banner--closing"] : ""}`.trim(),
    [isClosing]
  );

  if (!visible) {
    return null;
  }

  return (
    <div className={bannerClassName} role="dialog" aria-label="Cookie consent">
      <div className={classes.banner__content}>
        <div className={classes.banner__icon}>
          <Icon name="IconCookie" size={24} aria-hidden="true" />
        </div>
        <div className={classes.banner__text}>
          <Text size="sm" fw={500}>
            {cookieConsentConfig.TITLE}
          </Text>
          <Text size="xs" c="dimmed">
            {cookieConsentConfig.DESCRIPTION}{" "}
            <Anchor href="#/privacy" size="xs">
              {cookieConsentConfig.LEARN_MORE_TEXT}
            </Anchor>
          </Text>
        </div>
        <Group gap="xs" className={classes.banner__actions}>
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            onClick={handleDecline}
            aria-label="Decline cookies"
          >
            {cookieConsentConfig.DECLINE_BUTTON}
          </Button>
          <Button
            size="xs"
            variant="filled"
            color="orange"
            onClick={handleAccept}
            aria-label="Accept cookies"
          >
            {cookieConsentConfig.ACCEPT_BUTTON}
          </Button>
        </Group>
      </div>
    </div>
  );
}

export const CookieConsent = memo(CookieConsentComponent);
