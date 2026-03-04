import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain } from 'react-icons/fa';

/* ─── Keyframes ──────────────────────────────────────────────────────── */

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ─── Section ─────────────────────────────────────────────────────────── */

const Section = styled.section`
  padding: 7rem 2rem;
  background: var(--background-light-accent);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 40% at 95% 5%,  rgba(162, 89, 255, 0.08), transparent),
      radial-gradient(ellipse 35% 30% at 5%  95%, rgba(0, 245, 212, 0.06), transparent);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* ─── Header ──────────────────────────────────────────────────────────── */

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text-dark);
  display: inline-block;
  position: relative;
  margin-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 44px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const SectionSub = styled(motion.p)`
  margin-top: 1.4rem;
  color: var(--text-medium);
  font-size: 0.95rem;
`;

/* ─── Tabbed panel layout ─────────────────────────────────────────────── */

const TabPanel = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0;
  background: var(--background-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  overflow: hidden;
  min-height: 380px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

/* Left tab list */
const TabList = styled.div`
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  background: rgba(162, 89, 255, 0.03);

  @media (max-width: 700px) {
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 0;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: background 0.2s ease;
  border-left: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  background: ${props => props.active ? 'rgba(162, 89, 255, 0.08)' : 'transparent'};

  &:hover {
    background: rgba(162, 89, 255, 0.05);
  }

  @media (max-width: 700px) {
    border-left: none;
    border-bottom: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
    flex-shrink: 0;
    padding: 0.8rem 1rem;
  }
`;

const TabLogo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
  background: var(--background-light);
`;

const TabLogoImg = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const TabIconWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 1rem;
`;

const TabText = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

const TabCompany = styled.p`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${props => props.active ? 'var(--primary-light)' : 'var(--text-dark)'};
  line-height: 1.2;
  transition: color 0.2s;
`;

const TabRole = styled.p`
  font-size: 0.72rem;
  color: var(--text-medium);
  margin-top: 0.15rem;
`;

/* Right detail panel */
const DetailPanel = styled.div`
  padding: 2.2rem 2.5rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 1.5rem;
  }
`;

const DetailHeader = styled.div`
  margin-bottom: 1.4rem;
`;

const DetailCompany = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.3rem;
`;

const DetailRole = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
  margin-bottom: 0.6rem;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DurationBadge = styled.span`
  font-size: 0.75rem;
  color: var(--text-medium);
  padding: 0.25rem 0.75rem;
  background: rgba(162, 89, 255, 0.1);
  border-radius: 20px;
  font-weight: 500;
`;

const FreelanceBadge = styled.span`
  font-size: 0.72rem;
  color: var(--secondary-color);
  padding: 0.25rem 0.7rem;
  background: rgba(0, 245, 212, 0.1);
  border-radius: 20px;
  font-weight: 700;
  border: 1px solid rgba(0, 245, 212, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin-bottom: 1.4rem;
`;

const DetailDesc = styled.p`
  font-size: 0.92rem;
  line-height: 1.85;
  color: var(--text-medium);
`;

const CornerAccent = styled.div`
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(162, 89, 255, 0.08), transparent);
  pointer-events: none;
`;

/* ─── Data ────────────────────────────────────────────────────────────── */

const experiences = [
  {
    company: 'Outlier',
    icon: <FaBrain />,
    role: 'AI Data Reviewer',
    period: 'Sept 2025 – Present',
    freelance: true,
    description:
      'Working as a freelance AI Data Reviewer, evaluating and annotating AI-generated outputs to improve model accuracy and safety. Reviewing model responses for quality, coherence, and factual correctness across a range of domains, providing structured feedback to support LLM training and fine-tuning pipelines.',
  },
  {
    company: 'Jaguar Land Rover',
    logo: '/images/JLRlogo.png',
    role: 'Data Science Intern',
    period: 'May 2025 – Aug 2025',
    description:
      'Designed and implemented scalable data pipelines to ingest, clean, and transform large image and sensor datasets. Developed evaluation frameworks applying statistical metrics to benchmark model performance. Automated reporting workflows and built dashboards to communicate insights to engineers and product managers.',
  },
  {
    company: 'Infosys Ltd.',
    logo: '/images/infy-logo.jpg',
    role: 'Business Analyst',
    period: '2022 – 2024',
    description:
      'Built 10+ web sales pages for a $20M telecom project, increasing customer acquisition by 65%. Implemented test-driven development, reducing QA bugs by 40%. Led a digital transformation project for SAP Labs enhancing knowledge transfer efficiency by 70%. Data-driven solutions improved data availability by 25%.',
  },
  {
    company: 'Tata Consultancy Services',
    logo: '/images/tcs-logo.png',
    role: 'Systems Engineer',
    period: '2019 – 2022',
    description:
      'Optimised cloud-based e-commerce platforms for global clients including BMW and HP. Drove a 30% increase in NPS through platform performance improvements and led a rollout strategy achieving 95% user adoption. Automation work streamlined SAP build processes by 30%. Recognised with the SAP Appreciation Award.',
  },
];

/* ─── Component ───────────────────────────────────────────────────────── */

const Experience = () => {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const exp = experiences[active];

  return (
    <Section id="experience" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Professional Experience
          </SectionTitle>
          <SectionSub
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            A track record of delivering impact across tech, analytics, and AI.
          </SectionSub>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          <TabPanel>
            {/* ─ Tab list ─ */}
            <TabList>
              {experiences.map((e, i) => (
                <Tab key={i} active={i === active} onClick={() => setActive(i)}>
                  <TabLogo>
                    {e.icon
                      ? <TabIconWrap>{e.icon}</TabIconWrap>
                      : <TabLogoImg src={e.logo} alt={e.company} />
                    }
                  </TabLogo>
                  <TabText>
                    <TabCompany active={i === active}>{e.company}</TabCompany>
                    <TabRole>{e.role}</TabRole>
                  </TabText>
                </Tab>
              ))}
            </TabList>

            {/* ─ Detail panel ─ */}
            <DetailPanel>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.28 }}
                >
                  <DetailHeader>
                    <DetailCompany>{exp.company}</DetailCompany>
                    <DetailRole>{exp.role}</DetailRole>
                    <BadgeRow>
                      <DurationBadge>{exp.period}</DurationBadge>
                      {exp.freelance && <FreelanceBadge>Freelance</FreelanceBadge>}
                    </BadgeRow>
                  </DetailHeader>
                  <Divider />
                  <DetailDesc>{exp.description}</DetailDesc>
                </motion.div>
              </AnimatePresence>
              <CornerAccent />
            </DetailPanel>
          </TabPanel>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Experience;
