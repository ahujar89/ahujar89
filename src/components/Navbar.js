import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  background-color: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 10;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
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
    background-color: var(--text-light);
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
    background-color: var(--background-dark);
    z-index: 99;
    padding: 2rem;
  }
`;

const MobileNavItem = styled(motion.a)`
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--primary-light);
    
    &:after {
      width: 100%;
    }
  }
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
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navItems = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'];
  
  // Sophisticated animation variants for the logo
  const logoVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      y: 0,
      color: "var(--primary-color)"
    },
    animate: { 
      scale: [1, 1.03, 1.05, 1.03, 1],
      rotate: [0, -2, 2, -1, 0],
      y: [0, -2, 0, 2, 0],
      color: [
        "var(--primary-color)", 
        "var(--secondary-color)", 
        "var(--primary-color)", 
        "var(--secondary-color)", 
        "var(--primary-color)"
      ],
      transition: { 
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  };
  
  return (
    <Nav 
      scrolled={scrolled}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <Logo 
          href="#home" 
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          RA
        </Logo>
        <NavItems>
          {navItems.map((item, i) => (
            <NavItem 
              key={item} 
              href={`#${item.toLowerCase()}`}
              variants={itemVariants}
              custom={i}
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
      </Container>
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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