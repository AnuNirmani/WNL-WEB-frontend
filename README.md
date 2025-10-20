# WNL Web Frontend

A comprehensive React application for Wijeya Newspapers Limited (WNL) website, showcasing the company's publications, leadership, awards, careers, and more.

## Features

- 🚀 Modern React 18 application built with Vite
- 📱 Fully responsive design with Bootstrap 5
- 🎨 Smooth animations with AOS (Animate On Scroll)
- 🧭 Client-side routing with React Router
- 🌐 Multiple sections and pages:
  - **Home Dashboard**: Hero carousel, publications portfolio, press releases
  - **About Us**: Company overview, mission, vision, logos
  - **Leadership**: Company leaders and faces behind the organization
  - **Awards & Recognition**: Showcase of achievements and accolades
  - **Careers**: Job listings and detailed job postings
  - **Press Releases**: Latest news and announcements
  - **Publications**: Portfolio of newspapers and magazines
  - **Contact & Locations**: Contact information and office locations
  - **FAQ**: Frequently asked questions
  - **Advertise With Us**: Advertising opportunities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd WNL-WEB-frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up assets**: See [ASSETS_SETUP.md](ASSETS_SETUP.md) for detailed asset configuration

4. **Start the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
src/
├── components/              # Core components
│   ├── Dashboard.jsx        # Main dashboard/home page
│   ├── Dashboard.css        # Dashboard styles
│   ├── Header.jsx           # Navigation header
│   ├── Footer.jsx           # Footer component
│   ├── Hero.jsx             # Hero section with carousel
│   ├── Publications.jsx     # Publications showcase
│   ├── PressRelease.jsx     # Press release section
│   └── CallToAction.jsx     # CTA component
│
├── WhoAreWe/               # About Us section
│   ├── AboutUs.jsx          # Company about page
│   ├── Mission.jsx          # Mission statement
│   ├── Vision.jsx           # Vision statement
│   └── Logos.jsx            # Company logos showcase
│
├── Leaders/                # Leadership section
│   ├── Leaders.jsx          # Leadership team page
│   └── Faces.jsx            # Faces behind the organization
│
├── Categories/             # Content categories
│   ├── Awards.jsx           # Awards listing
│   ├── AwardDetails.jsx     # Individual award details
│   ├── Careers.jsx          # Job listings
│   ├── JobDetails.jsx       # Job detail page
│   └── PressRelease.jsx     # Press releases listing
│
├── Others/                 # Additional pages
│   ├── Overview.jsx         # Company overview
│   ├── OurJourny.jsx        # Company journey/history
│   ├── Papers.jsx           # Publications/papers
│   └── PressReleaseDetails.jsx  # Press release detail page
│
├── More/                   # Supplementary pages
│   ├── Locations.jsx        # Office locations
│   ├── FAQ.jsx              # Frequently asked questions
│   ├── AdvertiseWithUs.jsx  # Advertising information
│   └── ContactUs.jsx        # Contact form and information
│
├── assets/                 # Static assets (images, etc.)
├── App.jsx                 # Root component with routing
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

## Routes

The application includes the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Home page |
| `/about-us` | AboutUs | About the company |
| `/leaders` | Leaders | Leadership team |
| `/faces` | Faces | Faces behind WNL |
| `/awards` | Awards | Awards and recognition |
| `/award/:id` | AwardDetails | Individual award details |
| `/careers` | Careers | Job listings |
| `/job/:id` | JobDetails | Job posting details |
| `/press-release` | PressRelease | Press releases listing |
| `/press-release/:id` | PressReleaseDetails | Press release details |
| `/papers` | Papers | Publications portfolio |
| `/overview` | Overview | Company overview |
| `/our-journey` | OurJourny | Company history |
| `/locations` | Locations | Office locations |
| `/faq` | FAQ | FAQs |
| `/advertise-with-us` | AdvertiseWithUs | Advertising info |
| `/contact-us` | ContactUs | Contact page |

## Technologies Used

### Core
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM v7** - Client-side routing

### Styling & UI
- **Bootstrap 5.3** - CSS framework
- **AOS (Animate On Scroll)** - Scroll animations
- **Custom CSS** - Component-specific styling

### Utilities
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory. Deploy this directory to your web server.

### Preview Production Build Locally

```bash
npm run preview
```

## Assets Setup

For detailed information about setting up images and assets, please refer to [ASSETS_SETUP.md](ASSETS_SETUP.md).

Quick overview:
- Place assets in the `public/assets/` directory
- Images go in `public/assets/img/`
- Organize by categories: `slider/`, `portfolio/`, etc.

## Development

### Code Style

This project uses ESLint for code quality. Run linting with:

```bash
npm run lint
```

### Component Guidelines

- Each major section has its own directory with `.jsx` and `.css` files
- Components use functional components with hooks
- Routing is handled in `App.jsx`
- AOS animations are initialized globally in `App.jsx`

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 Wijeya Newspapers Limited.

## Contributing

This is a private project for Wijeya Newspapers Limited. For internal development inquiries, please contact the development team.

