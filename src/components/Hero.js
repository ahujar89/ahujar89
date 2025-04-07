import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 2rem;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(78, 123, 255, 0.1), transparent 70%);
    z-index: -1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 1;
`;

const SmallText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const Name = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-medium);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  color: var(--text-medium);
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
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    background: rgba(78, 123, 255, 0.1);
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
          Software Engineer | Data Engineer/Analyst | Product/Project Manager
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          It started with curiosity, turned into passion, and now it’s what I do. I’m Rishabh, and I create for impact.
        </Description>
        
        <div>
          <Button
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </Button>
          
          <SecondaryButton
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </SecondaryButton>
        </div>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 