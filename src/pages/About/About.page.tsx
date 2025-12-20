import { ReactElement } from "react";
import { Container } from "@mantine/core";

import {
  AboutHeader,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  TypingEffect,
} from "@/components/About";
import config from "@/utils/Config";

import classes from "./About.module.css";

export default function AboutPage(): ReactElement {
  const aboutData = config.get("ABOUT");
  const typingTexts = aboutData.INTRODUCTION.TYPING_EFFECT;
  const experienceSummary = aboutData.EXPERIENCE_SUMMARY;
  const education = aboutData.EDUCATION;
  const skills = aboutData.SKILLS;

  // Extract skills data and configuration
  const skillsConfig = {
    LAYOUT: skills.LAYOUT,
    STYLING: skills.STYLING,
  };

  // Extract actual skills data (excluding config)
  const skillsData = Object.keys(skills).reduce((acc, key) => {
    if (key !== "LAYOUT" && key !== "STYLING") {
      acc[key] = skills[key];
    }
    return acc;
  }, {} as any);

  return (
    <Container size="xl" className={classes.container}>
      {/* Header Section - Centered About Me */}
      <AboutHeader title={aboutData.TITLE} subtitle={aboutData.SUBTITLE} />

      {/* Typing Effect Section - Full Width */}
      <TypingEffect texts={typingTexts} />

      {/* Experience Summary */}
      <ExperienceSection experienceSummary={experienceSummary} />

      {/* Skills Section */}
      <SkillsSection skills={skillsData} config={skillsConfig} />

      {/* Education Section */}
      <EducationSection
        degree={education.DEGREE}
        university={education.UNIVERSITY}
        graduationDate={education.GRADUATION_DATE}
        marks={education.MARKS}
        logo={education.LOGO}
        logoAlt={education.LOGO_ALT}
        achievements={education.ACHIEVEMENTS}
      />
    </Container>
  );
}
