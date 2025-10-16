import React from 'react'

const Hero = () => {
  const newsItems = [
    {
      id: 1,
      image: 'assets/img/slider/1.png',
      title: "Daily Mirror awarded the 'Most Popular English Newspaper 2025'",
      date: '08 Sep 2025',
    },
    {
      id: 2,
      image: 'assets/img/slider/3.png',
      title: 'Wijeya COO Janaka wins APO National Award for Productivity Advocates',
      date: '01 Sep 2025',
    },
    {
      id: 3,
      image: 'assets/img/slider/2.png',
      title: 'Daily FT bags Global Business Excellence Award for Best Business Newspaper',
      date: '25 Aug 2025',
    },
  ]

  const newsItems2 = [
    {
      id: 4,
      image: 'assets/img/slider/1.png',
      title: 'News Headline 4',
      date: '20 Aug 2025',
    },
    {
      id: 5,
      image: 'assets/img/slider/2.png',
      title: 'News Headline 5',
      date: '15 Aug 2025',
    },
    {
      id: 6,
      image: 'assets/img/slider/3.png',
      title: 'News Headline 6',
      date: '10 Aug 2025',
    },
  ]

  return (
    <section id="intro-sec">
      <div className="container-fluid" style={{ marginTop: '100px' }}>
        <div id="newsCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* First Slide */}
            <div className="carousel-item active">
              <div className="row">
                {newsItems.map((item) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="card news-card">
                      <img src={item.image} alt={`News ${item.id}`} />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <span className="date">{item.date}</span>
                        <br />
                        <a href="#" className="btn btn-view">View More</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Slide */}
            <div className="carousel-item">
              <div className="row">
                {newsItems2.map((item) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="card news-card">
                      <img src={item.image} alt={`News ${item.id}`} />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <span className="date pb-2">{item.date}</span>
                        <br />
                        <a href="#" className="btn btn-view">View More</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <a className="carousel-control-prev" href="#newsCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a className="carousel-control-next" href="#newsCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

