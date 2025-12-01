# WNL Web Frontend

> A modern, responsive React application for Wijeya Newspapers Limited (WNL) - Sri Lanka's premier media organization.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
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
- **📞 Contact**: Contact form with SMTP email integration and beautiful thank you modal

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
| Express | 5.1.0 |
| Nodemailer | 7.0.11 |

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
| `npm run server` | Start backend email server |
| `npm run dev:all` | Start both frontend and backend servers |

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
│   ├── controllers/            # Business logic controllers (MVC pattern)
│   ├── components/             # Reusable UI components
│   ├── WhoAreWe/              # About Us section
│   ├── Leaders/               # Leadership section
│   ├── Categories/            # Content categories
│   ├── Others/                # Additional pages
│   ├── More/                  # Supplementary pages
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

## 📧 Contact Form with SMTP Email

The application includes a fully functional contact form with SMTP email integration:

- **Backend Server**: Node.js + Express (Port 3001)
- **Email Service**: Nodemailer with Oracle Cloud SMTP
- **Features**:
  - Admin notification emails
  - User confirmation emails
  - Beautiful "Thank You" modal
  - Professional HTML email templates
  - Form validation and error handling

### Quick Start Contact Form

```bash
# Start both frontend and backend
npm run dev:all
```

For detailed setup and customization, see:
- `CONTACT_FORM_README.md` - Complete documentation
- `QUICK_START_CONTACT_FORM.md` - Quick start guide
- `CONTACT_FORM_SETUP.md` - Detailed setup instructions

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

### Development Best Practices

- **Hot Reload**: Vite provides instant hot module replacement
- **Component Testing**: Test components in isolation before integration
- **API Mocking**: Use mock data during development if backend is unavailable
- **Error Handling**: Always include try-catch blocks in async operations
- **Loading States**: Show loading indicators for async data fetching
- **Responsive Design**: Test on multiple screen sizes using browser dev tools

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

**Developed by:**
- Anuttara Nirmani

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

*Last Updated: November 21, 2025*
