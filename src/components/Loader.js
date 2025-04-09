import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--background-dark);
`;

const LogoContainer = styled(motion.div)`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const ProgressBar = styled(motion.div)`
  width: 200px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--accent-color));
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LogoContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🙈 Trying my best to impress you... just a sec!
      </LogoContainer>
      <ProgressBar>
        <Progress
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </ProgressBar>
    </LoaderContainer>
  );
};

export default Loader; 