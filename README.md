# WNL Web Frontend

> A modern, responsive React application for Wijeya Newspapers Limited (WNL) - Sri Lanka's premier media organization.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Overview

WNL Web Frontend is a comprehensive single-page application (SPA) built for Wijeya Newspapers Limited, showcasing the company's rich portfolio of publications, leadership team, achievements, career opportunities, and corporate information. The application provides an engaging user experience with smooth animations, responsive design, and seamless navigation.

## ✨ Features

### Core Functionality
- 🚀 **Modern React 18** with hooks and functional components
- ⚡ **Lightning-fast** build and hot module replacement with Vite
- 📱 **Fully responsive** design that works on all devices
- 🎨 **Smooth scroll animations** using AOS (Animate On Scroll)
- 🧭 **Client-side routing** with React Router DOM v7
- 🔄 **API integration** with RESTful backend services
- 🎯 **Controller pattern** for separation of concerns

### Content Sections
- **🏠 Home Dashboard**: Dynamic hero carousel, publications portfolio, and latest press releases
- **👔 About Us**: Company overview, mission statement, vision, and brand logos
- **👥 Leadership**: Executive team profiles and the faces behind WNL
- **🏆 Awards & Recognition**: Showcase of company achievements and industry accolades
- **💼 Careers**: Dynamic job listings with detailed job descriptions
- **📰 Press Releases**: Latest news announcements and company updates
- **📚 Publications**: Portfolio of newspapers and magazines
- **📍 Locations**: Interactive office locations and contact information
- **❓ FAQ**: Frequently asked questions and answers
- **📢 Advertise With Us**: Information about advertising opportunities
- **📞 Contact**: Contact form and communication channels

## 🛠️ Tech Stack

### Frontend
| Technology | Version |
|------------|---------|
| React | 18.3.1 |
| Vite | 5.4.1 |
| React Router DOM | 7.9.4 |
| Bootstrap | 5.3.2 |
| AOS | 2.3.4 |
| Axios | 1.12.2 |

### Development Tools
| Tool | Version |
|------|---------|
| ESLint | 9.9.0 |
| @vitejs/plugin-react | 4.3.1 |
| eslint-plugin-react | 7.35.0 |
| eslint-plugin-react-hooks | 5.1.0-rc.0 |

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/AnuNirmani/WNL-WEB-frontend.git
cd WNL-WEB-frontend
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Configure API endpoint** (if needed):
   - API base URL is configured in `src/api/*.js` files
   - Default: `http://127.0.0.1:8000/api`
   - Update the `API_URL` constant if your backend is hosted elsewhere

4. **Start the development server**:
```bash
npm run dev
# or
yarn dev
```

The application will be available at **`http://localhost:5174`**

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Quick Start Example

```bash
# Complete setup and run
git clone https://github.com/AnuNirmani/WNL-WEB-frontend.git
cd WNL-WEB-frontend
npm install
npm run dev
```

## 📁 Project Structure

