import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
  }
`;

const AboutContent = styled.div`
  flex: 1;
  
  @media (min-width: 768px) {
    max-width: 60%;
  }
`;

const AboutImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const AboutImage = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 10px,
      transparent 10px,
      transparent 20px
    );
  }
  
  @media (min-width: 768px) {
    width: 350px;
    height: 350px;
  }
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
    bottom: -5px;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-medium);
  margin-bottom: 2rem;
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.h4`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.p`
  font-size: 1rem;
  color: var(--text-medium);
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const About = () => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const stats = [
    { number: '4+', title: 'Years Experience' },
    { number: '10+', title: 'Projects Completed' },
    { number: '5+', title: 'Happy Clients' }
  ];
  
  return (
    <AboutSection id="about">
      <AboutContent ref={contentRef}>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
        >
          About Me
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Passionate Tech Professional
        </SectionSubtitle>
        
        <AboutText
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          I’m Rishabh Ahuja, a tech enthusiast and problem solver with a strong background in software development, data engineering, and cloud technologies. With experience at Infosys and TCS, I’ve built scalable web solutions, optimized data-driven processes, and led agile transformations. My expertise spans React.js, Python, and cloud platforms like Azure. I thrive on solving complex problems, building efficient systems, and continuously learning to stay ahead in the ever-evolving tech landscape.
        </AboutText>
        
        <Stats
          variants={container}
          initial="hidden"
          animate={contentInView ? "show" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatItem key={index} variants={item}>
              <StatNumber>{stat.number}</StatNumber>
              <StatTitle>{stat.title}</StatTitle>
            </StatItem>
          ))}
        </Stats>
      </AboutContent>
      
      <AboutImageContainer 
        ref={imageRef}
      >
        <AboutImage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={imageInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        />
      </AboutImageContainer>
    </AboutSection>
  );
};

export default About; 