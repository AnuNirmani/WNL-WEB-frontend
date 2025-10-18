import React from 'react'
import './logos.css'

const Logos = () => {
  const publications = [
    {
      name: 'Lankadeepa',
      link: 'http://www.lankadeepa.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Sunday Lankadeepa',
      link: 'http://www.lankadeepa.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Daily Mirror',
      link: 'http://www.dailymirror.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Sunday Times',
      link: 'http://www.sundaytimes.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Ada',
      link: 'http://www.ada.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'FT',
      link: 'http://www.ft.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Sirikatha',
      link: '',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    },
    {
      name: 'Deshaya',
      link: 'http://www.deshaya.lk/',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop'
    }
  ]

  return (
    <section id="logos" className="services section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Our Publications</h2>
          <p>
            For the Sinhala speaking reader, our Sinhala newspapers and publications include 
            the Lankadeepa which appears as in daily and Sunday avatars; Wijeya, which is a 
            paper dedicated wholly for kids in primary school; and Bilindu, dedicated for 
            kids in kindergarten.
          </p>
          <p>
            In addition, Wijeya Newspaper also offers Tamil Mirror, the only 24-hour breaking 
            news site in Tamil.
          </p>
        </div>

        <div className="row">
          {publications.map((publication, index) => (
            <div key={index} className="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
              <div className="publication-card">
                <div className="publication-image">
                  <img src={publication.image} alt={`${publication.name} content`} />
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logos
