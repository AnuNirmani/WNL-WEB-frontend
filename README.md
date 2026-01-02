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
3. **Start the development server**:
```bash
npm run dev
# or
yarn dev
```

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
src/
├── api/              # API service layer
├── controllers/      # Business logic (custom hooks)
├── components/       # Reusable UI components
├── WhoAreWe/        # About Us pages
├── Leaders/         # Leadership pages
├── Categories/      # Content categories
├── More/            # Additional pages
├── Others/          # Miscellaneous pages
├── utils/           # Utility functions
├── assets/          # Images and fonts
├── App.jsx          # Root component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🏗️ Architecture

### Design Pattern: MVC (Model-View-Controller)

The application follows a modified MVC architecture:

- **Models (API Layer)**: `src/api/` - Handle data fetching and API communication
- **Views (Components)**: `src/components/`, `src/WhoAreWe/`, etc. - React components for UI
- **Controllers**: `src/controllers/` - Custom hooks managing business logic and state

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

## 🤝 Contributing

This is a private project for Wijeya Newspapers Limited. For internal development inquiries, please contact the development team.

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
- Vinuja Ketimingama

## 📞 Support

For technical support or questions:
- **Repository**: [github.com/AnuNirmani/WNL-WEB-frontend](https://github.com/AnuNirmani/WNL-WEB-frontend)
- **Issues**: [Report an Issue](anuttaranirmani@gmail.com)
- **Email**: anuttaranirmani@gmail.com

---

**Built with ❤️ by the WNL Development Team**

*Last Updated: December 05, 2025*
