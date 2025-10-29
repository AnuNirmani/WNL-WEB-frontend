import React, { useState, useEffect } from 'react'

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/publications')
        if (!response.ok) throw new Error('Failed to fetch publications')
        const data = await response.json()
        setPublications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  const handleFilterClick = (filter) => setActiveFilter(filter)

  const filteredPublications = activeFilter === 'all'
    ? publications
    : publications.filter(pub => pub.category === activeFilter)

  if (loading) return <div className="text-center py-5">Loading...</div>
  if (error) return <div className="text-center py-5 text-danger">{error}</div>

  return (
    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Publications</h2>
          <p>
            Wijeya's publications meet Sri Lanka's cultural and linguistic diversity. Our English newspapers and publications include dailies such as the Daily Mirror and Financial Times and the weekend paper Sunday Times; magazines such as the society journal HI! and Lanka Woman.
          </p>
        </div>

        <ul id="portfolio-flters" className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
          {['all', 'weekly', 'daily', 'magazines'].map(filter => (
            <li
              key={filter}
              className={activeFilter === filter ? 'filter-active' : ''}
              onClick={() => handleFilterClick(filter)}
              style={{ cursor: 'pointer' }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </li>
          ))}
        </ul>

        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
          {filteredPublications.map((pub) => (
            <div className="col-lg-3 col-md-6 portfolio-item" key={pub.id}>
              <div className="portfolio-img">
                <img src={`http://127.0.0.1:8000/${pub.image}`} className="img-fluid" alt={pub.title} />
              </div>
              <div className="portfolio-info">
                <h4>{pub.title}</h4>
                <a href={`http://127.0.0.1:8000/${pub.image}`} data-gall="portfolioGallery" className="venobox preview-link" title={pub.title}>
                  <i className="bx bx-plus"></i>
                </a>
                {pub.link && (
                  <a href={pub.link} className="details-link" title="More Details">
                    <i className="bx bx-link"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications
