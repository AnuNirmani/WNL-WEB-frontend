import React from 'react'

const Publications = () => {
  const publications = [
    { id: 1, title: 'Daily Lankadeepa', image: 'assets/img/portfolio/po-4.png', filter: 'filter-card', link: 'http://www.lankadeepa.lk/' },
    { id: 2, title: 'Daily Mirror', image: 'assets/img/portfolio/po-5.png', filter: 'filter-card', link: 'http://www.dailymirror.lk/' },
    { id: 3, title: 'Sunday Lankadeepa', image: 'assets/img/portfolio/po-2.png', filter: 'filter-app', link: 'http://www.lankadeepa.lk/sunday' },
    { id: 4, title: 'Deshaya', image: 'assets/img/portfolio/po-3.png', filter: 'filter-app', link: 'http://www.deshaya.lk/' },
    { id: 5, title: 'FT', image: 'assets/img/portfolio/po-6.png', filter: 'filter-app', link: 'http://www.ft.lk/' },
    { id: 6, title: 'Ada', image: 'assets/img/portfolio/po-7.png', filter: 'filter-card', link: 'http://www.ada.lk/' },
    { id: 7, title: 'Tamil Mirror', image: 'assets/img/portfolio/po-1.png', filter: 'filter-card', link: 'http://www.tamilmirror.lk' },
    { id: 8, title: 'Sunday Times', image: 'assets/img/portfolio/po-8.png', filter: 'filter-app', link: 'http://www.sundaytimes.lk/' },
    { id: 9, title: 'Hi Magazine', image: 'assets/img/portfolio/po-18.png', filter: 'filter-web', link: 'http://www.hi.lk/' },
    { id: 10, title: 'Lanka Women', image: 'assets/img/portfolio/po-10.png', filter: 'filter-web', link: 'http://www.lw.lk/' },
    { id: 11, title: 'Sirikatha', image: 'assets/img/portfolio/po-12.png', filter: 'filter-app', link: 'http://sirikatha.lankadeepa.lk/' },
    { id: 12, title: 'Wijaya', image: 'assets/img/portfolio/po-14.png', filter: 'filter-app', link: 'http://www.wijeya.lk/' },
    { id: 13, title: 'Bilindu', image: 'assets/img/portfolio/po-16.png', filter: 'filter-app', link: '' },
    { id: 14, title: 'Pariganaka', image: 'assets/img/portfolio/po-20.png', filter: 'filter-web', link: '' },
    { id: 15, title: 'Easy Guide', image: 'assets/img/portfolio/po-22.png', filter: 'filter-web', link: '' },
    { id: 16, title: 'Braille', image: 'assets/img/portfolio/po-23.png', filter: 'filter-app', link: '' },
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

