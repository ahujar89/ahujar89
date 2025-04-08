import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowUp } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 3rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
  border-top: 1px solid var(--border-color);
`;

const FooterLogo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  padding: 2px;
  background: var(--card-bg);
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-medium);
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: var(--text-medium);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const BackToTop = styled(motion.div)`
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  width: 40px;
  height: 40px;
  background: var(--card-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--border-color);
  color: var(--primary-color);
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover {
    background: var(--primary-color);
    color: white;
  }
  
  @media (max-width: 768px) {
    right: 1rem;
    bottom: 5rem;
  }
`;

const Heart = styled.span`
  color: #ff4f6f;
  display: inline-block;
  margin: 0 0.2rem;
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
        <FooterLogo src="/images/rishabh.jpg" alt="Logo" />
          <Copyright>
            © {currentYear} Rishabh Ahuja. All rights reserved. Crafted with <Heart><FaHeart /></Heart> in React.
          </Copyright>
        </FooterLeft>
        
        
      </FooterContent>
      
      <BackToTop
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </BackToTop>
    </FooterContainer>
  );
};

export default Footer; 