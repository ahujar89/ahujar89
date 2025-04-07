import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;
  overflow: hidden;
  
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

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-medium);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--text-dark);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-medium);
  margin-bottom: 1.5rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(78, 123, 255, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const projects = [
    {
      title: 'Azure Data Engineering Pipeline',
      description: 'Built an end-to-end Azure data pipeline using Data Factory, Databricks and Synapse to ingest, transform, and analyze data, ensuring data accuracy and enabling real-time reporting via Power BI dashboards.',
      image: '/projects/azure-data-pipeline.svg',
      tech: ['Azure Data Factory', 'Azure Databricks', 'Azure Synapse Analytics', 'Azure Data Lake', 'Power BI'],
      github: 'https://github.com/ahujar89/AdventureWorks-AzureDataEngineering-Project',
      demo: ''
    },
    {
      title: 'Wildfire Prediction Dashboard',
      description: 'Designed a Wildfire Prediction Dashboard using climate, weather, and demographic data to forecast wildfire risks and provide actionable insights through advanced data visualization.',
      image: '/projects/wildfire-prediction.svg',
      tech: ['Python', 'MongoDB', 'Machine Learning', 'Data Visualization'],
      github: 'https://github.com/ahujar89/Wildfire-Prediction-Dashboard',
      demo: ''
    },
    {
      title: 'Distributed File Storage System',
      description: 'Developed a distributed file storage system using Django and MinIO with features like file chunking, replication, and node health monitoring. Implemented real-time file upload, search, and integrity verification with a modern web interface and RESTful APIs.',
      image: '/projects/distributed-storage.svg',
      tech: ['Python', 'Django', 'Docker', 'MinIO', 'HTML'],
      github: 'https://github.com/ahujar89/Distributed-File-Storage-System',
      demo: ''
    },
    {
      title: 'Real-Estate Finder',
      description: 'Developed a Real Estate Finder application in Java to scrape and process property listings from Remax and Zolo, featuring advanced search, filtering, and ranking functionalities for user-friendly property exploration.',
      image: '/projects/real-estate.svg',
      tech: ['Java', 'Selenium', 'Data Structures', 'Algorithms'],
      github: 'https://github.com/ahujar89/RealEstsateFinder',
      demo: ''
    },
    {
      title: 'SocialBuzz Data Analytics & Visualization',
      description: 'Conducted data cleaning, modeling, and analysis on seven datasets to identify content trends, providing strategic recommendations through data visualization and a client-focused presentation.',
      image: '/projects/socialbuzz.svg',
      tech: ['Python', 'Excel', 'Power BI'],
      github: 'https://github.com/ahujar89/SocialBuzz-Accenture_DataAnalytics',
      demo: ''
    },
    {
      title: 'CI/CD Pipeline',
      description: 'Built a containerized Python Flask application and implemented an automated CI/CD pipeline with Docker and GitHub Actions, ensuring efficient deployment and consistent runtime environments.',
      image: '/projects/cicd.svg',
      tech: ['Python', 'Flask', 'Docker', 'GitHub Actions'],
      github: 'https://github.com/ahujar89/CICD',
      demo: ''
    }
  ];
  
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
            A collection of my recent work and personal projects
          </SectionSubtitle>
        </SectionHeader>
        
        <ProjectsGrid
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} variants={item}>
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> Source Code
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 