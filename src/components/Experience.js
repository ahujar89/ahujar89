import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ExperienceSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(78, 123, 255, 0.05), transparent);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  color: var(--text-dark);
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2.5rem;
  height: 100%;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: var(--card-bg);
    z-index: 1;
  }
  
  ${ExperienceCard}:hover & {
    transform: scale(1.1);
  }
`;

const CompanyLogo = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  padding: 0.5rem;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.8rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const JobTitle = styled.h4`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Duration = styled.p`
  font-size: 1rem;
  color: var(--text-medium);
  display: inline-block;
  padding: 0.3rem 1rem;
  background: rgba(78, 123, 255, 0.1);
  border-radius: 20px;
`;


const Description = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-medium);
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), transparent);
  }
`;

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const experiences = [
    {
      company: "Infosys Ltd.",
      logo: "/images/infy-logo.jpg",
      role: "Business Analyst",
      period: "2022-2024",
      description: "At Infosys, I specialized in developing scalable web solutions, driving agile transformations, and optimizing data-driven processes. I built over 10 web sales pages for a $20M telecom project, increasing customer acquisition by 65%. By implementing test-driven development and structuring comprehensive test cases, I reduced QA bugs by 40%. Additionally, I led a digital transformation project for SAP Labs, enhancing knowledge transfer efficiency by 70%. My ability to analyze e-commerce trends and implement data-driven solutions improved data availability by 25%, earning recognition for problem-solving and innovation"
    },
    {
      company: "Tata Consultancy Services",
      logo: "/images/tcs-logo.png",
      role: "Systems Engineer",
      period: "2019-2022",
      description: "At Tata Consultancy Services (TCS), I excelled in optimizing cloud-based e-commerce platforms, implementing data-driven strategies, and enhancing system efficiency for global clients like BMW and HP. I played a key role in driving a 30% increase in NPS by improving platform performance and led a successful rollout strategy that achieved a 95% user adoption rate. My expertise in automation and data analytics streamlined SAP build processes, boosting efficiency by 30% across multiple teams. Recognized with the SAP Appreciation Award and multiple performance accolades, I thrived in delivering impactful technical solutions at scale."
    }
  ];

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Professional Experience
          </SectionTitle>
        </SectionHeader>
  
        <ExperienceGrid>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <CompanyHeader>
                <LogoContainer>
                  <CompanyLogo src={exp.logo} alt={`${exp.company} logo`} />
                </LogoContainer>
                <CompanyInfo>
                  <CompanyName>{exp.company}</CompanyName>
                  <JobTitle>{exp.role}</JobTitle>
                  <Duration>{exp.period}</Duration>
                </CompanyInfo>
              </CompanyHeader>
              <Description>{exp.description}</Description>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </Container>
    </ExperienceSection>
    );
  };
  
  export default Experience;