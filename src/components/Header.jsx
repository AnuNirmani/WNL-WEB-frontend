import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSectionScroll = (e, sectionId) => {
    e.preventDefault()
    
    // Navigate to about-us page first if not already there
    if (window.location.pathname !== '/about-us') {
      window.location.href = `/about-us#${sectionId}`
      return
    }
    
    // If already on about-us page, scroll to section
    scrollToSection(sectionId)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 120 // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    // Handle scrolling when page loads with hash
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && ['vision', 'mission', 'values', 'services', 'logos'].includes(hash)) {
        // Delay to ensure page is fully loaded
        setTimeout(() => {
          scrollToSection(hash)
        }, 500)
      }
    }

    handleHashScroll()
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll)

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      const navbar = document.getElementById('wijeyaNavbar')
      const toggler = event.target.closest('.navbar-toggler')
      
      if (navbar && !navbar.contains(event.target) && !toggler && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    // Close menu on window resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 992 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  return (
    <header id="header" className="fixed-top">
      {/* Top Bar */}
      <section id="topbar" className="d-none d-lg-block" style={{ 
        background: '#0c1a4b', 
        padding: '8px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between">
                <div className="contact-info d-flex align-items-center">
                  <i className="fas fa-envelope me-2" style={{ color: '#fff' }}></i>
                  <a href="mailto:www.wijeyanewspapers.lk" style={{ color: '#fff', textDecoration: 'none' }}>
                    www.wijeyanewspapers.lk
                  </a>
                  <span style={{ color: '#fff', margin: '0 10px' }}>|</span>
                  <i className="fa fa-phone me-2" style={{ color: '#fff' }}></i>
                  <a href="tel:+94112479479" style={{ color: '#fff', textDecoration: 'none' }} aria-label="Call 011 247 9479">
                    011 247 9479
                  </a>
                </div>
                <div className="social-icons d-flex align-items-center">
                  <a href="https://www.facebook.com/share/1AFp19ePAD/" className="social-icon facebook me-2" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://x.com/dailymirror_sl?s=21" className="social-icon twitter me-2" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/wijeya-newspapers-ltd/" className="social-icon linkedin me-2" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.instagram.com/hi_online_lk?igsh=MWd6dnliaHdxMXZpNw==" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <div className="header-main" style={{ 
        background: '#0c1a4b', 
        padding: '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-4">
              <div className="logo-container">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="logo-wrapper" style={{
                    background: '#fff',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    display: 'inline-block'
                  }}>
                    <img 
                      src={logo} 
                      alt="Wijeya Newspapers - Helping Shape Opinions" 
                      className="logo-img"
                      style={{
                        height: '40px',
                        width: 'auto'
                      }}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-8">
              <nav className="navbar navbar-expand-lg p-0">
                <button
                  className="navbar-toggler ms-auto d-lg-none"
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="wijeyaNavbar">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="whoWeAreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Who we are
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="whoWeAreDropdown">
                        <li><Link className="dropdown-item" to="/about-us" onClick={closeMenu}>About Us</Link></li>
                        <li><a className="dropdown-item" href="/about-us#vision" onClick={(e) => { handleSectionScroll(e, 'vision'); closeMenu(); }}>Vision</a></li>
                        <li><a className="dropdown-item" href="/about-us#mission" onClick={(e) => { handleSectionScroll(e, 'mission'); closeMenu(); }}>Mission</a></li>
                        <li><a className="dropdown-item" href="/about-us#values" onClick={(e) => { handleSectionScroll(e, 'values'); closeMenu(); }}>Values</a></li>
                        <li><a className="dropdown-item" href="/about-us#logos" onClick={(e) => { handleSectionScroll(e, 'logos'); closeMenu(); }}>Publications</a></li>
                        <li><Link className="dropdown-item" to="/our-journey" onClick={closeMenu}>Our Journey</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/leaders" onClick={closeMenu}>Leadership</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/papers" onClick={closeMenu}>Our Network</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/faces" onClick={closeMenu}>Faces</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/awards" onClick={closeMenu}>Awards</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/press-release" onClick={closeMenu}>Press Release</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                        <li><Link className="dropdown-item" to="/faq" onClick={closeMenu}>FAQs</Link></li>
                        <li><Link className="dropdown-item" to="/locations" onClick={closeMenu}>Locations</Link></li>
                        <li><Link className="dropdown-item" to="/careers" onClick={closeMenu}>Careers</Link></li>
                        <li><Link className="dropdown-item" to="/advertise-with-us" onClick={closeMenu}>Advertise With Us</Link></li>
                        <li><Link className="dropdown-item" to="/contact-us" onClick={closeMenu}>Contact Us</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

