# WNL Web Frontend

React application for Wijeya Newspapers website.

## Features

- Modern React application built with Vite
- Responsive design with Bootstrap 5
- Multiple sections:
  - Hero section with news carousel
  - Publications portfolio
  - Press releases
  - Call to action
  - Comprehensive footer

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx       # Main dashboard component
│   ├── Dashboard.css       # Dashboard styles
│   ├── Header.jsx          # Header with navigation
│   ├── Hero.jsx            # Hero section with carousel
│   ├── Publications.jsx    # Publications portfolio
│   ├── PressRelease.jsx    # Press releases section
│   ├── CallToAction.jsx    # CTA section
│   └── Footer.jsx          # Footer component
├── App.jsx                 # Root component
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

## Assets Setup

Place your assets in the `public` folder:

```
public/
├── favicon.ico
└── assets/
    ├── img/
    │   ├── wijeya_logo.png
    │   ├── slider/
    │   │   ├── 1.png
    │   │   ├── 2.png
    │   │   └── 3.png
    │   ├── portfolio/
    │   │   └── [publication images]
    │   ├── 1.png
    │   ├── 2.png
    │   └── 3.png
    └── [other asset folders]
```

## Technologies Used

- React 18
- Vite
- Bootstrap 5
- AOS (Animate On Scroll)
- Font Awesome
- Boxicons
- Remixicon

## License

Copyright © WNL. All Rights Reserved

