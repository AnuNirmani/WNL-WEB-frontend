import React from 'react'
import './Logos.css'
import usePublicationsController from '../controllers/usePublicationsController'

const Logos = () => {
  const { publications, loading, error } = usePublicationsController()

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

        {loading && (
          <div className="text-center py-5">
            <p>Loading publications...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-5 text-danger">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="row">
            {publications.length > 0 ? (
              publications.map((publication, index) => (
                <div key={publication.id} className="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                  <div className="publication-card">
                    <div className="publication-image">
                      {publication.cover_image ? (
                        <img 
                          src={`http://127.0.0.1:8000/storage/${publication.cover_image}`} 
                          alt={`${publication.name} logo`} 
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <h4>
                      {publication.link ? (
                        <a href={publication.link} target="_blank" rel="noopener noreferrer">
                          {publication.name}
                        </a>
                      ) : (
                        <span>{publication.name}</span>
                      )}
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p>No publications available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Logos
