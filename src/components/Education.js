import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const EducationSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(225, 29, 72, 0.04), transparent);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EducationCard = styled(motion.div)`
  background: var(--background-card);
  border-radius: 20px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-4px);
  }
`;

const CardBanner = styled.div`
  height: 80px;
  background: ${({ gradient }) => gradient};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 2rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.05em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  padding-top: 0.75rem;
`;

const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin-top: -30px;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
`;

const UniversityName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 0.35rem 0;
`;

const LocationLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-medium);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;

  svg {
    color: var(--primary-color);
    flex-shrink: 0;
  }
`;

const DegreeLine = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-dark);
  margin: 0.5rem 0 0.75rem 0;
  line-height: 1.5;
`;

const GradeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(225, 29, 72, 0.1);
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.3rem 0.85rem;
  border-radius: 50px;
  margin-bottom: 0.75rem;

  svg {
    color: var(--primary-color);
    font-size: 0.8rem;
  }
`;

const UniversityDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-medium);
  margin: 0;
`;

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <EducationSection id="education" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Education
        </SectionTitle>

        <EducationGrid>
          <EducationCard
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <CardBanner gradient="linear-gradient(135deg, #e11d48, #0ea5e9)">
              <span>UWindsor</span>
            </CardBanner>
            <CardBody>
              <LogoWrapper>
                <img src="/images/uwin1.png" alt="University of Windsor" />
              </LogoWrapper>
              <UniversityName>University of Windsor</UniversityName>
              <LocationLine>
                <FaMapMarkerAlt />
                <span>Ontario, Canada</span>
              </LocationLine>
              <DegreeLine>Master of Applied Computing, Minor in Business Administration</DegreeLine>
              <GradeBadge>
                <FaStar />
                Grade: 88%
              </GradeBadge>
              <UniversityDescription>
                Enhanced my expertise in AI, data analytics, cloud computing, and cybersecurity. Combined with a minor in Business Administration, this program equipped me to integrate technical innovation with business strategy — with hands-on work in MongoDB, Apache Spark, Azure, and machine learning.
              </UniversityDescription>
            </CardBody>
          </EducationCard>

          <EducationCard
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
          >
            <CardBanner gradient="linear-gradient(135deg, #ff6b6b, #f59e0b)">
              <span>GLA</span>
            </CardBanner>
            <CardBody>
              <LogoWrapper>
                <img src="/images/GLA_University_logo.png" alt="GLA University" />
              </LogoWrapper>
              <UniversityName>GLA University</UniversityName>
              <LocationLine>
                <FaMapMarkerAlt />
                <span>India</span>
              </LocationLine>
              <DegreeLine>Bachelor of Technology in Computer Science and Engineering</DegreeLine>
              <GradeBadge>
                <FaStar />
                Grade: 80%
              </GradeBadge>
              <UniversityDescription>
                Built a strong foundation in software development, data structures, and algorithms. As VP of the Technology Club, I honed leadership and problem-solving skills while working on innovative projects — developing expertise in programming, database management, and system optimization.
              </UniversityDescription>
            </CardBody>
          </EducationCard>
        </EducationGrid>
      </Container>
    </EducationSection>
  );
};

export default Education;
