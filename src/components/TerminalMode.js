import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const TerminalGlobalStyle = createGlobalStyle`
  body.terminal-mode {
    --background-light:        #0d1117 !important;
    --background-light-accent: #0c0e14 !important;
    --background-dark:         #161b22 !important;
    --background-card:         #161b22 !important;
    --card-bg:                 #161b22 !important;
    --text-dark:               #c9d1d9 !important;
    --text-medium:             #8b949e !important;
    --text-light:              #6e7681 !important;
    --primary-color:           #39d353 !important;
    --primary-dark:            #2ea043 !important;
    --primary-light:           #56d364 !important;
    --secondary-color:         #58a6ff !important;
    --accent-color:            #e3b341 !important;
    --border-color:            rgba(48, 54, 61, 0.9) !important;
    --shadow:                  0 2px 8px rgba(0,0,0,0.55) !important;
    --shadow-hover:            0 8px 28px rgba(0,0,0,0.75) !important;
    --gradient-primary:        linear-gradient(135deg, #39d353, #58a6ff) !important;
  }

  body.terminal-mode,
  body.terminal-mode * {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace !important;
    letter-spacing: -0.01em;
  }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const Toast = styled.div`
  position: fixed;
  top: 1.1rem;
  left: 50%;
  transform: translateX(-50%);
  background: #161b22;
  border: 1px solid ${({ type }) => type === 'on' ? '#39d353' : '#fb7185'};
  color: ${({ type }) => type === 'on' ? '#39d353' : '#fb7185'};
  box-shadow: 0 0 24px ${({ type }) => type === 'on' ? 'rgba(57,211,83,0.2)' : 'rgba(251,113,133,0.2)'};
  font-family: 'JetBrains Mono', 'Courier New', monospace !important;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  z-index: 99999;
  pointer-events: none;
  white-space: nowrap;
  animation: ${slideDown} 0.22s ease;

  span {
    color: #6e7681;
    margin-left: 0.6rem;
    font-weight: 400;
  }
`;

const TerminalMode = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const handleKey = (e) => {
      if (e.key === '`' || e.code === 'Backquote') {
        e.preventDefault();
        const isOn = document.body.classList.toggle('terminal-mode');
        clearTimeout(timer);
        setToast(isOn ? 'on' : 'off');
        timer = setTimeout(() => setToast(null), 2600);
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => {
      window.removeEventListener('keydown', handleKey, true);
      clearTimeout(timer);
      document.body.classList.remove('terminal-mode');
    };
  }, []);

  return (
    <>
      <TerminalGlobalStyle />
      {toast && (
        <Toast type={toast}>
          {toast === 'on' ? '[ TERMINAL MODE ]' : '[ NORMAL MODE ]'}
          {toast === 'on' && <span>press ` to exit</span>}
        </Toast>
      )}
    </>
  );
};

export default TerminalMode;
