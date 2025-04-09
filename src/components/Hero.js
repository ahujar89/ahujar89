import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 2rem;
  overflow: hidden;
  background-color: var(--background-light-accent);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(78, 123, 255, 0.1), transparent 70%);
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/tech-bg.png');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 0;
    filter: grayscale(100%) contrast(120%);
  }
    @media (max-width: 768px) {
    padding: 6rem 1rem;
    align-items: center;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 2;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const SmallText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const Name = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin-right: 1rem;
  box-shadow: var(--shadow);
  
  &:hover {
    opacity: 0.9;
    color: white;
  }

   @media (max-width: 768px) {
    display: block;
    width: 100%;
    margin-right: 0;
    padding: 1rem;
    font-size: 0.95rem;
    text-align: center;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 1.5rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background-card);
  color: var(--text-light);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  
  &:hover {
    background: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
  }

   @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  filter: blur(10px);
`;

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const shapes = [
    { top: '10%', right: '10%', size: 100, color: 'var(--primary-color)', opacity: 0.4 },
    { top: '60%', right: '20%', size: 150, color: 'var(--secondary-color)', opacity: 0.3 },
    { top: '30%', right: '30%', size: 200, color: 'var(--accent-color)', opacity: 0.2 },
    { top: '70%', left: '10%', size: 120, color: 'var(--primary-color)', opacity: 0.2 },
  ];
  
  return (
    <HeroSection id="home" ref={ref}>
      <FloatingShapes>
        {shapes.map((shape, i) => (
          <Shape
            key={i}
            size={shape.size}
            color={shape.color}
            opacity={shape.opacity}
            style={{ top: shape.top, right: shape.right, left: shape.left }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: shape.opacity } : {}}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        ))}
      </FloatingShapes>
      
      <HeroContent>
        <SmallText
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Hello, I'm
        </SmallText>
        
        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Rishabh Ahuja
        </Name>
        
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Bridging Frontend Craft & Data Insight to Build Purposeful Digital Products
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
            What began as a spark of curiosity has grown into a passion for solving real problems through technology. I’m Rishabh — part builder, part analyst, always curious and I create digital solutions that are thoughtful, data-informed, and user-first.        </Description>
        
        <div>
         
      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore my work
        </Button>
        
        <Button
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reach out, I'd love to connect!
        </Button>
      </ButtonContainer>
        </div>
        
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SocialLink href="https://github.com/ahujar89" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/rishabhahuja2507/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="https://twitter.com/ahujar96" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialLink>
        </SocialLinks>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;