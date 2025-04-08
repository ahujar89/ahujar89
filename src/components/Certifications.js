import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CertificationsSection = styled.section`
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
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
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

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 6rem;
  padding: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    gap: 3rem 4rem;
    padding: 2rem;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const CertificationCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const LogoContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: visible;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: var(--background-light-accent);
    z-index: -1;
  }
  
  img {
    width: 85%;
    height: 85%;
    object-fit: contain;
    border-radius: 50%;
    transition: transform 0.3s ease;
    z-index: 1;
  }
  
  ${CertificationCard}:hover & {
    transform: translateY(-5px);
    
    &:before {
      filter: brightness(1.1);
    }
    
    img {
      transform: scale(1.05);
    }
  }
`;

const CertificationName = styled.h3`
  font-size: 1.1rem;
  color: var(--text-dark);
  text-align: center;
  margin: 0;
  font-weight: 500;
  transition: color 0.3s ease;
  max-width: 220px;
  line-height: 1.4;
  
  ${CertificationCard}:hover & {
    color: var(--primary-color);
  }
`;

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const certifications = [
    {
      name: "Microsoft Certified: Azure Fundamentals",
      logo: "/images/azure.png",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/RishabhAhuja-8099/3F59A6A1C592567E?sharingId=52BDFF5C17D837F7"
    },
    {
      name: "Databricks Lakehouse Fundamentals",
      logo: "/images/databricks.png",
      link: "https://credentials.databricks.com/d43c4bc0-469f-49e6-9e6b-2f37ac6cd0e7#acc.GA7QhDnz"
    },
    {
      name: "Docker Foundations",
      logo: "/images/docker.png",
      link: "https://www.linkedin.com/learning/certificates/bb130355a3ef322163a4bad80c44f61dca1a5c076086e07623f2ed013d066ebe?u=56973065"
    },
    {
      name: "Atlassian Project Management",
      logo: "/images/atlassian.png",
      link: "https://www.linkedin.com/learning/certificates/097510835c3c205200d0b12263be9701525fa4834d79a706456dfa633a438489?u=56973065"
    },
    {
      name: "HackerRank SQL (Basic)",
      logo: "/images/hackerank.png",
      link: "https://www.hackerrank.com/certificates/f099a8871cb4"
    },
    {
      name: "Accenture Data Analytics & Visualization",
      logo: "/images/accentureImg.png",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/T6kdcdKSTfg2aotxT/hzmoNKtzvAzXsEqx8_T6kdcdKSTfg2aotxT_Kz2wuf2QfDkWgv5gq_1739069294100_completion_certificate.pdf"
    }
  ];

  return (
    <CertificationsSection id="certifications" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Certifications
          </SectionTitle>
        </SectionHeader>
        
        <CertificationsGrid>
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <LogoContainer>
                <img src={cert.logo} alt={cert.name} />
              </LogoContainer>
              <CertificationName>{cert.name}</CertificationName>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </Container>
    </CertificationsSection>
  );
};

export default Certifications;