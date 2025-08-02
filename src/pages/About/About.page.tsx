import { ReactElement, useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Badge,
  Stack,
  Paper,
  Image,
  Anchor,
  Blockquote,
  Box,
} from "@mantine/core";
import {
  IconBriefcase,
  IconCalendar,
  IconExternalLink,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import config from "@/utils/Config";
import classes from "./About.module.css";

interface Skill {
  name: string;
  badge: string;
}

interface SkillCategory {
  [key: string]: Skill[];
}

interface Role {
  TITLE: string;
  PERIOD: string;
  DESCRIPTION: string;
}

interface Project {
  NAME: string;
  CURRENT_NAME?: string;
  URL: string;
  ROLE: string;
  LOGO?: string;
  CURRENT_LOGO?: string;
  DESCRIPTION: string;
}

interface Company {
  NAME: string;
  URL: string;
  LOGO?: string;
  ROLES: Role[];
  PROJECTS?: Project[];
}

export default function AboutPage(): ReactElement {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const aboutData = config.get("ABOUT");
  const typingTexts = aboutData.INTRODUCTION.TYPING_EFFECT;
  const experienceSummary = aboutData.EXPERIENCE_SUMMARY;
  const focusAreas = aboutData.FOCUS_AREAS;
  const professionalQuote = aboutData.QUOTE;
  const education = aboutData.EDUCATION;
  const skills: SkillCategory = aboutData.SKILLS;

  // Typing effect animation
  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    const typeText = () => {
      const currentFullText = typingTexts[currentTypingIndex];

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
      } else {
        if (currentText.length > 0) {
          setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    };

    const timer = setTimeout(typeText, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTypingIndex, typingTexts]);

  const renderSkillCategory = (categoryName: string, skills: Skill[]) => (
    <div key={categoryName} className={classes.skillCategory}>
      <Title order={4} className={classes.categoryTitle}>
        {categoryName.replace(/_/g, " ")}
      </Title>
      <Group gap="sm" className={classes.skillBadges}>
        {skills.map((skill) => (
          <Image
            key={skill.name}
            src={skill.badge}
            alt={skill.name}
            className={classes.skillBadge}
            fit="contain"
          />
        ))}
      </Group>
    </div>
  );

  return (
    <Container size="xl" className={classes.container}>
      {/* Header Section - Centered About Me */}
      <div className={classes.headerSection}>
        <div className={classes.header}>
          <Title order={1} className={classes.mainTitle}>
            {aboutData.TITLE}
          </Title>
          <Text size="lg" className={classes.subtitle}>
            {aboutData.SUBTITLE}
          </Text>
        </div>
      </div>

      {/* Professional Quote - Full Width */}
      <Paper className={classes.quoteSection} p="xl" radius="md">
        <Blockquote cite="— Karan Trehan">{professionalQuote}</Blockquote>
      </Paper>

      {/* Typing Effect Section - Full Width */}
      <Paper className={classes.typingSection} p="xl" radius="md">
        <div className={classes.typingContainer}>
          <Text size="xl" className={classes.typingText}>
            {currentText}
            <span className={classes.cursor}>|</span>
          </Text>
        </div>
      </Paper>

      {/* Experience Summary */}
      <Paper className={classes.experienceSection} p="xl" radius="md">
        <Title order={3} className={classes.sectionTitle}>
          Experience
        </Title>
        <Text className={classes.experienceText}>
          <strong>{experienceSummary.YEARS}</strong>{" "}
          {experienceSummary.DESCRIPTION}
        </Text>

        <Stack gap="xl" className={classes.companiesList}>
          {experienceSummary.COMPANIES.map(
            (company: Company, index: number) => (
              <div key={index} className={classes.companyItem}>
                <Group
                  gap="xs"
                  align="center"
                  className={classes.companyHeader}
                >
                  <Group
                    gap="xs"
                    align="center"
                    className={classes.companyInfo}
                  >
                    {company.LOGO && (
                      <Image
                        src={company.LOGO}
                        alt={`${company.NAME} logo`}
                        className={classes.companyLogo}
                        width={40}
                        height={40}
                        fit="contain"
                      />
                    )}
                    <Anchor
                      href={company.URL}
                      target="_blank"
                      className={classes.companyLink}
                    >
                      {company.NAME}
                    </Anchor>
                    <IconExternalLink size={16} />
                  </Group>
                </Group>

                {/* Roles Timeline */}
                <div className={classes.rolesTimeline}>
                  {company.ROLES.map((role: Role, roleIndex: number) => (
                    <div key={roleIndex} className={classes.roleItem}>
                      <div className={classes.roleHeader}>
                        <Text fw={600} className={classes.roleTitle}>
                          {role.TITLE}
                        </Text>
                        <Badge
                          size="sm"
                          variant="light"
                          className={classes.rolePeriod}
                        >
                          {role.PERIOD}
                        </Badge>
                      </div>
                      <div className={classes.roleDescription}>
                        <ReactMarkdown>{role.DESCRIPTION}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Projects Section (if exists) */}
                {company.PROJECTS && company.PROJECTS.length > 0 && (
                  <div className={classes.projectsSection}>
                    <Text fw={600} size="sm" className={classes.projectsTitle}>
                      Key Projects:
                    </Text>
                    <Stack gap="sm" className={classes.projectsList}>
                      {company.PROJECTS.map(
                        (project: Project, projectIndex: number) => (
                          <div
                            key={projectIndex}
                            className={classes.projectItem}
                          >
                            <Group gap="xs" align="center">
                              {/* Project Logo */}
                              <div className={classes.projectLogoContainer}>
                                {!!project.CURRENT_LOGO ? (
                                  // Special overlapping design for logo/currentLogo
                                  <div className={classes.logoOverlap}>
                                    <Image
                                      src={project.LOGO}
                                      alt="Logo"
                                      className={classes.logo}
                                      width={40}
                                      height={40}
                                      fit="contain"
                                    />
                                    <Image
                                      src={project.CURRENT_LOGO}
                                      alt="Current logo"
                                      className={classes.currentLogo}
                                      width={40}
                                      height={40}
                                      fit="contain"
                                    />
                                  </div>
                                ) : project.LOGO ? (
                                  <Image
                                    src={project.LOGO}
                                    alt={`${project.NAME} logo`}
                                    className={classes.projectLogo}
                                    width={40}
                                    height={40}
                                    fit="contain"
                                  />
                                ) : null}
                              </div>

                              <Anchor
                                href={project.URL}
                                target="_blank"
                                className={classes.projectLink}
                              >
                                {project.CURRENT_NAME
                                  ? `${project.NAME} (now ${project.CURRENT_NAME})`
                                  : project.NAME}
                              </Anchor>
                              <IconExternalLink size={14} />
                            </Group>
                            <Text
                              size="xs"
                              className={classes.projectRole}
                            >
                              {project.ROLE}
                            </Text>
                            <Text
                              size="sm"
                              className={classes.projectDescription}
                            >
                              {project.DESCRIPTION}
                            </Text>
                          </div>
                        )
                      )}
                    </Stack>
                  </div>
                )}
              </div>
            )
          )}
        </Stack>
      </Paper>

      {/* Focus Areas */}
      <Paper className={classes.focusSection} p="xl" radius="md">
        <Title order={3} className={classes.sectionTitle}>
          Focus Areas
        </Title>
        <Group gap="sm" className={classes.focusBadges}>
          {focusAreas.map((area: string) => (
            <Badge
              key={area}
              size="lg"
              variant="light"
              className={classes.focusBadge}
            >
              {area}
            </Badge>
          ))}
        </Group>
      </Paper>

      {/* Skills Section */}
      <Paper className={classes.skillsSection} p="xl" radius="md">
        <Title order={3} className={classes.sectionTitle}>
          Skills & Technologies
        </Title>
        <Stack gap="xl" className={classes.skillsContainer}>
          {Object.entries(skills).map(([category, skillList]) =>
            renderSkillCategory(category, skillList)
          )}
        </Stack>
      </Paper>

      {/* Education Section */}
      <Paper className={classes.educationSection} p="xl" radius="md">
        <Title order={3} className={classes.sectionTitle}>
          Education
        </Title>
        <div className={classes.educationContent}>
          <Group gap="xs" align="center" className={classes.universityHeader}>
            {education.LOGO && (
              <Image
                src={education.LOGO}
                alt={`${education.UNIVERSITY} logo`}
                className={classes.universityLogo}
                width={40}
                height={40}
                fit="contain"
              />
            )}
            <Text fw={600} size="lg" className={classes.degreeTitle}>
              {education.DEGREE}
            </Text>
          </Group>
          <Group
            gap="xs"
            align="center"
            justify="space-between"
            className={classes.educationDetails}
          >
            <Text size="md"  className={classes.universityInfo}>
              {education.UNIVERSITY}
            </Text>
            <Stack gap="xs" align="flex-end">
              <Badge
                size="sm"
                variant="light"
                className={classes.graduationBadge}
              >
                {education.GRADUATION_DATE}
              </Badge>
              <Text size="md" fw={600} className={classes.marksInfo}>
                Marks {education.MARKS}
              </Text>
            </Stack>
          </Group>
          {education.ACHIEVEMENTS && education.ACHIEVEMENTS.length > 0 && (
            <Group gap="xs" className={classes.achievementsList}>
              {education.ACHIEVEMENTS.map(
                (achievement: string, index: number) => (
                  <Badge
                    key={index}
                    size="md"
                    variant="filled"
                    color="yellow"
                    className={classes.achievementBadge}
                  >
                    {achievement}
                  </Badge>
                )
              )}
            </Group>
          )}
        </div>
      </Paper>
    </Container>
  );
}
