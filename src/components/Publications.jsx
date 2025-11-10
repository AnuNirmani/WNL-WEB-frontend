import React, { useState, useEffect } from 'react'

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [publications, setPublications] = useState([])
  const [categories, setCategories] = useState(['all'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        
        // Extract unique categories dynamically from the data
        const uniqueCategories = Array.from(
          new Set(publicationsData.map((pub) => pub.category).filter(Boolean))
        ).map(cat => String(cat).toLowerCase())
        setCategories(['all', ...uniqueCategories])
      } catch (err) {
        console.error('Error fetching publications:', err)
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
    : publications.filter(pub => {
        const category = String(pub?.category || '').toLowerCase()
        return category === activeFilter.toLowerCase()
      })

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
          {categories.map(filter => (
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
          {filteredPublications.length === 0 && !loading && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No publications available.</p>
            </div>
          )}
          {filteredPublications.map((pub) => {
            // Handle different field names (title/name, image/cover_image)
            const pubName = pub.name || pub.title || 'Untitled'
            const pubImage = pub.cover_image ? `storage/${pub.cover_image}` : (pub.image || '')
            const imageUrl = pubImage ? `http://127.0.0.1:8000/${pubImage}` : 'https://via.placeholder.com/400x300?text=No+Image'
            
            return (
              <div className="col-lg-3 col-md-6 portfolio-item" key={pub.id}>
                <div className="portfolio-img">
                  <img 
                    src={imageUrl} 
                    className="img-fluid" 
                    alt={pubName}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=No+Image')}
                  />
                </div>
                <div className="portfolio-info">
                  <h4>{pubName}</h4>
                  <a href={imageUrl} data-gall="portfolioGallery" className="venobox preview-link" title={pubName}>
                    <i className="bx bx-plus"></i>
                  </a>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="details-link" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Publications
