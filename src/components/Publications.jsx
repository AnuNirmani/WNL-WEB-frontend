import React from 'react'

const Publications = () => {
  const publications = [
    { id: 1, title: 'Daily Lankadeepa', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-card', link: 'http://www.lankadeepa.lk/' },
    { id: 2, title: 'Daily Mirror', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-card', link: 'http://www.dailymirror.lk/' },
    { id: 3, title: 'Sunday Lankadeepa', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://www.lankadeepa.lk/sunday' },
    { id: 4, title: 'Deshaya', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://www.deshaya.lk/' },
    { id: 5, title: 'FT', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://www.ft.lk/' },
    { id: 6, title: 'Ada', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-card', link: 'http://www.ada.lk/' },
    { id: 7, title: 'Tamil Mirror', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-card', link: 'http://www.tamilmirror.lk' },
    { id: 8, title: 'Sunday Times', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://www.sundaytimes.lk/' },
    { id: 9, title: 'Hi Magazine', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-web', link: 'http://www.hi.lk/' },
    { id: 10, title: 'Lanka Women', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-web', link: 'http://www.lw.lk/' },
    { id: 11, title: 'Sirikatha', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://sirikatha.lankadeepa.lk/' },
    { id: 12, title: 'Wijaya', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: 'http://www.wijeya.lk/' },
    { id: 13, title: 'Bilindu', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: '' },
    { id: 14, title: 'Pariganaka', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-web', link: '' },
    { id: 15, title: 'Easy Guide', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-web', link: '' },
    { id: 16, title: 'Braille', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop', filter: 'filter-app', link: '' },
  ]

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
          <li data-filter="*" className="filter-active">All</li>
          <li data-filter=".filter-app">Weekly</li>
          <li data-filter=".filter-card">Daily</li>
          <li data-filter=".filter-web">Magazines</li>
        </ul>

        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
          {publications.map((pub) => (
            <div className={`col-lg-3 col-md-6 portfolio-item ${pub.filter}`} key={pub.id}>
              <div className="portfolio-img">
                <img src={pub.image} className="img-fluid" alt={pub.title} />
              </div>
              <div className="portfolio-info">
                <h4>{pub.title}</h4>
                <a href={pub.image} data-gall="portfolioGallery" className="venobox preview-link" title={pub.title}>
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