```
WNL-WEB-frontend/
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── dist/                       # Production build output (generated)
├── node_modules/               # NPM dependencies (generated)
├── public/                     # Static files served directly
│   └── .gitkeep                # Placeholder for empty directory
│
├── src/                        # Source code
│   ├── api/                    # API service layer
│   │   ├── client.js           # API client configuration
│   │   ├── employeeApi.js      # Employee/leadership data
│   │   ├── homeApi.js          # Home page data (publications, posts)
│   │   ├── locationsApi.js     # Location data
│   │   └── postsApi.js         # Posts and press releases
│   │
│   ├── controllers/            # Business logic controllers (MVC pattern)
│   │   ├── useAwardDetailsController.js
│   │   ├── useAwardsController.js
│   │   ├── useCareersController.js
│   │   ├── useFacesController.js
│   │   ├── useHeroController.js
│   │   ├── useLeadersController.js
│   │   ├── useLocationsController.js
│   │   ├── useOverviewController.js
│   │   ├── usePressReleaseController.js
│   │   ├── usePressReleaseDbController.js
│   │   ├── usePressReleaseDetailsController.js
│   │   └── usePublicationsController.js
│   │
│   ├── components/             # Reusable UI components
│   │   ├── CallToAction.jsx    # Call-to-action component
│   │   ├── Dashboard.jsx       # Main dashboard/home page
│   │   ├── Dashboard.css       # Dashboard styles
│   │   ├── Footer.jsx          # Footer component
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Hero.jsx            # Hero section with carousel
│   │   ├── PressReleasedb.jsx  # Press release component
│   │   └── Publications.jsx    # Publications showcase
│   │
│   ├── WhoAreWe/              # About Us section
│   │   ├── AboutUs.jsx         # Company about page
│   │   ├── AboutUs.css
│   │   ├── Logos.jsx           # Company logos showcase
│   │   ├── Logos.css
│   │   ├── Mission.jsx         # Mission statement
│   │   ├── Mission.css
│   │   ├── Vision.jsx          # Vision statement
│   │   └── Vision.css
│   │
│   ├── Leaders/               # Leadership section
│   │   ├── Faces.jsx           # Faces behind WNL
│   │   ├── Faces.css
│   │   ├── Leaders.jsx         # Leadership team page
│   │   └── Leaders.css
│   │
│   ├── Categories/            # Content categories
│   │   ├── AwardDetails.jsx    # Individual award details
│   │   ├── AwardDetails.css
│   │   ├── Awards.jsx          # Awards listing
│   │   ├── Awards.css
│   │   ├── Careers.jsx         # Job listings
│   │   ├── Careers.css
│   │   ├── JobDetails.jsx      # Job detail page
│   │   ├── JobDetails.css
│   │   ├── PressRelease.jsx    # Press releases listing
│   │   └── PressRelease.css
│   │
│   ├── Others/                # Additional pages
│   │   ├── OurJourny.jsx       # Company journey/history
│   │   ├── OurJourny.css
│   │   ├── Overview.jsx        # Company overview
│   │   ├── Overview.css
│   │   ├── Papers.jsx          # Publications/papers
│   │   ├── Papers.css
│   │   ├── PressReleaseDetails.jsx  # Press release detail page
│   │   └── PressReleaseDetails.css
│   │
│   ├── More/                  # Supplementary pages
│   │   ├── AdvertiseWithUs.jsx # Advertising information
│   │   ├── AdvertiseWithUs.css
│   │   ├── ContactUs.jsx       # Contact form and information
│   │   ├── ContactUs.css
│   │   ├── FAQ.jsx             # Frequently asked questions
│   │   ├── FAQ.css
│   │   ├── Locations.jsx       # Office locations
│   │   └── Locations.css
│   │
│   ├── utils/                 # Utility functions
│   │   ├── formatError.js      # Error formatting utilities
│   │   └── sanitize.js         # Input sanitization utilities
│   │
│   ├── assets/                # Local assets (images, fonts, etc.)
│   ├── App.jsx                # Root component with routing
│   ├── ScrollToTop.jsx        # Scroll to top utility component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
│
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── LICENSE                    # MIT License
├── package.json               # Dependencies and scripts
├── package-lock.json          # NPM lockfile
├── README.md                  # Project documentation
├── SECURITY_IMPLEMENTATION.md # Security implementation guide
└── vite.config.js             # Vite configuration
```

## 🏗️ Architecture

### Design Pattern: MVC (Model-View-Controller)

The application follows a modified MVC architecture:

- **Models (API Layer)**: `src/api/` - Handle data fetching and API communication
- **Views (Components)**: `src/components/`, `src/WhoAreWe/`, etc. - React components for UI
- **Controllers**: `src/controllers/` - Custom hooks managing business logic and state

### Key Architectural Features

1. **Separation of Concerns**: Business logic is separated from UI components using custom controller hooks
2. **Reusable Components**: Modular components that can be reused across different pages
3. **Centralized Routing**: All routes defined in `App.jsx` for easy maintenance
4. **API Abstraction**: API calls abstracted into service modules
5. **Custom Hooks**: Controller hooks encapsulate data fetching, state management, and business logic

### Example Flow

```
User Action → Component → Controller Hook → API Service → Backend
                ↓              ↓                ↓
              View ← State Update ← Data Processing
```

## 🔌 API Integration

