import {
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActionIcon, Container, Stack, Text, Title } from "@mantine/core";
import clsx from "clsx";

import { Card } from "@/components/Projects";
import config from "@/utils/Config";

import classes from "./Projects.module.css";

interface ProjectCardInfo {
  imageSource: string;
  imageAlt?: string;
  title: string;
  description: string;
  tagline?: string;
  highlights?: string[];
  link: string;
  links?: { title: string; link: string; newTab?: boolean }[];
  techStack?: string[];
  inProgress?: boolean;
}

// Inline rather than @tabler/icons-react: that package is bundled into an
// eagerly loaded chunk, and these arrows are only needed here.
function Chevron({ direction }: { direction: "left" | "right" }): ReactElement {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={direction === "left" ? "M15 6l-6 6l6 6" : "M9 6l6 6l-6 6"} />
    </svg>
  );
}

function findCenteredIndex(track: HTMLDivElement): number {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  const slides = Array.from(track.children) as HTMLElement[];
  let closest = 0;
  let closestDistance = Infinity;
  slides.forEach((slide, index) => {
    const distance = Math.abs(
      slide.offsetLeft + slide.offsetWidth / 2 - trackCenter
    );
    if (distance < closestDistance) {
      closest = index;
      closestDistance = distance;
    }
  });
  return closest;
}

export default function ProjectsPage(): ReactElement {
  const projectCards: ProjectCardInfo[] = config.get("PROJECTS.CARDS");
  const sectionData = config.get("PROJECTS.SECTION");
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = projectCards.length - 1;

  const syncActive = useCallback((): void => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (trackRef.current) {
        setActiveIndex(findCenteredIndex(trackRef.current));
      }
    });
  }, []);

  useEffect(() => {
    syncActive();
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("resize", syncActive);
      cancelAnimationFrame(frameRef.current);
    };
  }, [syncActive]);

  const goTo = (index: number): void => {
    const track = trackRef.current;
    const target = Math.max(0, Math.min(lastIndex, index));
    const slide = track?.children[target] as HTMLElement | undefined;
    if (!track || !slide) {
      return;
    }
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  // A click on a side card brings it into focus instead of opening it.
  const handleSlideClick = (event: MouseEvent, index: number): void => {
    if (index === activeIndex) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  return (
    <Container size="xl" py="xl" className={classes.page}>
      <Stack gap="xl" className={classes.stack}>
        {/* Section Header */}
        <div className={classes.headerSection}>
          <div className={classes.header}>
            <Title order={1} className={classes.mainTitle}>
              {sectionData.TITLE}
            </Title>
            <Text size="lg" className={classes.subtitle}>
              {sectionData.DESCRIPTION}
            </Text>
          </div>
        </div>

        <section
          className={classes.carousel}
          aria-roledescription="carousel"
          aria-label="Projects"
        >
          <div ref={trackRef} className={classes.track} onScroll={syncActive}>
            {projectCards.map((info, index) => (
              <div
                key={info.title}
                className={clsx(classes.slide, {
                  [classes.slideActive]: index === activeIndex,
                })}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projectCards.length}: ${info.title}`}
                aria-current={index === activeIndex || undefined}
                onClickCapture={(event) => handleSlideClick(event, index)}
              >
                <Card {...info} />
              </div>
            ))}
          </div>

          <div className={classes.controls}>
            <ActionIcon
              variant="default"
              radius="xl"
              size="lg"
              aria-label="Previous project"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              <Chevron direction="left" />
            </ActionIcon>

            <div className={classes.dots}>
              {projectCards.map((info, index) => (
                <button
                  type="button"
                  key={info.title}
                  className={clsx(classes.dot, {
                    [classes.dotActive]: index === activeIndex,
                  })}
                  aria-label={`Go to ${info.title}`}
                  aria-current={index === activeIndex || undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <ActionIcon
              variant="default"
              radius="xl"
              size="lg"
              aria-label="Next project"
              disabled={activeIndex === lastIndex}
              onClick={() => goTo(activeIndex + 1)}
            >
              <Chevron direction="right" />
            </ActionIcon>
          </div>
        </section>
      </Stack>
    </Container>
  );
}
