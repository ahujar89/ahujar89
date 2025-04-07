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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const AboutParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
`;

const AboutImage = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow);
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(78, 123, 255, 0.3), rgba(0, 206, 201, 0.3));
    opacity: 0.5;
    z-index: 1;
    mix-blend-mode: overlay;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: contrast(1.1) brightness(1.05) opacity(0.9);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      filter: contrast(1.2) brightness(1.1) opacity(1);
    }
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
              href="/file:///Users/rishabhahuja/Desktop/Resumes/Resume_DT_UwinApply.pdf"
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