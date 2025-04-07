import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Dark Theme Colors */
    --background-dark: #0a0c10;
    --background-card: #161b22;
    --background-light: #21262d;
    --border-color: #30363d;
    
    /* Text Colors */
    --text-light: #f8f9fa;
    --text-medium: #adb5bd;
    --text-dark: #6c757d;
    
    /* Accent Colors */
    --primary-color: #6c5ce7;
    --primary-light: #a29bfe;
    --secondary-color: #00cec9;
    --accent-color: #fd79a8;
    --accent-secondary: #fdcb6e;
    
    /* UI Elements */
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --gradient-accent: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 15px 40px rgba(0, 0, 0, 0.4);
    
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-dark);
    color: var(--text-light);
    line-height: 1.6;
    overflow-x: hidden;
  }
  
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
    background: var(--background-card);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }
  
  /* Selection */
  ::selection {
    background-color: var(--primary-color);
    color: var(--text-light);
  }
`;

export default GlobalStyles; 