import { memo, ReactElement, useState } from "react";
import {
  Badge,
  Container,
  Group,
  Image,
  Loader,
  Card as OgCard,
  Text,
} from "@mantine/core";
import clsx from "clsx";

import { MarkdownRenderer } from "@/components/Common/MarkdownRenderer";
import analytics from "@/utils/Analytics";

import classes from "./Card.module.css";

interface CardLink {
  title: string;
  link: string;
  newTab?: boolean;
}

interface CardProps {
  imageSource: string;
  imageAlt?: string;
  title: string;
  description: string;
  link: string;
  links?: CardLink[];
  techStack?: string[];
  inProgress?: boolean;
}

function CardComponent({
  imageSource,
  imageAlt,
  title,
  description,
  link,
  links,
  techStack = [],
  inProgress = false,
}: CardProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const hasMultipleLinks = links && links.length > 0;

  const handleCardClick = (): void => {
    if (hasMultipleLinks) {return;}
    analytics.trackProjectClick(title, link);
    window.open(link, "_self");
  };

  const handleLinkClick = (e: React.MouseEvent, cardLink: CardLink): void => {
    e.stopPropagation();
    analytics.trackProjectClick(title, cardLink.link);
    if (cardLink.newTab) {
      window.open(cardLink.link, "_blank", "noopener,noreferrer");
    } else {
      window.open(cardLink.link, "_self");
    }
  };

  return (
    <OgCard
      className={clsx(classes.card, {
        [classes.cardMultiLink]: hasMultipleLinks,
      })}
      onClick={handleCardClick}
    >
      <OgCard.Section className={classes.imageSection}>
        {loading && (
          <div className={classes.center}>
            <Loader className={classes.loader} type="dots" size="xl" />
          </div>
        )}
        {inProgress && (
          <div className={classes.ribbon}>
            <span>🛠️ In Progress</span>
          </div>
        )}
        <Image
          src={imageSource}
          alt={imageAlt || `${title} project screenshot`}
          className={clsx(classes.img, {
            [classes.hidden]: loading,
          })}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
        <Container className={classes.overlay}>
          {hasMultipleLinks ? (
            <div className={classes.multiLinkContainer}>
              {links.map((cardLink, index) => (
                <button
                  type="button"
                  key={index}
                  className={classes.ctaButton}
                  onClick={(e) => handleLinkClick(e, cardLink)}
                >
                  {cardLink.title}
                  {cardLink.newTab && (
                    <svg
                      className={classes.externalIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <span>Click to check it out</span>
          )}
        </Container>
      </OgCard.Section>

      <div className={classes.cardContent}>
        <div className={classes.cardBody}>
          <Group className={classes.group}>
            <Text className={classes.title}>{title}</Text>
          </Group>

          <div className={classes.description}>
            <MarkdownRenderer content={description} />
          </div>
        </div>

        {techStack.length > 0 && (
          <div className={classes.techStackSection}>
            <Text className={classes.techStackTitle}>Tech Stack:</Text>
            <div className={classes.techStackBadges}>
              {techStack.map((tech, index) => (
                <Badge
                  key={index}
                  className={classes.techBadge}
                  variant="light"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </OgCard>
  );
}

export const Card = memo(CardComponent);
