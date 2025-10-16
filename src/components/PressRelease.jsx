import React from 'react'

const PressRelease = () => {
  const pressReleases = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'Dailymirror announces new editorial team',
      date: '10 Jan 2025',
      paper: 'Dailymirror',
      description: 'Dailymirror introduces its new editorial board, aiming to expand investigative reporting and digital reach...',
      year: '2025',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'Lankadeepa celebrates 30 years of excellence',
      date: '20 Dec 2024',
      paper: 'Lankadeepa',
      description: 'Marking three decades of impactful journalism, Lankadeepa held an anniversary event recognizing its dedicated staff...',
      year: '2024',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'Sundaytimes launches youth journalism program',
      date: '05 Nov 2024',
      paper: 'Sundaytimes',
      description: 'A new initiative to train aspiring journalists under senior reporters of Sundaytimes has been officially launched...',
      year: '2024',
    },
  ]

  return (
    <section id="press-release" className="press">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Press Release</h2>
        </div>

        <div className="row" id="pressList">
          {pressReleases.map((press) => (
            <div className="col-lg-4 col-md-6 mb-4 press-item" data-year={press.year} data-paper={press.paper} key={press.id}>
              <div className="card h-100 shadow-sm">
                <img src={press.image} className="card-img-top" alt="Press Release" />
                <div className="card-body">
                  <h5 className="card-title">{press.title}</h5>
                  <p className="text-muted small">
                    {press.date} | {press.paper}
                  </p>
                  <p className="card-text">{press.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PressRelease

