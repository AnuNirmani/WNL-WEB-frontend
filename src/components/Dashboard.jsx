import React, { useEffect, useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import SEO from '../utils/SEO'

// import Publications from './Publications'
import PressRelease from './PressReleasedb'

import CallToAction from './CallToAction'
import Footer from './Footer'
import './Dashboard.css'

const Dashboard = () => {
  const [publications, setPublications] = useState([])
  const [filteredPublications, setFilteredPublications] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [activeFilter, setActiveFilter] = useState('All')

  // Fetch publications dynamically from Laravel API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/publications')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch publications: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Handle different response formats (array or wrapped in object)
        let publicationsData = []
        if (Array.isArray(data)) {
          publicationsData = data
        } else if (data && typeof data === 'object') {
          // Try common Laravel API response formats
          publicationsData = data.data || data.value || data.publications || data.results || []
        }
        
        setPublications(publicationsData)
        setFilteredPublications(publicationsData)

        // Extract unique categories dynamically
        const uniqueCategories = Array.from(
          new Set(publicationsData.map((pub) => pub.category).filter(Boolean))
        )
        setCategories(['All', ...uniqueCategories])
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
      <SEO
        title="Home"
        description="Explore publications, press releases, leaders, awards and more at Wijeya Newspapers Limited."
        path="/"
      />
      <Header />
      <div className="clearfix"></div>

      <main id="main">
        <Hero />

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
              {categories.map((filter) => (
                <li
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={activeFilter === filter ? 'filter-active' : ''}
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
                filteredPublications.map((pub) => {
                  // Handle different field names (name/title, cover_image/image)
                  const pubName = pub.name || pub.title || 'Untitled'
                  const pubImage = pub.cover_image ? `storage/${pub.cover_image}` : (pub.image || '')
                  const imageUrl = pubImage ? `http://127.0.0.1:8000/${pubImage}` : null
                  
                  return (
                    <div
                      className={`col-lg-3 col-md-6 portfolio-item filter-${pub.category?.toLowerCase() || 'card'}`}
                      key={pub.id}
                    >
                      <div className="portfolio-img">
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            className="img-fluid"
                            alt={pubName}
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=No+Image')}
                          />
                        )}
                      </div>
                      <div className="portfolio-info">
                        <h4>{pubName}</h4>
                        {pub.category && <p>{pub.category}</p>}
                        {imageUrl && (
                          <a
                            href={imageUrl}
                            className="venobox preview-link"
                            data-gall="portfolioGallery"
                            title={pubName}
                          >
                            <i className="bx bx-plus"></i>
                          </a>
                        )}
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
                  )
                })
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">No visible publications available.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <PressRelease />
        <CallToAction />
      </main>

      <Footer />

      <a href="#" className="back-to-top" onClick={scrollToTop}>
        <i className="ri-arrow-up-line"></i>
      </a>
    </div>
  )
}

export default Dashboard
