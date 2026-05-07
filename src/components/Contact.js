import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  padding: 8rem 2rem;
  background-color: var(--background-light-accent);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 100% 0%, rgba(225, 29, 72, 0.05), transparent),
                radial-gradient(ellipse 40% 40% at 0% 100%, rgba(14, 165, 233, 0.04), transparent);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.6rem;
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
    width: 56px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--text-medium);
  margin-top: 1.75rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Form ─────────────────────────────────────────────────────────────── */

const ContactForm = styled(motion.form)`
  background: var(--background-card);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
`;

const FormGroup = styled.div`
  margin-bottom: 1.4rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-medium);
  letter-spacing: 0.02em;
`;

const inputBase = `
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background-light);
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-dark);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
  }

  &::placeholder { color: var(--text-light); }
`;

const FormInput = styled.input`${inputBase}`;

const FormTextarea = styled.textarea`
  ${inputBase}
  min-height: 130px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.28);
  transition: box-shadow 0.2s ease;

  &:hover { box-shadow: 0 6px 22px rgba(225, 29, 72, 0.42); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const FormSuccessMessage = styled(motion.div)`
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.9rem 1rem;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  color: #059669;
  font-size: 0.9rem;
  text-align: center;
`;

const FormErrorMessage = styled(motion.div)`
  background: rgba(225, 29, 72, 0.06);
  border: 1px solid rgba(225, 29, 72, 0.25);
  padding: 0.9rem 1rem;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  color: var(--primary-color);
  font-size: 0.9rem;
  text-align: center;
`;

/* ─── Right panel ───────────────────────────────────────────────────────── */

const RightPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileCard = styled.div`
  background: var(--background-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
`;

const ProfilePhoto = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-light);
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

const ProfileTagline = styled.p`
  font-size: 0.88rem;
  color: var(--text-medium);
  line-height: 1.6;
  margin: 0;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s ease;
  color: var(--text-medium);

  &:hover {
    background: rgba(225, 29, 72, 0.06);
    color: var(--primary-color);
  }

  svg { color: var(--primary-color); flex-shrink: 0; font-size: 0.95rem; }

  span { font-size: 0.9rem; font-weight: 500; }
`;

const SocialCard = styled.div`
  background: var(--background-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  padding: 1.5rem;
`;

const SocialTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-light);
  margin-bottom: 0.85rem;
`;

const SocialPills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SocialPill = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 1rem;
  border-radius: 50px;
  background: var(--background-light);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-dark);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s ease;

  svg { font-size: 1rem; color: var(--primary-color); }

  &:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    box-shadow: 0 4px 16px rgba(225, 29, 72, 0.3);

    svg { color: white; }
  }
`;

const Contact = () => {
  const form = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => { emailjs.init("HcRBGxUgjCXXnhcUt"); }, []);

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await emailjs.sendForm(
        'service_sxp22tn',
        'template_s9lwczi',
        form.current,
        'HcRBGxUgjCXXnhcUt'
      );
      console.log('Email sent:', result);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Let's Build Something
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Got an idea, an opportunity, or just want to say hi? I'm always up for a good conversation.
          </SectionSubtitle>
        </SectionHeader>

        <ContactWrapper>
          <ContactForm
            ref={form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSubmitted && (
              <FormSuccessMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                Message sent! I'll get back to you soon.
              </FormSuccessMessage>
            )}
            {isError && (
              <FormErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {errorMessage || 'Something went wrong. Please try again.'}
              </FormErrorMessage>
            )}

            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                placeholder="you@example.com"
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
                placeholder="What's this about?"
                value={formState.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                placeholder="Tell me what you're thinking..."
                value={formState.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message →'}
            </SubmitButton>
          </ContactForm>

          <RightPanel
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProfileCard>
              <ProfilePhoto>
                <img src="/images/rishabh.jpg" alt="Rishabh Ahuja" />
              </ProfilePhoto>
              <ProfileName>Rishabh Ahuja</ProfileName>
              <ProfileTagline>
                Software developer & data engineer based in Toronto. Open to full-time roles, freelance work, and interesting conversations.
              </ProfileTagline>
              <ContactDetails>
                <ContactRow href="mailto:ahujar96@gmail.com">
                  <FaEnvelope />
                  <span>ahujar96@gmail.com</span>
                </ContactRow>
                <ContactRow as="div">
                  <FaMapMarkerAlt />
                  <span>Toronto, ON, Canada</span>
                </ContactRow>
              </ContactDetails>
            </ProfileCard>

            <SocialCard>
              <SocialTitle>Find me on</SocialTitle>
              <SocialPills>
                <SocialPill
                  href="https://www.linkedin.com/in/rishabhahuja2507/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                >
                  <FaLinkedin />
                  LinkedIn
                </SocialPill>
                <SocialPill
                  href="https://github.com/ahujar89"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                >
                  <FaGithub />
                  GitHub
                </SocialPill>
                <SocialPill
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                >
                  <FaTwitter />
                  Twitter
                </SocialPill>
              </SocialPills>
            </SocialCard>
          </RightPanel>
        </ContactWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact;
