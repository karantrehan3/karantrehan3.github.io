import { ReactElement, useState } from "react";
import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";
import helpers from "@/utils/Helpers";

import classes from "./ShareDialog.module.css";

interface ShareDialogProps {
  opened: boolean;
  onClose: () => void;
}

interface SharePlatform {
  name: string;
  label: string;
  iconName:
    | "IconBrandLinkedin"
    | "IconBrandTwitter"
    | "IconBrandFacebook"
    | "IconBrandWhatsapp"
    | "IconMail"
    | "IconCheck"
    | "IconCopy";
  color: string;
  getShareUrl: (url: string) => string;
}

export function ShareDialog({
  opened,
  onClose,
}: ShareDialogProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";
  const shareUrl = helpers.generateShareUrl(baseUrl, "share_dialog");

  const platforms: SharePlatform[] = [
    {
      name: "linkedin",
      label: config.get("CTAS.SHARE.DIALOG.PLATFORMS.LINKEDIN.LABEL"),
      iconName: "IconBrandLinkedin",
      color: "#0077B5",
      getShareUrl: (url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "twitter",
      label: config.get("CTAS.SHARE.DIALOG.PLATFORMS.TWITTER.LABEL"),
      iconName: "IconBrandTwitter",
      color: "#1DA1F2",
      getShareUrl: (url: string) => {
        const text = encodeURIComponent(
          `Check out Karan Trehan's portfolio - Lead Software Engineer & AI Enthusiast`
        );
        return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
          url
        )}`;
      },
    },
    {
      name: "facebook",
      label: config.get("CTAS.SHARE.DIALOG.PLATFORMS.FACEBOOK.LABEL"),
      iconName: "IconBrandFacebook",
      color: "#1877F2",
      getShareUrl: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "whatsapp",
      label: config.get("CTAS.SHARE.DIALOG.PLATFORMS.WHATSAPP.LABEL"),
      iconName: "IconBrandWhatsapp",
      color: "#25D366",
      getShareUrl: (url: string) => {
        const text = encodeURIComponent(
          `Check out Karan Trehan's portfolio: ${url}`
        );
        return `https://wa.me/?text=${text}`;
      },
    },
    {
      name: "email",
      label: config.get("CTAS.SHARE.DIALOG.PLATFORMS.EMAIL.LABEL"),
      iconName: "IconMail",
      color: "#EA4335",
      getShareUrl: (url: string) => {
        const subject = encodeURIComponent(
          "Check out Karan Trehan's Portfolio"
        );
        const body = encodeURIComponent(
          `I thought you might be interested in checking out this portfolio:\n\n${url}`
        );
        return `mailto:?subject=${subject}&body=${body}`;
      },
    },
  ];

  const handleShare = (platform: SharePlatform): void => {
    const shareUrlWithParams = helpers.generateShareUrl(baseUrl, platform.name);
    const finalUrl = platform.getShareUrl(shareUrlWithParams);

    analytics.trackShareClick(platform.name, shareUrlWithParams);

    window.open(finalUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleCopyLink = async (): Promise<void> => {
    const success = await helpers.copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      analytics.trackShareClick("copy", shareUrl);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <Icon name="IconShare" size={20} />
          <Text fw={600}>{config.get("CTAS.SHARE.DIALOG.TITLE")}</Text>
        </Group>
      }
      centered
      size="md"
    >
      <Stack gap="lg">
        <Text size="sm" c="dimmed">
          {config.get("CTAS.SHARE.DIALOG.DESCRIPTION")}
        </Text>

        <Group gap="md" justify="center">
          {platforms.map((platform) => (
            <Tooltip
              key={platform.name}
              label={platform.label}
              position="top"
              withArrow
            >
              <UnstyledButton
                className={classes.platformButton}
                onClick={() => handleShare(platform)}
                style={
                  {
                    "--platform-color": platform.color,
                  } as React.CSSProperties
                }
              >
                <Icon
                  name={platform.iconName}
                  size={32}
                  color={platform.color}
                />
              </UnstyledButton>
            </Tooltip>
          ))}
        </Group>

        <Button
          fullWidth
          variant="light"
          leftSection={
            <Icon name={copied ? "IconCheck" : "IconCopy"} size={18} />
          }
          onClick={handleCopyLink}
          color={copied ? "green" : "blue"}
        >
          {copied
            ? config.get("CTAS.SHARE.DIALOG.LINK_COPIED")
            : config.get("CTAS.SHARE.DIALOG.COPY_LINK")}
        </Button>
      </Stack>
    </Modal>
  );
}
