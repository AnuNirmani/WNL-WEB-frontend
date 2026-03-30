import React, { useEffect, useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import SEO from '../utils/SEO'
import { authFetch } from '../api/client'
import headerTopImage from '../assets/heder_image.png'

// import Publications from './Publications'
import CallToAction from './CallToAction'
import Footer from './Footer'
import './Dashboard.css'

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || 'http://127.0.0.1:8000'

const extractPublicationArray = (payload) => {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidateKeys = ['data', 'value', 'publications', 'results', 'items']
  for (const key of candidateKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  for (const key of candidateKeys) {
    if (payload[key] && typeof payload[key] === 'object') {
      const nested = extractPublicationArray(payload[key])
      if (nested.length > 0) {
        return nested
      }
    }
  }

  return []
}

const Dashboard = () => {
  const [publications, setPublications] = useState([])
  const [filteredPublications, setFilteredPublications] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loadingPublications, setLoadingPublications] = useState(true)
  const [publicationsError, setPublicationsError] = useState('')

  // Fetch publications dynamically from Laravel API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoadingPublications(true)
        setPublicationsError('')

        const data = await authFetch('/publications', { allow404: true })
        const publicationsData = extractPublicationArray(data)
        
        setPublications(publicationsData)
        setFilteredPublications(publicationsData)

        // Extract unique categories dynamically
        const uniqueCategories = Array.from(
          new Set(publicationsData.map((pub) => pub.category).filter(Boolean))
        )
        setCategories(['All', ...uniqueCategories])
      } catch (error) {
        console.error('Error fetching publications:', error)
        setPublications([])
        setFilteredPublications([])
        setCategories(['All'])
        setPublicationsError('Unable to load publications right now. Please try again later.')
      } finally {
        setLoadingPublications(false)
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
        <section className="header-top-image" aria-label="Featured image">
          <img src={headerTopImage} alt="Featured" className="header-top-image__img" />
        </section>

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
              {loadingPublications ? (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">Loading publications...</p>
                </div>
              ) : publicationsError ? (
                <div className="col-12 text-center py-5">
                  <p className="text-danger mb-0">{publicationsError}</p>
                </div>
              ) : filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => {
                  // Handle different field name
                  // s (name/title, cover_image/image)
                  const pubName = pub.name || pub.title || 'Untitled'
                  const pubImage = pub.cover_image ? `storage/${pub.cover_image}` : (pub.image || '')
                  const imageUrl = pubImage ? `${BACKEND_ORIGIN}/${pubImage}` : null
                  
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