The application integrates with a Laravel backend API (default: `http://127.0.0.1:8000/api`).

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/publications` | GET | Fetch all publications |
| `/latest-posts` | GET | Fetch latest posts/articles |
| `/employees` | GET | Fetch employee/leadership data |
| `/locations` | GET | Fetch office locations |
| `/posts` | GET | Fetch all posts |
| `/posts/{id}` | GET | Fetch single post details |

### API Service Structure

```javascript
// Example: src/api/homeApi.js
const API_URL = 'http://127.0.0.1:8000/api';

export async function fetchPublicationsFromApi() {
  try {
    const response = await fetch(`${API_URL}/publications`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Controller Hook Pattern

```javascript
// Example: src/controllers/usePublicationsController.js
import { useState, useEffect } from 'react';
import { fetchPublicationsFromApi } from '../api/homeApi';

export function usePublicationsController() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPublicationsFromApi();
        setPublications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { publications, loading };
}
```

## 🗺️ Routes

The application includes the following client-side routes:

| Route | Component | Description | Dynamic |
|-------|-----------|-------------|---------|
| `/` | Dashboard | Home page with hero carousel and highlights | No |
| `/about-us` | AboutUs | Company information and history | No |
| `/leaders` | Leaders | Executive leadership team profiles | No |
| `/faces` | Faces | Team members behind WNL | No |
| `/awards` | Awards | Awards and recognition showcase | No |
| `/award/:id` | AwardDetails | Individual award details | Yes |
| `/careers` | Careers | Current job openings | No |
| `/job/:id` | JobDetails | Detailed job posting | Yes |
| `/press-release` | PressRelease | Press releases listing | No |
| `/press-release/:id` | PressReleaseDetails | Detailed press release | Yes |
| `/papers` | Papers | Publications portfolio | No |
| `/overview` | Overview | Company overview | No |
| `/our-journey` | OurJourny | Company history and milestones | No |
| `/locations` | Locations | Office locations and map | No |
| `/faq` | FAQ | Frequently asked questions | No |
| `/advertise-with-us` | AdvertiseWithUs | Advertising opportunities | No |
| `/contact-us` | ContactUs | Contact form and information | No |

### Route Configuration

Routes are configured in `src/App.jsx`:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <ScrollToTop />
  <Header />
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/about-us" element={<AboutUs />} />
    {/* ... more routes */}
  </Routes>
  <Footer />
</BrowserRouter>
```

## 💻 Development

### Code Style & Guidelines

#### ESLint Configuration

This project uses ESLint for code quality and consistency. Configuration is in `eslint.config.js`.

```bash
# Run linting
npm run lint
```

#### Component Guidelines

1. **Functional Components**: Use functional components with hooks
2. **File Organization**: Each major section has its own directory with `.jsx` and `.css` files
3. **Naming Conventions**: 
   - Components: PascalCase (e.g., `Dashboard.jsx`)
   - Styles: Match component name (e.g., `Dashboard.css`)
   - Controllers: `use` prefix (e.g., `useAwardsController.js`)
   - API files: Descriptive names (e.g., `homeApi.js`)

4. **State Management**: Use custom controller hooks for complex state logic
5. **Routing**: All routes defined in `App.jsx`
6. **Animations**: AOS library initialized globally in `App.jsx`

#### Project Conventions

```javascript
// ✅ Good: Separation of concerns
import { useAwardsController } from '../controllers/useAwardsController';

function Awards() {
  const { awards, loading } = useAwardsController();
  // Component logic
}

// ❌ Avoid: API calls directly in components
function Awards() {
  const [awards, setAwards] = useState([]);
  fetch('/api/awards')... // Don't do this
}
```

### Adding New Features

#### 1. Create API Service (if needed)

```javascript
// src/api/newFeatureApi.js
const API_URL = 'http://127.0.0.1:8000/api';

export async function fetchNewFeatureData() {
  const response = await fetch(`${API_URL}/new-feature`);
  return await response.json();
}
```

#### 2. Create Controller Hook

```javascript
// src/controllers/useNewFeatureController.js
import { useState, useEffect } from 'react';
import { fetchNewFeatureData } from '../api/newFeatureApi';

export function useNewFeatureController() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchNewFeatureData();
      setData(result);
      setLoading(false);
    }
    loadData();
  }, []);

  return { data, loading };
}
```

#### 3. Create Component

```javascript
// src/components/NewFeature.jsx
import { useNewFeatureController } from '../controllers/useNewFeatureController';
import './NewFeature.css';

