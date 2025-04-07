import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  position: relative;
  background-color: var(--background-light-accent);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.bgColor || 'var(--primary-color)'};
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 1;
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
  margin-bottom: 1rem;
  color: var(--text-dark);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: var(--text-medium);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  background: rgba(78, 123, 255, 0.1);
  color: var(--primary-color);
  display: inline-block;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-dark);
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterTab = styled.button`
  padding: 0.5rem 1.5rem;
  background: ${({ active }) => active ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${({ active }) => active ? 'white' : 'var(--text-medium)'};
  border: 1px solid ${({ active }) => active ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ active }) => active ? 'var(--primary-color)' : 'rgba(78, 123, 255, 0.1)'};
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const projects = [
    {
      title: 'Modern Web Application',
      description: 'A full-stack web application built with React, Node.js, and MongoDB. Features include user authentication, real-time updates, and responsive design.',
      image: '',
      bgColor: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'web',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with product catalog, shopping cart, payment processing, and order management functionality.',
      image: '',
      bgColor: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
      tags: ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS'],
      category: 'web',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Machine Learning Dashboard',
      description: 'An interactive dashboard for visualizing and analyzing machine learning model performance metrics.',
      image: '',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
      category: 'data',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Mobile Fitness App',
      description: 'A fitness tracking application with workout plans, progress tracking, and social features.',
      image: '',
      bgColor: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
      tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      category: 'mobile',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'AI Content Generator',
      description: 'A tool that uses natural language processing to generate various types of content based on user prompts.',
      image: '',
      bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      tags: ['Python', 'OpenAI', 'Flask', 'React'],
      category: 'ai',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Task Management System',
      description: 'A collaborative project management tool with task assignment, tracking, and reporting features.',
      image: '',
      bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      tags: ['Vue.js', 'Firebase', 'Vuex', 'Sass'],
      category: 'web',
      github: 'https://github.com',
      live: 'https://example.com'
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories = [
    { name: 'All Projects', value: 'all' },
    { name: 'Web', value: 'web' },
    { name: 'Mobile', value: 'mobile' },
    { name: 'AI/ML', value: 'ai' },
    { name: 'Data', value: 'data' }
  ];
  
  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Featured Projects
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            A showcase of my recent work, including web applications,
            mobile apps, and data visualization projects.
          </SectionSubtitle>
        </SectionHeader>
        
        <FilterTabs>
          {categories.map(category => (
            <FilterTab
              key={category.value}
              active={filter === category.value}
              onClick={() => setFilter(category.value)}
            >
              {category.name}
            </FilterTab>
          ))}
        </FilterTabs>
        
        <ProjectsGrid
          as={motion.div}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} variants={item}>
              <ProjectImage bgColor={project.bgColor} image={project.image} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map((tag, tagIndex) => (
                    <ProjectTag key={tagIndex}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                <ProjectLinks>
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> Source Code
                  </ProjectLink>
                  <ProjectLink
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
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