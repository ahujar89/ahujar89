import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  background-color: ${({ scrolled }) => scrolled ? 'rgba(246, 249, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ scrolled }) => scrolled ? 'var(--shadow)' : 'none'};
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 1px;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.a)`
  color: var(--text-dark);
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  div {
    width: 25px;
    height: 3px;
    background-color: var(--text-dark);
    margin: 5px 0;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'};
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-light);
    z-index: 99;
    padding: 2rem;
  }
`;

const MobileNavItem = styled(motion.a)`
  color: var(--text-dark);
  font-size: 1.5rem;
  cursor: pointer;
`;

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.2 + i * 0.1, duration: 0.5 } 
  })
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
  
  return (
    <Nav 
      scrolled={scrolled}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Logo>PORTFOLIO</Logo>
      
      <NavItems>
        {navItems.map((item, i) => (
          <NavItem 
            key={item} 
            href={`#${item.toLowerCase()}`}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {item}
          </NavItem>
        ))}
      </NavItems>
      
      <MobileMenuButton isOpen={isOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </MobileMenuButton>
      
      {isOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, i) => (
            <MobileNavItem 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              {item}
            </MobileNavItem>
          ))}
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar; 