import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaCloud, FaRProject, FaJira, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiMicrosoftazure, SiDocker, SiPowerbi, SiApachespark, SiGithubactions, SiDjango } from 'react-icons/si';
import { DiMysql } from 'react-icons/di';

const SkillsSection = styled.section`
  padding: 10rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
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
  margin-bottom: 5rem;
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
  font-size: 1.2rem;
  color: var(--text-dark);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
    margin-top: 1rem;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    gap: 3rem;
    padding: 1rem 0;
  }
`;

const SkillsRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0 0.5rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 3rem;
  backdrop-filter: blur(5px);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 320px;
  max-width: 420px;
  
  @media (max-width: 768px) {
    min-width: 100%;
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const SkillItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: var(--text-dark);
  padding: 1rem;
  background: rgba(240, 240, 245, 0.8);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
    gap: 0.5rem;
  }
  
  &:hover {
    background: rgba(78, 123, 255, 0.1);
    color: var(--primary-color);
    transform: translateX(5px);
  }
`;

const SkillIcon = styled.div`
  font-size: 1.3rem;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SkillName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FaReact />,
      skills: [
        { name: 'React', icon: <FaReact /> },
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> }
      ]
    },
    {
      title: 'Backend',
      icon: <FaNodeJs />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'RESTful APIs', icon: <FaDatabase /> },
        { name: 'Django', icon: <SiDjango /> },
        { name: 'MongoDB', icon: <FaDatabase /> }
      ]
    },
    {
      title: 'Data Analytics',
      icon: <FaDatabase />,
      skills: [
        { name: 'SQL', icon: <DiMysql /> },
        { name: 'R', icon: <FaRProject /> },
        { name: 'Power BI', icon: <SiPowerbi /> },
        { name: 'PySpark', icon: <SiApachespark /> },
        { name: 'ETL Pipelines', icon: <FaDatabase /> }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: <FaCloud />,
      skills: [
        { name: 'Azure', icon: <SiMicrosoftazure /> },
        { name: 'Docker', icon: <SiDocker /> },
        { name: 'CI/CD', icon: <FaCloud /> },
        { name: 'GitHub Actions', icon: <SiGithubactions /> },
        { name: 'Linux', icon: <FaCloud /> }
      ]
    },
    {
      title: 'Development Tools',
      icon: <FaGitAlt />,
      skills: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'JIRA', icon: <FaJira /> },
        { name: 'Agile', icon: <FaGitAlt /> },
        { name: 'Scrum', icon: <FaGitAlt /> }
      ]
    }
  ];
  
  // Group categories into rows of 2-3
  const rows = [];
  for (let i = 0; i < skillCategories.length; i += 3) {
    rows.push(skillCategories.slice(i, i + 3));
  }
  
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
            My expertise lies in data analytics and frontend development,
             where I design intuitive, data-driven interfaces and extract actionable insights to build scalable, high-performance applications.
          </SectionSubtitle>
        </SectionHeader>
        
        <SkillsContainer
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {rows.map((row, rowIndex) => (
            <SkillsRow key={rowIndex}>
              {row.map((category, categoryIndex) => (
                <SkillCategory key={categoryIndex} variants={item}>
                  <CategoryTitle>
                    <CategoryIcon>{category.icon}</CategoryIcon>
                    {category.title}
                  </CategoryTitle>
                  <SkillsList>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillItem 
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + skillIndex * 0.1 }}
                      >
                        <SkillIcon>{skill.icon}</SkillIcon>
                        <SkillName>{skill.name}</SkillName>
                      </SkillItem>
                    ))}
                  </SkillsList>
                </SkillCategory>
              ))}
            </SkillsRow>
          ))}
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 