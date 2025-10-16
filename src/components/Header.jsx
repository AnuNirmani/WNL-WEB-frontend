import React from 'react'

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <section id="topbar" className="d-none d-lg-block" style={{ background: '#f8f9fa', padding: '5px 15px' }}>
        <div className="contact-info float-left">
          <i className="fas fa-envelope"></i>
          <a href="mailto:contact@example.com">www.wijeyanewspapers.lk</a>
          <i className="fa fa-phone"></i> 011 247 9479
        </div>

        <div className="social-icons float-right">
          <a href="https://facebook.com" className="facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="twitter" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" className="linkedin" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" className="instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>

      <div className="container menubarhead d-flex align-items-center pt-2">
        <h1 className="logo mr-auto">
          <a href="index.html">
            <img src="assets/img/wijeya_logo.png" alt="Wijeya Logo" />
          </a>
        </h1>

        <nav className="navbar navbar-expand-lg navbar-light bg-blue">
          <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#wijeyaNavbar"
            aria-controls="wijeyaNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="wijeyaNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="whoWeAreDropdown" role="button">
                  Who we are
                </a>
                <div className="dropdown-menu" aria-labelledby="whoWeAreDropdown">
                  <a className="dropdown-item" href="about-us.html">About Us</a>
                  <a className="dropdown-item" href="about-us.html#vision">Vision</a>
                  <a className="dropdown-item" href="about-us.html#mission">Mission</a>
                  <a className="dropdown-item" href="about-us.html#values">Values</a>
                  <a className="dropdown-item" href="our-journey.html">Our Journey</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="our-leaders.html">Leadership</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="our-network.html">Our Network</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="faces.html">Faces</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="awards.html">Awards</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="press-release.html">Press Release</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button">
                  More
                </a>
                <div className="dropdown-menu" aria-labelledby="moreDropdown">
                  <a className="dropdown-item" href="faq.html">FAQs</a>
                  <a className="dropdown-item" href="location.html">Locations</a>
                  <a className="dropdown-item" href="careers.html">Careers</a>
                  <a className="dropdown-item" href="advertise.html">Advertise With Us</a>
                  <a className="dropdown-item" href="contactus.html">Contact Us</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

