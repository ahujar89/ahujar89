import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaPython, FaDatabase, FaCloud,
  FaRProject, FaProjectDiagram, FaUsers, FaChartLine,
  FaTasks, FaRoute
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiMicrosoftazure, SiDocker, SiPowerbi, SiApachespark,
  SiGithubactions, SiDjango
} from 'react-icons/si';
import { DiMysql } from 'react-icons/di';

/* ─── Section ─────────────────────────────────────────────────────────── */

const SkillsSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--text-medium);
  max-width: 620px;
  margin: 1.5rem auto 0;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0 1rem;
  }
`;

/* ─── Bento Grid ─────────────────────────────────────────────────────── */

const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  background: var(--background-card);
  border-radius: 18px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  grid-column: ${({ featured }) => (featured ? 'span 2' : 'span 1')};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: ${({ accent }) => accent};
    border-radius: 18px 0 0 18px;
  }

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-3px);
  }

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const CardIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: ${({ accent }) => accent};
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const ChipsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 50px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({ accent }) => `${accent}18`};
  color: ${({ accent }) => accent};
  border: 1px solid ${({ accent }) => `${accent}33`};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;

  svg {
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ accent }) => `${accent}28`};
  }
`;

/* ─── Animation variants ─────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

/* ─── Component ─────────────────────────────────────────────────────── */

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillCategories = [
    {
      title: 'Data Analytics',
      icon: <FaDatabase />,
      accent: '#f59e0b',
      skills: [
        { name: 'SQL',          icon: <DiMysql /> },
        { name: 'R',            icon: <FaRProject /> },
        { name: 'Power BI',     icon: <SiPowerbi /> },
        { name: 'PySpark',      icon: <SiApachespark /> },
        { name: 'ETL Pipelines',icon: <FaDatabase /> }
      ]
    },
    {
      title: 'Frontend',
      icon: <FaReact />,
      accent: '#e11d48',
      skills: [
        { name: 'React',        icon: <FaReact /> },
        { name: 'JavaScript',   icon: <SiJavascript /> },
        { name: 'TypeScript',   icon: <SiTypescript /> },
        { name: 'Next.js',      icon: <SiNextdotjs /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> }
      ]
    },
    {
      title: 'Backend',
      icon: <FaNodeJs />,
      accent: '#8b5cf6',
      skills: [
        { name: 'Node.js',      icon: <FaNodeJs /> },
        { name: 'Python',       icon: <FaPython /> },
        { name: 'RESTful APIs', icon: <FaDatabase /> },
        { name: 'Django',       icon: <SiDjango /> },
        { name: 'MongoDB',      icon: <FaDatabase /> }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: <FaCloud />,
      accent: '#0ea5e9',
      featured: true,
      skills: [
        { name: 'Azure',          icon: <SiMicrosoftazure /> },
        { name: 'Docker',         icon: <SiDocker /> },
        { name: 'CI/CD',          icon: <FaCloud /> },
        { name: 'GitHub Actions', icon: <SiGithubactions /> },
        { name: 'Linux',          icon: <FaCloud /> }
      ]
    },
    {
      title: 'PM Skills',
      icon: <FaProjectDiagram />,
      accent: '#ff6b6b',
      skills: [
        { name: 'Roadmap Planning',        icon: <FaRoute /> },
        { name: 'Stakeholder Management',  icon: <FaUsers /> },
        { name: 'Data-Driven Decisions',   icon: <FaChartLine /> },
        { name: 'Agile Execution',         icon: <FaTasks /> }
      ]
    }
  ];

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Technical Skills
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            I build data-intensive applications end-to-end — from clean user interfaces to cloud pipelines and AI integrations.
          </SectionSubtitle>
        </SectionHeader>

        <BentoGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {skillCategories.map((category, idx) => (
            <CategoryCard
              key={idx}
              variants={cardVariants}
              accent={category.accent}
              featured={category.featured ? 1 : 0}
            >
              <CardHeader>
                <CardIcon accent={category.accent}>{category.icon}</CardIcon>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <ChipsWrap>
                {category.skills.map((skill, sIdx) => (
                  <Chip key={sIdx} accent={category.accent}>
                    {skill.icon}
                    {skill.name}
                  </Chip>
                ))}
              </ChipsWrap>
            </CategoryCard>
          ))}
        </BentoGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
