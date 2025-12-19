import React, { useEffect, useState } from 'react'
import { fetchPublicationsFromApi } from '../api/homeApi'
import './logos.css'

const Logos = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch publications from API (same as homepage) - uses Vite proxy to avoid CORS
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const publicationsData = await fetchPublicationsFromApi()
        setPublications(publicationsData)
      } catch (error) {
        console.error('Error fetching publications:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPublications()
  }, [])

  return (
    <section id="logos" className="services section-bg">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Our Publications</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            For the Sinhala speaking reader, our Sinhala newspapers and publications include 
            the Lankadeepa which appears as in daily and Sunday avatars; Wijeya, which is a 
            paper dedicated wholly for kids in primary school; and Bilindu, dedicated for 
            kids in kindergarten.
          </p>
          <p data-aos="fade-up" data-aos-delay="150">
            In addition, Wijeya Newspaper also offers Tamil Mirror, the only 24-hour breaking 
            news site in Tamil.
          </p>
        </div>

        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Loading publications...</p>
            </div>
          ) : publications.length > 0 ? (
            publications.map((publication, index) => {
              // Handle different field names (name/title, cover_image/image, link)
              const pubName = publication.name || publication.title || 'Untitled'
              const pubImage = publication.cover_image ? `storage/${publication.cover_image}` : (publication.image || '')
              const imageUrl = pubImage ? `http://127.0.0.1:8000/${pubImage}` : 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
              const pubLink = publication.link || ''
              
              return (
                <div key={publication.id || index} className="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                  <div className="publication-card">
                    <div className="publication-image">
                      <img 
                        src={imageUrl} 
                        alt={`${pubName} content`}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
                        }}
                      />
                    </div>
                    <h4>
                      {pubLink ? (
                        <a href={pubLink} target="_blank" rel="noopener noreferrer">
                          {pubName}
                        </a>
                      ) : (
                        <span>{pubName}</span>
                      )}
                    </h4>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No publications available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Logos
