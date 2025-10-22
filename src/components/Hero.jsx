import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const newsItems = [
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'News Headline 4',
      date: '20 Aug 2025',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'News Headline 5',
      date: '15 Aug 2025',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      title: 'News Headline 6',
      date: '10 Aug 2025',
    },
  ]

  const handleViewMore = (item) => {
    navigate('/overview', { state: item })
  }

  return (
    <section id="intro-sec">
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          {newsItems.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card news-card">
                <img src={item.image} alt={`News ${item.id}`} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <span className="date pb-2">{item.date}</span>
                  <br />
                  <button 
                    onClick={() => handleViewMore(item)} 
                    className="btn btn-view"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero