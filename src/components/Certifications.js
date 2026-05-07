import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CertificationsSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
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
  margin-bottom: 3rem;
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

const SectionSubtitle = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-medium);
  margin-top: 1.5rem;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: white;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--gradient-primary);
    border-radius: 14px 0 0 14px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-light);
  }
`;

const CertLogo = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--background-light);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
`;

const CertInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CertName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.3;
`;

const CertVerify = styled.span`
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
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
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Verified credentials in cloud, data, and development
          </SectionSubtitle>
        </SectionHeader>

        <CertGrid>
          {certifications.map((cert, index) => (
            <CertCard
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <CertLogo>
                <img src={cert.logo} alt={cert.name} />
              </CertLogo>
              <CertInfo>
                <CertName>{cert.name}</CertName>
                <CertVerify>View credential &rarr;</CertVerify>
              </CertInfo>
            </CertCard>
          ))}
        </CertGrid>
      </Container>
    </CertificationsSection>
  );
};

export default Certifications;
