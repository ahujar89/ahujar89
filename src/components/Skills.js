import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaCloud, FaRProject, FaJira, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiMicrosoftazure, SiDocker, SiPowerbi, SiApachespark, SiGithubactions, SiDjango } from 'react-icons/si';
import { DiMysql } from 'react-icons/di';

const SkillsSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(78, 123, 255, 0.05), transparent);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
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
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const SkillsRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 2.5rem;
  backdrop-filter: blur(5px);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
    
    &:before {
      opacity: 1;
    }
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
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
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  color: var(--text-dark);
  padding: 0.8rem;
  background: rgba(240, 240, 245, 0.8);
  border-radius: 8px;
  transition: all 0.3s ease;
  
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