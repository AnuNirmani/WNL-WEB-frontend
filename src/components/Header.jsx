import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      {/* Top Bar */}
      <section id="topbar" className="d-none d-lg-block" style={{ 
        background: '#0c1a4b', 
        padding: '8px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="contact-info d-flex align-items-center">
                <i className="fas fa-envelope me-2" style={{ color: '#fff' }}></i>
                <a href="mailto:contact@example.com" style={{ color: '#fff', textDecoration: 'none' }}>
                  www.wijeyanewspapers.lk
                </a>
                <span style={{ color: '#fff', margin: '0 10px' }}>|</span>
                <i className="fa fa-phone me-2" style={{ color: '#fff' }}></i>
                <span style={{ color: '#fff' }}>011 247 9479</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="social-icons d-flex justify-content-end">
                <a href="https://facebook.com" className="social-icon facebook me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" className="social-icon twitter me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" className="social-icon linkedin me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <div className="container" style={{ 
        background: '#0c1a4b', 
        padding: '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="logo-container">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="logo-wrapper" style={{
                  background: '#fff',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  <img 
                    src="" 
                    alt="Wijeya Newspapers - Helping Shape Opinions" 
                    style={{
                      height: '50px',
                      width: 'auto'
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-8">
            <nav className="navbar navbar-expand-lg">
              <button
                className="navbar-toggler ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#wijeyaNavbar"
                aria-controls="wijeyaNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ borderColor: '#fff' }}
              >
                <span className="navbar-toggler-icon" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")" }}></span>
              </button>

              <div className="collapse navbar-collapse" id="wijeyaNavbar">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="whoWeAreDropdown" role="button" data-bs-toggle="dropdown">
                      Who we are
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="whoWeAreDropdown">
                      <li><a className="dropdown-item" href="about-us.html">About Us</a></li>
                      <li><a className="dropdown-item" href="about-us.html#vision">Vision</a></li>
                      <li><a className="dropdown-item" href="about-us.html#mission">Mission</a></li>
                      <li><a className="dropdown-item" href="about-us.html#values">Values</a></li>
                      <li><a className="dropdown-item" href="our-journey.html">Our Journey</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/leaders">Leadership</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="our-network.html">Our Network</a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/faces">Faces</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/awards">Awards</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/press-release">Press Release</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button" data-bs-toggle="dropdown">
                      More
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                      <li><a className="dropdown-item" href="faq.html">FAQs</a></li>
                      <li><a className="dropdown-item" href="location.html">Locations</a></li>
                      <li><Link className="dropdown-item" to="/careers">Careers</Link></li>
                      <li><a className="dropdown-item" href="advertise.html">Advertise With Us</a></li>
                      <li><a className="dropdown-item" href="contactus.html">Contact Us</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

