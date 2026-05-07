import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 0.85rem 0;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  background-color: ${props => props.scrolled ? 'rgba(255, 249, 251, 0.96)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(18px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(18px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 1px 0 rgba(225, 29, 72, 0.1), 0 4px 24px rgba(225, 29, 72, 0.07)' : 'none'};
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
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.3s ease;
    border: 2px solid rgba(225, 29, 72, 0.25);
    box-shadow: 0 0 10px rgba(225, 29, 72, 0.2);
  }

  &:hover img {
    box-shadow: 0 0 20px rgba(225, 29, 72, 0.5), 0 0 36px rgba(14, 165, 233, 0.25);
    border-color: var(--primary-color);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.15rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled.a`
  color: var(--text-medium);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(225, 29, 72, 0.08);
    color: var(--primary-color);
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CtaBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50px;
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 14px rgba(225, 29, 72, 0.28);
  transition: background 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--primary-dark);
    color: white;
    box-shadow: 0 4px 22px rgba(225, 29, 72, 0.42);
  }

  @media (max-width: 900px) { display: none; }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1000;
  flex-direction: column;
  gap: 5px;
  padding: 0.35rem;

  @media (max-width: 900px) { display: flex; }

  span {
    display: block;
    width: 23px;
    height: 2.5px;
    background: var(--text-dark);
    border-radius: 2px;
    transition: all 0.28s ease;

    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(-4px, 6px)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
      transform: ${({ isOpen }) => isOpen ? 'scaleX(0)' : 'none'};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(-4px, -6px)' : 'none'};
    }
  }
`;

const MobileOverlay = styled(motion.div)`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.75rem;
    position: fixed;
    inset: 0;
    background: rgba(255, 249, 251, 0.97);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    z-index: 99;
  }
`;

const MobileLink = styled(motion.a)`
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;

  &:hover { color: var(--primary-color); }
`;

const MobileCtaBtn = styled(motion.a)`
  margin-top: 0.5rem;
  padding: 0.7rem 2.2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 18px rgba(225, 29, 72, 0.3);

  &:hover { color: white; }
`;

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
};

const logoVariants = {
  initial: { scale: 1, rotate: 0, y: 0, filter: "hue-rotate(0deg)" },
  animate: {
    scale: [1, 1.05, 1.08, 1.05, 1],
    rotate: [0, -3, 3, -2, 0],
    y: [0, -3, 0, 3, 0],
    filter: ["hue-rotate(0deg)", "hue-rotate(10deg)", "hue-rotate(-5deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }
  },
  hover: {
    scale: [1.2, 1.25, 1.2],
    rotate: [0, 10, -10, 5, 0],
    y: [0, -5, 5, -3, 0],
    filter: ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(-20deg)", "hue-rotate(40deg)", "hue-rotate(0deg)"],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
  },
  tap: { scale: 0.9, rotate: 15, transition: { duration: 0.1 } }
};

const navItems = ['Home', 'About', 'Education', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsOpen(false);

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
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => {
            const event = new MouseEvent('mousedown', {
              clientX: window.innerWidth * 0.1,
              clientY: 50,
              bubbles: true
            });
            document.dispatchEvent(event);
          }}
        >
          <img src="/images/rishabh.jpg" alt="Rishabh Ahuja" />
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </NavLink>
          ))}
        </NavLinks>

        <NavRight>
          <CtaBtn
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
          </CtaBtn>

          <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </Hamburger>
        </NavRight>
      </Container>

      {isOpen && (
        <MobileOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {navItems.map((item, i) => (
            <MobileLink
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={close}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
            >
              {item}
            </MobileLink>
          ))}
          <MobileCtaBtn
            href="#contact"
            onClick={close}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.06 + 0.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
          </MobileCtaBtn>
        </MobileOverlay>
      )}
    </Nav>
  );
};

export default Navbar;
