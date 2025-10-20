import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const EducationSection = styled.section`
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

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const EducationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const UniversityImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
`;

const EducationContent = styled.div`
  flex: 1;
`;

const UniversityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UniversityName = styled.h3`
  font-size: 1.5rem;
  color: var(--text-dark);
  margin: 0;
`;

const UniversityLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-medium);
  font-size: 0.9rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const UniversityDegree = styled.h4`
  font-size: 1.2rem;
  color: var(--text-dark);
  margin: 0.5rem 0;
`;

const UniversityYear = styled.p`
  font-size: 1rem;
  color: var(--text-medium);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const UniversityGrade = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5rem 0;
  
  svg {
    color: var(--primary-color);
  }
`;

const UniversityDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-medium);
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
            <UniversityImage>
              <img src="/images/uwin1.png" alt="University of Windsor" />
            </UniversityImage>
            <UniversityInfo>
              <UniversityName>University of Windsor</UniversityName>
              <UniversityLocation>
                <FaMapMarkerAlt />
                <span>Ontario, Canada</span>
              </UniversityLocation>
              <UniversityDegree>Master of Applied Computing, Minor in Business Administration</UniversityDegree>
              <UniversityGrade>
                <FaStar />
                <span>Grade: 88%</span>
              </UniversityGrade>
              <UniversityDescription>
                Enhanced my expertise in AI, data analytics, cloud computing, and cybersecurity. Combined with a minor in Business Administration, this program has equipped me with the ability to integrate technical innovation with business strategy. With hands-on experience in MongoDB, Apache Spark, Azure, and machine learning, I am well-prepared to develop AI-driven, data-centric solutions that enhance efficiency and drive business growth—an invaluable asset for solving complex industry challenges.
              </UniversityDescription>
            </UniversityInfo>
          </EducationCard>
          
          <EducationCard
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <UniversityImage>
              <img src="/images/GLA_University_logo.png" alt="GLA University" />
            </UniversityImage>
            <UniversityInfo>
              <UniversityName>GLA University</UniversityName>
              <UniversityLocation>
                <FaMapMarkerAlt />
                <span>India</span>
              </UniversityLocation>
              <UniversityDegree>Bachelor of Technology in Computer Science and Engineering</UniversityDegree>
              <UniversityGrade>
                <FaStar />
                <span>Grade: 80%</span>
              </UniversityGrade>
              <UniversityDescription>
                I built a strong foundation in software development, data structures, and algorithms. As the VP of the Technology Club, I honed my leadership and problem-solving skills while working on innovative projects. My coursework and hands-on experience helped me develop expertise in programming, database management, and system optimization, laying the groundwork for my career in software engineering and data-driven solutions.
              </UniversityDescription>
            </UniversityInfo>
          </EducationCard>
        </EducationGrid>
      </Container>
    </EducationSection>
  );
};

export default Education; 
