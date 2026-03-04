import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/* ─── Keyframes (only used in regular HTML styled-components) ─────────── */

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

/* ─── Layout ───────────────────────────────────────────────────────────── */

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  overflow: hidden;
  background: var(--background-light);

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(162, 89, 255, 0.12), transparent),
      radial-gradient(ellipse 40% 40% at 10% 70%, rgba(0, 245, 212, 0.07), transparent);
    z-index: 0;
  }
`;

const HeroGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SmallText = styled(motion.p)`
  font-size: 0.85rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Name = styled(motion.h1)`
  font-size: 4.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.05;
  background: linear-gradient(135deg, #eaeaea 30%, var(--primary-color) 70%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

const TypewriterRow = styled(motion.div)`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.6rem;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const TypeLabel = styled.span`
  color: var(--primary-light);
  font-weight: 600;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: var(--primary-color);
  border-radius: 1px;
  animation: ${blink} 1s step-end infinite;
  vertical-align: middle;
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2.2rem;
  max-width: 500px;
  color: var(--text-medium);
`;

const ButtonRow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const MagWrap = styled.span`
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1);
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.8rem;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 0 20px rgba(162, 89, 255, 0.4);
  transition: box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    color: white;
    background: var(--primary-dark);
    box-shadow: 0 0 35px rgba(162, 89, 255, 0.65);
  }
`;

const OutlineBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.8rem;
  background: transparent;
  color: var(--text-dark);
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    box-shadow: 0 0 16px rgba(162, 89, 255, 0.2);
  }
`;

const SocialRow = styled(motion.div)`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--background-card);
  color: var(--text-medium);
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(162, 89, 255, 0.4);
  }
`;

const IllustrationWrap = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    max-width: 520px;
    height: auto;
  }

  @media (max-width: 900px) {
    svg { max-width: 340px; }
  }
`;

/* ─── AI Explorer SVG — animations via inline <style> ─────────────────── */

