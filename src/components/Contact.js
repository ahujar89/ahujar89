import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const ContactSection = styled.section`
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
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-dark);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-dark);
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  color: var(--text-dark);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(78, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  color: var(--text-dark);
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(78, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(78, 123, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(78, 123, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(78, 123, 255, 0.2);
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactInfoCard = styled(motion.div)`
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  border: none;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
`;

const ContactInfoText = styled.p`
  font-size: 1.1rem;
  color: var(--text-dark);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.div`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const ContactText = styled.p`
  font-size: 1rem;
  color: var(--text-dark);
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background-light);
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  
  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const FormSuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  color: #4CAF50;
  text-align: center;
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log(formState);
    // For demo purposes, just show success message
    setIsSubmitted(true);
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Get In Touch
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Have a project in mind or want to discuss a potential collaboration?
            I'd love to hear from you!
          </SectionSubtitle>
        </SectionHeader>
        
        <ContactWrapper>
          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSubmitted && (
              <FormSuccessMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                Your message has been sent successfully! I'll get back to you soon.
              </FormSuccessMessage>
            )}
            
            <FormGroup>
              <FormLabel>Your Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Your Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Your Message</FormLabel>
              <FormTextarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
          
          <ContactInfo>
            <ContactInfoCard
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContactInfoTitle>Contact Information</ContactInfoTitle>
              <ContactInfoText>
                Feel free to reach out to me through any of these channels.
                I typically respond within 24 hours.
              </ContactInfoText>
              
              <ContactDetail>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactText>Windsor, ON, Canada</ContactText>
              </ContactDetail>
              
              <ContactDetail>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactText>ahujar96@gmail.com</ContactText>
              </ContactDetail>
              
              <ContactDetail>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactText>+1 (382) 880-4206</ContactText>
              </ContactDetail>
              
              <SocialLinks>
                <SocialLink
                  href="https://www.linkedin.com/in/rishabhahuja2507/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </SocialLink>
                
                <SocialLink
                  href="https://github.com/ahujar89"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </SocialLink>
                
                <SocialLink
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </SocialLink>
              </SocialLinks>
            </ContactInfoCard>
          </ContactInfo>
        </ContactWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact; 