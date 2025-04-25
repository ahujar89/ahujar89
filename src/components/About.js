import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload } from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
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
    padding: 0 1.5rem;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 auto;
    
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const AboutParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow);
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
    order: -1; // Moves image to top on mobile
  }
  
  @media (max-width: 480px) {
    width: 240px;
    height: 240px;
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 1rem;
  align-self: flex-start;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    align-self: center;
    padding: 1rem 2rem; // Larger touch target for mobile
    margin-top: 1.5rem;
  }
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <AboutContent>
          <AboutText>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              About Me
            </SectionTitle>
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
                I'm a driven and curious software developer with a passion for creating seamless digital experiences and uncovering insights through data. With a background in frontend development and growing expertise in data analytics and engineering, I strive to bridge the gap between intuitive design and intelligent, data-driven systems.
            </AboutParagraph>
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
                My journey started with a fascination for how the web works, which evolved into a deeper interest in technologies like React.js, Node.js, and cloud platforms. I enjoy designing responsive interfaces and working with data pipelines that turn complex information into meaningful outcomes — always with a focus on real-world impact.
            </AboutParagraph>
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
                Beyond the screen, I draw inspiration from everyday moments — observing how people engage with technology, chasing ideas that fuel curiosity, and bringing a thoughtful, creative approach to every project. I bring a unique mix of perspective, passion, and persistence — and I'm here to build what matters.                </AboutParagraph>
            <DownloadButton
              href="https://drive.google.com/file/d/1I1q5pmU26uUAME9i47MFIcvfneauLB2I/view?usp=drive_link"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Resume
            </DownloadButton>
          </AboutText>
          <AboutImage
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/profile.jpeg" alt="Rishabh Ahuja" />
          </AboutImage>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
