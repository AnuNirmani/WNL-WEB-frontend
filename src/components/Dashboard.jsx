import React, { useEffect, useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import PressRelease from './PressRelease'
import CallToAction from './CallToAction'
import Footer from './Footer'
import './Dashboard.css'

const Dashboard = () => {
  const [publications, setPublications] = useState([])
  const [filteredPublications, setFilteredPublications] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  // Fetch publications dynamically from Laravel API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/publications')
        const data = await response.json()
        setPublications(data)
        setFilteredPublications(data) // show all initially
      } catch (error) {
        console.error('Error fetching publications:', error)
      }
    }
    fetchPublications()
  }, [])

  // Handle filter button click
  const handleFilter = (category) => {
    setActiveFilter(category)
    if (category === 'All') {
      setFilteredPublications(publications)
    } else {
      const filtered = publications.filter(
        (pub) => pub.category?.toLowerCase() === category.toLowerCase()
      )
      setFilteredPublications(filtered)
    }
  }

  // Scroll-to-top button behavior
  useEffect(() => {
    const toggleBackToTop = () => {
      const backToTop = document.querySelector('.back-to-top')
      if (window.scrollY > 100) {
        backToTop.classList.add('active')
      } else {
        backToTop.classList.remove('active')
      }
    }

    window.addEventListener('scroll', toggleBackToTop)
    toggleBackToTop()
    return () => window.removeEventListener('scroll', toggleBackToTop)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="dashboard">
      <Header />

      <div className="clearfix"></div>

      <main id="main">
        {/* ======= Hero Section ======= */}
        <Hero />

        {/* ======= Publications Section ======= */}
        <section id="portfolio" className="portfolio">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Publications</h2>
              <p>
                Wijeya's publications meet Sri Lanka's cultural and linguistic
                diversity. Our English newspapers and publications include
                dailies such as the Daily Mirror and Financial Times and the
                weekend paper Sunday Times; magazines such as the society
                journal HI! and Lanka Woman.
              </p>
            </div>

            {/* Filter Buttons */}
            <ul
              id="portfolio-flters"
              className="d-flex justify-content-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {['All', 'Daily', 'Weekly', 'Magazine'].map((filter) => (
                <li
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={
                    activeFilter === filter ? 'filter-active' : ''
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {filter}
                </li>
              ))}
            </ul>

            {/* Publications Grid */}
            <div
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => (
                  <div
                    className={`col-lg-3 col-md-6 portfolio-item filter-${pub.category?.toLowerCase() || 'card'
                      }`}
                    key={pub.id}
                  >
                    <div className="portfolio-img">
                      {pub.cover_image && (
                        <img
                          src={`http://127.0.0.1:8000/storage/${pub.cover_image}`}
                          className="img-fluid"
                          alt={pub.name}
                        />
                      )}
                    </div>
                    <div className="portfolio-info">
                      <h4>{pub.name}</h4>
                      <p>{pub.category}</p>
                      <a
                        href={`http://127.0.0.1:8000/storage/${pub.cover_image}`}
                        className="venobox preview-link"
                        data-gall="portfolioGallery"
                        title={pub.name}
                      >
                        <i className="bx bx-plus"></i>
                      </a>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="details-link"
                          title="More Details"
                        >
                          <i className="bx bx-link"></i>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No visible publications available.</p>
              )}
            </div>
          </div>
        </section>

        {/* ======= Press Release Section ======= */}
        <PressRelease />

        {/* ======= CTA Section ======= */}
        <CallToAction />
      </main>

      <Footer />

      {/* Scroll to top */}
      <a href="#" className="back-to-top" onClick={scrollToTop}>
        <i className="ri-arrow-up-line"></i>
      </a>
    </div>
  )
}

export default Dashboard
