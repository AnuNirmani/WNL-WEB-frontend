import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './OurJourny.css'

const OurJourny = () => {
  // Timeline data - 26 milestones as mentioned in the description
  const timelineData = [
    {
      year: '1980',
      description: 'Launched our first publication with a small but dedicated team.',
      side: 'left'
    },
    {
      year: '1981',
      description: 'Introduced a weekly supplement to expand coverage.',
      side: 'right'
    },
    {
      year: '1984',
      description: 'Expanded our editorial team and improved print quality significantly.',
      side: 'left'
    },
    {
      year: '1986',
      description: 'Launched our first regional edition to serve local communities.',
      side: 'right'
    },
    {
      year: '1988',
      description: 'Introduced color printing technology to enhance reader experience.',
      side: 'left'
    },
    {
      year: '1989',
      description: 'Established our first branch office outside the capital city.',
      side: 'right'
    },
    {
      year: '1991',
      description: 'Launched our second major publication to diversify our portfolio.',
      side: 'left'
    },
    {
      year: '1993',
      description: 'Introduced computerized layout systems for better efficiency.',
      side: 'right'
    },
    {
      year: '1995',
      description: 'Celebrated 15 years of excellence in journalism and media.',
      side: 'left'
    },
    {
      year: '1997',
      description: 'Launched our first digital initiative with online presence.',
      side: 'right'
    },
    {
      year: '1999',
      description: 'Expanded to cover breaking news with dedicated news teams.',
      side: 'left'
    },
    {
      year: '2001',
      description: 'Introduced specialized sections for business and technology.',
      side: 'right'
    },
    {
      year: '2003',
      description: 'Launched mobile news services for on-the-go readers.',
      side: 'left'
    },
    {
      year: '2005',
      description: 'Celebrated 25 years of trusted journalism and community service.',
      side: 'right'
    },
    {
      year: '2007',
      description: 'Introduced multimedia content with video and audio features.',
      side: 'left'
    },
    {
      year: '2009',
      description: 'Launched social media presence to connect with younger audiences.',
      side: 'right'
    },
    {
      year: '2011',
      description: 'Expanded digital platforms with mobile applications.',
      side: 'left'
    },
    {
      year: '2013',
      description: 'Introduced interactive content and reader engagement features.',
      side: 'right'
    },
    {
      year: '2015',
      description: 'Launched investigative journalism unit for in-depth reporting.',
      side: 'left'
    },
    {
      year: '2017',
      description: 'Celebrated 35 years of media excellence and innovation.',
      side: 'right'
    },
    {
      year: '2019',
      description: 'Introduced AI-powered content recommendation systems.',
      side: 'left'
    },
    {
      year: '2021',
      description: 'Launched virtual reality news experiences for immersive storytelling.',
      side: 'right'
    },
    {
      year: '2023',
      description: 'Introduced sustainable printing practices and eco-friendly initiatives.',
      side: 'left'
    },
    {
      year: '2024',
      description: 'Launched comprehensive fact-checking and verification systems.',
      side: 'right'
    },
    {
      year: '2025',
      description: 'Celebrating our legacy while embracing the future of media innovation.',
      side: 'left'
    }
  ]

  return (
    <>
      <Header />
      
      <main id="main">
        {/* Breadcrumbs */}
        <section className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li>Our Journey</li>
            </ol>
          </div>
        </section>

        {/* Our Journey Section */}
        <section id="our-journey" className="our-journey">
          <div className="container">
            <div className="section-title text-center">
              <h2>OUR JOURNEY SO FAR</h2>
              <p>From humble beginnings to national prominence — 26 key milestones in our story.</p>
            </div>

            <div className="timeline">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item"
                  data-aos={item.side === 'left' ? 'fade-right' : 'fade-left'}
                >
                  <div className="timeline-img"></div>
                  <div className={`timeline-content ${item.side}`}>
                    <span className="year">{item.year}</span>
                    <img 
                      src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop" 
                      alt={`Milestone ${item.year}`} 
                      className="img-fluid"
                    />
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default OurJourny
