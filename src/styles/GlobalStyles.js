import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Bloom — Rose & Sky */
    --background-dark: #fce7ef;
    --background-card: #ffffff;
    --background-light: #fff9fb;
    --border-color: rgba(225, 29, 72, 0.12);

    /* Text Colors */
    --text-light: #1a0812;
    --text-medium: #7d3a4f;
    --text-dark: #1a0812;

    /* Accent Colors */
    --primary-color: #e11d48;
    --primary-light: #fb7185;
    --secondary-color: #0ea5e9;
    --accent-color: #f59e0b;
    --accent-secondary: #a855f7;

    /* UI Elements */
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --gradient-accent: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
    --shadow: 0 2px 8px rgba(225, 29, 72, 0.07), 0 8px 28px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 8px 32px rgba(225, 29, 72, 0.16), 0 2px 8px rgba(0, 0, 0, 0.06);
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-light);
    color: var(--text-dark);
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--background-dark); }
  ::-webkit-scrollbar-thumb { background: var(--primary-dark); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--primary-color); }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: var(--primary-light);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  section {
    padding: var(--spacing-xl) 0;
    
    @media (max-width: 768px) {
      padding: var(--spacing-lg) 0;
    }
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--background-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
  }

  /* Selection */
  ::selection {
    background-color: var(--primary-light);
    color: var(--background-light);
  }
`;

export default GlobalStyles; 