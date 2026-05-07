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
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(225, 29, 72, 0.10), transparent),
      radial-gradient(ellipse 40% 40% at 10% 70%, rgba(14, 165, 233, 0.07), transparent);
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
  background: linear-gradient(135deg, var(--text-dark) 20%, var(--primary-color) 65%, var(--secondary-color) 100%);
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
  box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
  transition: box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    color: white;
    background: var(--primary-dark);
    box-shadow: 0 0 35px rgba(225, 29, 72, 0.65);
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
    box-shadow: 0 0 16px rgba(225, 29, 72, 0.2);
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
    box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4);
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

/* ─── Aurora Sphere SVG — animations via inline <style> ──────────────── */

const AuroraSphere = () => (
  <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
      @keyframes floatB { 0%,100% { transform: translateY(-8px); } 50% { transform: translateY(8px); } }
      @keyframes floatC { 0%,100% { transform: translateY(4px); } 50% { transform: translateY(-10px); } }
      @keyframes orbPulse {
        0%,100% { filter: drop-shadow(0 0 10px rgba(225,29,72,0.4)); }
        50% { filter: drop-shadow(0 0 28px rgba(225,29,72,0.65)) drop-shadow(0 0 14px rgba(14,165,233,0.35)); }
      }
      @keyframes sparkPulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.85; } }
      .float-a  { animation: floatA 4s ease-in-out infinite; }
      .float-b  { animation: floatB 5.2s ease-in-out infinite; }
      .float-c  { animation: floatC 3.8s ease-in-out infinite; }
      .float-a2 { animation: floatA 4s ease-in-out infinite; animation-delay: -1.6s; }
      .float-b2 { animation: floatB 5.2s ease-in-out infinite; animation-delay: -2.2s; }
      .orb-pulse { animation: orbPulse 3.5s ease-in-out infinite; }
      .sp1 { animation: sparkPulse 2.2s ease-in-out infinite; }
      .sp2 { animation: sparkPulse 2.2s ease-in-out infinite; animation-delay: -0.7s; }
      .sp3 { animation: sparkPulse 2.2s ease-in-out infinite; animation-delay: -1.4s; }
    `}</style>

    <defs>
      {/* Aurora planet gradient */}
      <radialGradient id="auroraGrad" cx="38%" cy="32%" r="72%">
        <stop offset="0%"   stopColor="#fde68a" />
        <stop offset="22%"  stopColor="#f43f5e" />
        <stop offset="50%"  stopColor="#a855f7" />
        <stop offset="78%"  stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </radialGradient>

      {/* Ambient glow */}
      <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="rgba(225,29,72,0.12)" />
        <stop offset="100%" stopColor="rgba(225,29,72,0)" />
      </radialGradient>

      {/* Mini rose sphere gradient */}
      <radialGradient id="miniRoseGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%"   stopColor="#fde68a" />
        <stop offset="60%"  stopColor="#e11d48" />
        <stop offset="100%" stopColor="#be123c" />
      </radialGradient>

      {/* Mini sky sphere gradient */}
      <radialGradient id="miniSkyGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%"   stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </radialGradient>

      {/* Glow filter */}
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* A — Ambient background */}
    <circle cx="260" cy="240" r="195" fill="url(#ambientGlow)" />

    {/* B — Background decorative curves */}
    <path d="M 30 90 Q 180 40 350 110" fill="none" stroke="rgba(225,29,72,0.06)" strokeWidth="2" />
    <path d="M 450 400 Q 300 440 140 370" fill="none" stroke="rgba(14,165,233,0.06)" strokeWidth="2" />
    <path d="M 480 160 Q 420 260 480 360" fill="none" stroke="rgba(245,158,11,0.05)" strokeWidth="1.5" />

    {/* C — Three orbital ellipses */}
    <ellipse cx="260" cy="240" rx="185" ry="58" transform="rotate(-8, 260, 240)" fill="none" stroke="rgba(225,29,72,0.2)"    strokeWidth="1.5" strokeDasharray="5 7" />
    <ellipse cx="260" cy="240" rx="178" ry="54" transform="rotate(27, 260, 240)"  fill="none" stroke="rgba(14,165,233,0.15)"  strokeWidth="1.2" strokeDasharray="4 8" />
    <ellipse cx="260" cy="240" rx="170" ry="50" transform="rotate(57, 260, 240)"  fill="none" stroke="rgba(245,158,11,0.13)"  strokeWidth="1"   strokeDasharray="3 9" />

    {/* D — Satellite dots on orbital rings */}
    {/* float-a group: rose dots */}
    <g className="float-a">
      <circle cx="445" cy="240" r="7" fill="#e11d48" opacity="0.7" />
      <circle cx="75"  cy="240" r="5" fill="#e11d48" opacity="0.55" />
    </g>
    {/* float-b group: sky dots */}
    <g className="float-b">
      <circle cx="398" cy="168" r="6" fill="#0ea5e9" opacity="0.65" />
      <circle cx="122" cy="312" r="4" fill="#0ea5e9" opacity="0.5" />
    </g>
    {/* float-c group: amber dots */}
    <g className="float-c">
      <circle cx="370" cy="328" r="5" fill="#f59e0b" opacity="0.6" />
      <circle cx="150" cy="152" r="4" fill="#f59e0b" opacity="0.5" />
    </g>

    {/* E — Main Aurora Sphere */}
    {/* Outer glow */}
    <circle cx="260" cy="240" r="105" fill="url(#ambientGlow)" />
    {/* Main sphere */}
    <circle cx="260" cy="240" r="84" fill="url(#auroraGrad)" className="orb-pulse" />
    {/* Glass highlight large */}
    <circle cx="237" cy="218" r="32" fill="rgba(255,255,255,0.13)" />
    {/* Glass highlight small/bright */}
    <circle cx="231" cy="212" r="14" fill="rgba(255,255,255,0.22)" />
    {/* Sphere edge ring */}
    <circle cx="260" cy="240" r="84" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

    {/* F — Three floating abstract accent shapes */}

    {/* Shape 1 — Small aurora sphere, top-right */}
    <g className="float-a">
      <circle cx="415" cy="92" r="24" fill="url(#miniRoseGrad)" filter="url(#glow)" />
      <circle cx="409" cy="86" r="9"  fill="rgba(255,255,255,0.28)" />
    </g>

    {/* Shape 2 — Hollow amber ring, top-left */}
    <g className="float-c">
      <circle cx="94" cy="145" r="20" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.55)" strokeWidth="2.5" />
      <circle cx="94" cy="145" r="10" fill="rgba(245,158,11,0.2)" />
    </g>

    {/* Shape 3 — Small sky sphere, bottom-left */}
    <g className="float-b2">
      <circle cx="82" cy="360" r="18" fill="url(#miniSkyGrad)" filter="url(#glow)" />
      <circle cx="77" cy="355" r="7"  fill="rgba(255,255,255,0.25)" />
    </g>

    {/* Shape 4 — Tiny rose disc, bottom-right */}
    <g className="float-a2">
      <circle cx="450" cy="370" r="13" fill="rgba(225,29,72,0.25)" stroke="rgba(225,29,72,0.5)" strokeWidth="2" />
    </g>

    {/* G — Sparkle dots */}
    <circle cx="50"  cy="200" r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="55"  cy="300" r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="115" cy="75"  r="2.5" fill="#f59e0b" className="sp3" />
    <circle cx="160" cy="400" r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="460" cy="110" r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="470" cy="290" r="2.5" fill="#f59e0b" className="sp3" />
    <circle cx="480" cy="200" r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="330" cy="50"  r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="190" cy="465" r="2.5" fill="#f59e0b" className="sp3" />
    <circle cx="440" cy="440" r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="380" cy="430" r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="310" cy="460" r="2.5" fill="#f59e0b" className="sp3" />
    <circle cx="140" cy="250" r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="68"  cy="180" r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="490" cy="340" r="2.5" fill="#f59e0b" className="sp3" />
    <circle cx="360" cy="80"  r="2.5" fill="#e11d48" className="sp1" />
    <circle cx="120" cy="420" r="2.5" fill="#0ea5e9" className="sp2" />
    <circle cx="35"  cy="380" r="2.5" fill="#f59e0b" className="sp3" />
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
    'builder at heart',
    'curious by default',
    'detail-obsessed, product-minded',
    'equal parts engineer & storyteller',
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
          <AuroraSphere />
        </IllustrationWrap>
      </HeroGrid>
    </HeroSection>
  );
};

export default Hero;