function NewFeature() {
  const { data, loading } = useNewFeatureController();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="new-feature">
      {/* Component JSX */}
    </div>
  );
}

export default NewFeature;
```

#### 4. Add Route

```javascript
// src/App.jsx
import NewFeature from './components/NewFeature';

<Route path="/new-feature" element={<NewFeature />} />
```

### Development Best Practices

- **Hot Reload**: Vite provides instant hot module replacement
- **Component Testing**: Test components in isolation before integration
- **API Mocking**: Use mock data during development if backend is unavailable
- **Error Handling**: Always include try-catch blocks in async operations
- **Loading States**: Show loading indicators for async data fetching
- **Responsive Design**: Test on multiple screen sizes using browser dev tools

### Common Development Tasks

```bash
# Install a new dependency
npm install package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory:
- Minified JavaScript and CSS
- Optimized assets
- Source maps for debugging

### Build Output Structure

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [public files]
```

### Preview Production Build

Test the production build locally before deployment:

```bash
npm run preview
```

This starts a local server at `http://localhost:4173` to preview the production build.

### Deployment Options

#### 1. Static Hosting (Recommended)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

#### 2. Traditional Web Server

1. Build the application: `npm run build`
2. Copy `dist/` contents to your web server (Apache, Nginx, IIS)
3. Configure server for SPA routing

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Environment Configuration

For different environments (dev, staging, production), create environment-specific API configurations:

```javascript
// src/config/environment.js
const ENV = {
  development: {
    apiUrl: 'http://127.0.0.1:8000/api',
  },
  production: {
    apiUrl: 'https://api.wnl.lk/api',
  },
};

export const API_URL = ENV[process.env.NODE_ENV || 'development'].apiUrl;
```

## 🌐 Browser Support

The application supports all modern browsers:

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |
| Opera | Latest |

**Note:** Internet Explorer is not supported.

## 📚 Assets Setup

For detailed information about setting up images and assets, please refer to [ASSETS_SETUP.md](ASSETS_SETUP.md).

**Quick Overview:**
- Place assets in the `public/assets/` directory
- Images go in `public/assets/img/`
- Organize by categories: `slider/`, `portfolio/`, `leaders/`, etc.
- Supported formats: JPG, PNG, SVG, WebP

## 🔧 Troubleshooting

### Common Issues

**Issue:** Port 5173 already in use
```bash
# Solution: Kill the process or use a different port
npx kill-port 5173
# or
npm run dev -- --port 3000
```

**Issue:** Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Build fails with memory error
```bash
# Solution: Increase Node.js memory
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

**Issue:** API requests failing
- Check if backend server is running
- Verify API_URL in `src/api/*.js` files
- Check CORS configuration on backend

## 🤝 Contributing

This is a private project for Wijeya Newspapers Limited. For internal development inquiries, please contact the development team.

### Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes following the coding guidelines
3. Test thoroughly
4. Commit: `git commit -m "Description of changes"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright © 2025 Wijeya Newspapers Limited

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

## 👥 Team

**Wijeya Newspapers Limited**  
Sri Lanka's Premier Media Organization

**Development Team:**
- Frontend Development: React Team
- Backend Integration: API Team
- Design & UX: Creative Team

## 📞 Support

For technical support or questions:
- **Repository**: [github.com/AnuNirmani/WNL-WEB-frontend](https://github.com/AnuNirmani/WNL-WEB-frontend)
- **Issues**: [Report an Issue](https://github.com/AnuNirmani/WNL-WEB-frontend/issues)
- **Email**: Contact your team lead for internal support

## 🙏 Acknowledgments

- React Team for the amazing library
- Vite Team for the blazing-fast build tool
- Bootstrap Team for the responsive framework
- AOS Library for smooth animations
- All contributors and team members

---

**Built with ❤️ by the WNL Development Team**

*Last Updated: November 10, 2025*