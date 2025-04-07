# Modern Tech Portfolio

A creative, dynamic, and modern portfolio website for tech professionals. This single-page application showcases your skills, projects, and contact information with beautiful animations and a sleek design.

![Portfolio Preview](preview.png)

## Features

- Interactive UI with modern design elements
- Responsive layout for all device sizes
- Animated sections using Framer Motion
- Tech-focused styling with gradients and glassmorphism effects
- Project filtering by category
- Contact form with validation
- Dark mode design optimized for tech portfolios

## Tech Stack

- React
- Styled Components
- Framer Motion
- React Icons
- React Intersection Observer

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/tech-portfolio.git
cd tech-portfolio
```

2. Install the dependencies:
```
npm install
# or
yarn install
```

3. Start the development server:
```
npm start
# or
yarn start
```

4. Open your browser and visit `http://localhost:3000`

## Customization

### Personal Information

Update your personal information in the component files:

- `src/components/Hero.js` - Your name, title, and intro
- `src/components/About.js` - About text and stats
- `src/components/Skills.js` - Your technical skills
- `src/components/Projects.js` - Your portfolio projects
- `src/components/Contact.js` - Contact information

### Styling

Modify the colors and styling variables in `src/styles/index.css`:

```css
:root {
  --primary-color: #0070f3;
  --secondary-color: #00c6ff;
  --accent-color: #7928ca;
  --background-dark: #121212;
  --text-light: #f0f0f0;
  --text-dark: #333;
  --transition-speed: 0.3s;
}
```

## Deployment

Build the production-ready app:

```
npm run build
# or
yarn build
```

Deploy the contents of the `build` folder to your hosting provider of choice. The portfolio is optimized for deployment on platforms like Netlify, Vercel, or GitHub Pages.

## License

MIT © [Your Name]

---

Made with ❤️ by Rishabh Ahuja