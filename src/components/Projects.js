import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub } from 'react-icons/fa';

/* ─── Section ─────────────────────────────────────────────────────────── */

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background: var(--background-light);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 0.25rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--text-medium);
  max-width: 560px;
  margin: 1.5rem auto 0;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0 1rem;
  }
`;

/* ─── Tech chip (shared) ─────────────────────────────────────────────── */

const TechChip = styled.span`
  display: inline-block;
  background: rgba(225, 29, 72, 0.08);
  color: var(--primary-color);
  border: 1px solid rgba(225, 29, 72, 0.2);
  border-radius: 50px;
  padding: 0.28rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

/* ─── Featured card ─────────────────────────────────────────────────── */

const FeaturedCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  border-radius: 20px;
  overflow: hidden;
  background: var(--background-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  margin-bottom: 3rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-4px);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImageCol = styled.div`
  height: 320px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${FeaturedCard}:hover & img {
    transform: scale(1.04);
  }

  @media (max-width: 900px) {
    height: 240px;
  }
`;

const FeaturedContentCol = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeaturedBadge = styled.span`
  display: inline-block;
  background: rgba(225, 29, 72, 0.1);
  color: var(--primary-color);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.85rem;
  border-radius: 50px;
  width: fit-content;
`;

const FeaturedTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-medium);
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const GithubBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition: background 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: var(--primary-dark);
    box-shadow: 0 6px 20px rgba(225, 29, 72, 0.35);
    color: white;
  }

  svg {
    font-size: 1.1rem;
  }
`;

/* ─── Regular grid ─────────────────────────────────────────────────── */

const RegularGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RegularCard = styled(motion.div)`
  background: var(--background-card);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-8px);
  }
`;

const CardImageArea = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  ${RegularCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.6rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-medium);
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const CardGithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary-color);
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: auto;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--primary-dark);
    transform: translateY(-1px);
  }

  svg {
    font-size: 1rem;
  }
`;

/* ─── Animation variants ─────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

/* ─── Component ─────────────────────────────────────────────────────── */

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      title: 'Lumi — AI Research Assistant',
      description:
        'AI-powered research assistant with a streaming chat interface that automatically routes queries to the right tool: document Q&A over uploaded PDFs/CSVs, live web search via DuckDuckGo, on-demand data analysis with charts, or direct LLM answers.',
      image: '/projects/lumi.svg',
      tech: ['Python', 'LangChain', 'Groq', 'ChromaDB', 'HuggingFace', 'Streamlit', 'Plotly'],
      github: 'https://github.com/ahujar89/Lumi'
    },
    {
      title: 'Azure Data Engineering Pipeline',
      description:
        'Built an end-to-end Azure data pipeline using Data Factory, Databricks and Synapse to ingest, transform, and analyze data, ensuring data accuracy and enabling real-time reporting via Power BI dashboards.',
      image: '/projects/azure-data-pipeline.svg',
      tech: ['Azure Data Factory', 'Azure Databricks', 'Azure Synapse Analytics', 'Azure Data Lake', 'Power BI'],
      github: 'https://github.com/ahujar89/AdventureWorks-AzureDataEngineering-Project'
    },
    {
      title: 'Wildfire Prediction Dashboard',
      description:
        'Designed a Wildfire Prediction Dashboard using climate, weather, and demographic data to forecast wildfire risks and provide actionable insights through advanced data visualization.',
      image: '/projects/wildfire-prediction.svg',
      tech: ['Python', 'MongoDB', 'Machine Learning', 'Data Visualization'],
      github: 'https://github.com/ahujar89/Wildfire-Prediction-Dashboard'
    },
    {
      title: 'Distributed File Storage System',
      description:
        'Developed a distributed file storage system using Django and MinIO with features like file chunking, replication, and node health monitoring. Implemented real-time file upload, search, and integrity verification.',
      image: '/projects/distributed-storage.svg',
      tech: ['Python', 'Django', 'Docker', 'MinIO', 'HTML'],
      github: 'https://github.com/ahujar89/Distributed-File-Storage-System'
    },
    {
      title: 'Real-Estate Finder',
      description:
        'Developed a Real Estate Finder application in Java to scrape and process property listings from Remax and Zolo, featuring advanced search, filtering, and ranking functionalities for user-friendly property exploration.',
      image: '/projects/real-estate.svg',
      tech: ['Java', 'Selenium', 'Data Structures', 'Algorithms'],
      github: 'https://github.com/ahujar89/RealEstsateFinder'
    },
    {
      title: 'SocialBuzz Data Analytics & Visualization',
      description:
        'Conducted data cleaning, modeling, and analysis on seven datasets to identify content trends, providing strategic recommendations through data visualization and a client-focused presentation.',
      image: '/projects/socialbuzz.svg',
      tech: ['Python', 'Excel', 'Power BI'],
      github: 'https://github.com/ahujar89/SocialBuzz-Accenture_DataAnalytics'
    },
    {
      title: 'CI/CD Pipeline',
      description:
        'Built a containerized Python Flask application and implemented an automated CI/CD pipeline with Docker and GitHub Actions, ensuring efficient deployment and consistent runtime environments.',
      image: '/projects/cicd.svg',
      tech: ['Python', 'Flask', 'Docker', 'GitHub Actions'],
      github: 'https://github.com/ahujar89/CICD'
    }
  ];

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Projects
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Things I've built — from AI assistants to data pipelines
          </SectionSubtitle>
        </SectionHeader>

        {/* Featured card */}
        <FeaturedCard
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <FeaturedImageCol>
            <img src={featured.image} alt={featured.title} />
          </FeaturedImageCol>
          <FeaturedContentCol>
            <FeaturedBadge>Featured</FeaturedBadge>
            <FeaturedTitle>{featured.title}</FeaturedTitle>
            <FeaturedDescription>{featured.description}</FeaturedDescription>
            <TechStack>
              {featured.tech.map((t, i) => (
                <TechChip key={i}>{t}</TechChip>
              ))}
            </TechStack>
            {featured.github && (
              <GithubBtn href={featured.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> View on GitHub
              </GithubBtn>
            )}
          </FeaturedContentCol>
        </FeaturedCard>

        {/* Regular grid */}
        <RegularGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {rest.map((project, index) => (
            <RegularCard key={index} variants={cardVariants}>
              <CardImageArea>
                <img src={project.image} alt={project.title} />
              </CardImageArea>
              <CardContent>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <CardChips>
                  {project.tech.map((t, i) => (
                    <TechChip key={i}>{t}</TechChip>
                  ))}
                </CardChips>
                {project.github && (
                  <CardGithubLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Source Code
                  </CardGithubLink>
                )}
              </CardContent>
            </RegularCard>
          ))}
        </RegularGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