const AIIllustration = () => (
  <svg viewBox="0 0 480 440" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes floatA {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-12px); }
      }
      @keyframes floatB {
        0%, 100% { transform: translateY(-8px); }
        50%       { transform: translateY(6px); }
      }
      @keyframes floatC {
        0%, 100% { transform: translateY(4px); }
        50%       { transform: translateY(-10px); }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 0.7; }
        50%       { opacity: 1; }
      }
      @keyframes dashMove {
        to { stroke-dashoffset: -40; }
      }
      @keyframes screenFlicker {
        0%, 88%, 100% { opacity: 1; }
        93%           { opacity: 0.45; }
      }
      @keyframes glowPulse {
        0%, 100% { filter: drop-shadow(0 0 5px #a259ff); }
        50%       { filter: drop-shadow(0 0 14px #a259ff) drop-shadow(0 0 5px #00f5d4); }
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      .float-a  { animation: floatA  4s   ease-in-out infinite; }
      .float-b  { animation: floatB  5s   ease-in-out infinite; }
      .float-c  { animation: floatC  3.5s ease-in-out infinite; }
      .glow     { animation: glowPulse 3s ease-in-out infinite; }
      .screen   { animation: screenFlicker 8s ease-in-out infinite; }
      .dash     { stroke-dasharray: 6 4; animation: dashMove 1.6s linear infinite; }
      .pulse    { animation: pulseDot 2s ease-in-out infinite; }
      .cursor-b { animation: cursorBlink 1s step-end infinite; }
    `}</style>

    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="55%" r="45%">
        <stop offset="0%" stopColor="#a259ff" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#a259ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a259ff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#a259ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a259ff" />
        <stop offset="100%" stopColor="#00f5d4" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Ambient glow */}
    <ellipse cx="240" cy="240" rx="200" ry="180" fill="url(#bgGlow)" />

    {/* ── Neural network — top, float group A ── */}
    <g className="float-a">
      <line x1="75"  y1="55"  x2="155" y2="95"  stroke="#a259ff" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="155" y1="95"  x2="235" y2="55"  stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="235" y1="55"  x2="335" y2="80"  stroke="#a259ff" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="155" y1="95"  x2="195" y2="150" stroke="#a259ff" strokeWidth="1" strokeOpacity="0.3"  />
      <line x1="235" y1="55"  x2="195" y2="150" stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.3"  />
      <line x1="335" y1="80"  x2="390" y2="130" stroke="#a259ff" strokeWidth="1" strokeOpacity="0.25" />

      {/* Animated dash lines */}
      <line className="dash" x1="155" y1="95"  x2="195" y2="150" stroke="#00f5d4" strokeWidth="1.5" strokeOpacity="0.55" />
      <line className="dash" x1="235" y1="55"  x2="335" y2="80"  stroke="#a259ff" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Nodes */}
      <g className="glow">
        <circle cx="75"  cy="55"  r="8"  fill="none" stroke="#a259ff" strokeWidth="1.5" />
        <circle cx="75"  cy="55"  r="4"  fill="#a259ff" className="pulse" />
      </g>
      <circle cx="155" cy="95"  r="11" fill="none" stroke="#00f5d4" strokeWidth="1.5" filter="url(#glow)" />
      <circle cx="155" cy="95"  r="5"  fill="#00f5d4" opacity="0.9" />
      <circle cx="235" cy="55"  r="8"  fill="none" stroke="#a259ff" strokeWidth="1.5" />
      <circle cx="235" cy="55"  r="4"  fill="#a259ff" className="pulse" />
      <circle cx="335" cy="80"  r="11" fill="none" stroke="#00f5d4" strokeWidth="1.5" filter="url(#glow)" />
      <circle cx="335" cy="80"  r="5"  fill="#00f5d4" opacity="0.8" />
      <circle cx="195" cy="150" r="9"  fill="none" stroke="#a259ff" strokeWidth="1.5" />
      <circle cx="195" cy="150" r="4"  fill="#a259ff" opacity="0.7" />
      <circle cx="390" cy="130" r="7"  fill="none" stroke="#00f5d4" strokeWidth="1.5" />
      <circle cx="390" cy="130" r="3"  fill="#00f5d4" opacity="0.6" />
    </g>

    {/* ── Floating bar chart — float group B ── */}
    <g className="float-b">
      <rect x="385" y="155" width="11" height="35" rx="3" fill="#a259ff" opacity="0.6" />
      <rect x="400" y="138" width="11" height="52" rx="3" fill="#00f5d4" opacity="0.7" />
      <rect x="415" y="147" width="11" height="43" rx="3" fill="#a259ff" opacity="0.5" />
      <rect x="430" y="128" width="11" height="62" rx="3" fill="#00f5d4" opacity="0.6" />
      <line x1="381" y1="194" x2="448" y2="194" stroke="#555570" strokeWidth="1" />
      <text x="414" y="210" fill="#555570" fontSize="9" textAnchor="middle" fontFamily="monospace">impact</text>
    </g>

    {/* ── Floating tag chips — float group C ── */}
    <g className="float-c">
      <rect x="12"  y="90"  width="72" height="24" rx="12" fill="#16161f" stroke="#a259ff" strokeWidth="1" strokeOpacity="0.6" />
      <text x="48"  y="106" fill="#a259ff" fontSize="10" textAnchor="middle" fontFamily="monospace">Python 🐍</text>
      <rect x="20"  y="130" width="64" height="22" rx="11" fill="#16161f" stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.5" />
      <text x="52"  y="145" fill="#00f5d4" fontSize="9"  textAnchor="middle" fontFamily="monospace">React ⚛</text>
      <rect x="8"   y="168" width="68" height="22" rx="11" fill="#16161f" stroke="#a259ff" strokeWidth="1" strokeOpacity="0.4" />
      <text x="42"  y="183" fill="#a259ff" fontSize="9"  textAnchor="middle" fontFamily="monospace">AI / ML 🤖</text>
    </g>

    {/* ── Monitor ── */}
    <rect x="118" y="210" width="224" height="148" rx="12" fill="#0d0d12" stroke="url(#grad1)" strokeWidth="1.8" />
    <rect x="128" y="220" width="204" height="126" rx="7"  fill="#080810" />
    <rect x="128" y="220" width="204" height="126" rx="7"  fill="url(#screenGlow)" opacity="0.4" />

    {/* Screen code lines */}
    <g className="screen">
      <rect x="142" y="234" width="72"  height="5" rx="2" fill="#a259ff" opacity="0.9" />
      <rect x="142" y="246" width="110" height="5" rx="2" fill="#00f5d4" opacity="0.7" />
      <rect x="142" y="258" width="55"  height="5" rx="2" fill="#a259ff" opacity="0.5" />
      <rect x="142" y="270" width="90"  height="5" rx="2" fill="#00f5d4" opacity="0.6" />
      <rect x="142" y="282" width="65"  height="5" rx="2" fill="#9090aa" opacity="0.4" />
      <rect x="142" y="294" width="85"  height="5" rx="2" fill="#a259ff" opacity="0.7" />
      <rect x="142" y="306" width="48"  height="5" rx="2" fill="#00f5d4" opacity="0.5" />
      <rect x="142" y="318" width="78"  height="5" rx="2" fill="#a259ff" opacity="0.4" />
      <rect x="196" y="330" width="5"   height="9" rx="1" fill="#00f5d4" opacity="0.9" className="cursor-b" />
    </g>

    {/* Monitor stand */}
    <rect x="218" y="358" width="24" height="14" rx="2"   fill="#1a1a28" />
    <rect x="196" y="370" width="68" height="5"  rx="2.5" fill="#1a1a28" />

    {/* Desk */}
    <rect x="50" y="374" width="380" height="10" rx="5" fill="#1a1a28" />

    {/* ── Person ── */}
    {/* Head */}
    <circle cx="370" cy="295" r="28" fill="#1e1a3a" stroke="#a259ff" strokeWidth="1.5" strokeOpacity="0.6" />
    {/* Hair */}
    <path d="M346 283 Q370 268 394 283" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />
    {/* Glasses */}
    <rect x="355" y="290" width="14" height="10" rx="4" fill="none" stroke="#00f5d4" strokeWidth="1.2" strokeOpacity="0.5" />
    <rect x="371" y="290" width="14" height="10" rx="4" fill="none" stroke="#00f5d4" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="369" y1="295" x2="371" y2="295" stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.5" />
    {/* Eyes */}
    <circle cx="362" cy="296" r="3.5" fill="#00f5d4" opacity="0.8" />
    <circle cx="378" cy="296" r="3.5" fill="#00f5d4" opacity="0.8" />
    {/* Smile */}
    <path d="M361 306 Q370 312 379 306" fill="none" stroke="#a259ff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    {/* Body */}
    <path d="M336 323 Q353 315 370 320 Q387 315 404 323 L410 374 L330 374 Z" fill="#1e1a3a" />
    <path d="M358 320 L363 345 L377 345 L372 320" fill="none" stroke="#a259ff" strokeWidth="1" strokeOpacity="0.3" />
    {/* Arms */}
    <path d="M336 332 Q310 345 290 368" stroke="#1e1a3a" strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M404 332 Q420 342 425 355" stroke="#1e1a3a" strokeWidth="12" strokeLinecap="round" fill="none" />
    <ellipse cx="290" cy="368" rx="11" ry="6" fill="#2a1f4a" />
    <ellipse cx="425" cy="355" rx="9"  ry="5.5" fill="#2a1f4a" />
    {/* Keyboard */}
    <rect x="292" y="362" width="130" height="8" rx="4" fill="#1a1a28" stroke="#a259ff" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Chair */}
    <rect x="325" y="332" width="10" height="50" rx="4" fill="#161624" stroke="#a259ff" strokeWidth="0.5" strokeOpacity="0.2" />
    <rect x="325" y="375" width="90" height="8"  rx="4" fill="#161624" />
    <rect x="340" y="383" width="7"  height="22"       fill="#161624" />
    <rect x="373" y="383" width="7"  height="22"       fill="#161624" />
    <rect x="325" y="400" width="75" height="5"  rx="2.5" fill="#161624" />

    {/* ── Data flow dashes from head to screen ── */}
    <path className="dash" d="M360 267 Q310 245 285 230" stroke="#a259ff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
    <path className="dash" d="M380 267 Q400 250 380 230" stroke="#00f5d4" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />

    {/* ── AI badge near head — float B ── */}
    <g className="float-b">
      <rect x="400" y="258" width="58" height="20" rx="10" fill="#16161f" stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.6" />
      <text x="429" y="272" fill="#00f5d4" fontSize="9.5" textAnchor="middle" fontFamily="monospace">AI Mode 🧠</text>
    </g>

    {/* Sparkles */}
    <circle cx="100" cy="210" r="2.5" fill="#00f5d4" opacity="0.5" />
    <circle cx="445" cy="215" r="2"   fill="#a259ff" opacity="0.45" />
    <circle cx="58"  cy="290" r="2"   fill="#a259ff" opacity="0.35" />
    <circle cx="458" cy="295" r="3"   fill="#00f5d4" opacity="0.4" />
    <circle cx="110" cy="350" r="2"   fill="#00f5d4" opacity="0.4" />
  </svg>
);

/* ─── Magnetic button ─────────────────────────────────────────────────── */

const MagneticButton = ({ href, variant = 'primary', children }) => {
  const wrapRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.32;
    const y = (e.clientY - (top + height / 2)) * 0.32;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (wrapRef.current) wrapRef.current.style.transform = 'translate(0,0)';
  }, []);

  return (
    <MagWrap ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      {variant === 'primary'
        ? <PrimaryBtn href={href}>{children}</PrimaryBtn>
        : <OutlineBtn href={href}>{children}</OutlineBtn>
      }
    </MagWrap>
  );
};

/* ─── Typewriter hook ─────────────────────────────────────────────────── */

const useTypewriter = (words, typingSpeed = 90, deletingSpeed = 55, pauseTime = 2200) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((p) => (p + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

/* ─── Hero component ──────────────────────────────────────────────────── */

const Hero = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const roles = [
    'Data Scientist & Analyst',
    'Frontend Developer',
    'AI Data Reviewer',
    'Business Analyst',
  ];

  const typedText = useTypewriter(roles);

  return (
    <HeroSection id="home" ref={ref}>
      <HeroGrid>
        {/* ── Left ── */}
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

          <TypewriterRow
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TypeLabel>{typedText}</TypeLabel>
            <Cursor />
          </TypewriterRow>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Part builder, part analyst, always curious — I create digital solutions that are
            thoughtful, data-informed, and user-first.
          </Description>

          <ButtonRow
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MagneticButton href="#projects" variant="primary">Explore my work</MagneticButton>
            <MagneticButton href="#contact" variant="outline">Let's connect</MagneticButton>
          </ButtonRow>

          <SocialRow
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
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
          </SocialRow>
        </HeroContent>

        {/* ── Right — illustration ── */}
        <IllustrationWrap
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <AIIllustration />
        </IllustrationWrap>
      </HeroGrid>
    </HeroSection>
  );
};

export default Hero;
