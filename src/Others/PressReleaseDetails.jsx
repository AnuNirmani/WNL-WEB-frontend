import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './PressReleaseDetails.css'

const PressReleaseDetails = () => {
  const { id } = useParams()
  const [activeIndex, setActiveIndex] = useState(0)

  // Sample data - In production, this would come from an API or props
  const pressReleases = [
    {
      id: 1,
      title: "Dailymirror announces new editorial team",
      date: "10 Jan 2025",
      paper: "Dailymirror",
      year: "2025",
      subtitle: "Published on: 10 Jan 2025 | Dailymirror",
      description: [
        "Dailymirror is proud to announce the formation of a new editorial team that will lead the publication into its next chapter of journalistic excellence. This strategic restructuring aims to strengthen our commitment to investigative reporting and expand our digital presence.",
        "The newly appointed editorial board brings decades of combined experience in journalism, digital media, and investigative reporting. Under their leadership, Dailymirror will continue to deliver accurate, timely, and impactful news coverage to our readers.",
        "As part of this transformation, we are investing heavily in digital platforms and multimedia storytelling. Our goal is to meet our readers where they are, providing content that is accessible, engaging, and relevant across all devices.",
        "The new team will prioritize investigative journalism, ensuring that we continue to hold power to account and shed light on important issues affecting our communities. We believe in the power of quality journalism to drive positive change.",
        "This is an exciting time for Dailymirror, and we look forward to continuing our mission of delivering trusted news and information to our valued readers. Stay tuned for more updates as we embark on this new journey."
      ],
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Lankadeepa celebrates 30 years of excellence",
      date: "20 Dec 2024",
      paper: "Lankadeepa",
      year: "2024",
      subtitle: "Published on: 20 Dec 2024 | Lankadeepa",
      description: [
        "Lankadeepa proudly celebrates 30 years of journalistic excellence and unwavering commitment to serving the community. This milestone marks three decades of delivering quality news and information in the Sinhala language.",
        "Since its inception, Lankadeepa has been at the forefront of Sinhala journalism, providing comprehensive coverage of local and international news, politics, sports, entertainment, and more. Our dedication to truth and accuracy has earned us the trust of millions of readers.",
        "To commemorate this special occasion, Lankadeepa organized a grand anniversary event attended by current and former staff members, industry leaders, and distinguished guests. The event featured recognition ceremonies for long-serving employees and highlights from three decades of impactful journalism.",
        "Our success over these 30 years would not have been possible without the dedication and hard work of our talented journalists, editors, photographers, and support staff. We take this opportunity to honor their contributions and commitment to excellence.",
        "As we look ahead to the future, Lankadeepa remains committed to adapting to the changing media landscape while maintaining our core values of integrity, accuracy, and public service. We are excited about the opportunities that lie ahead and grateful for the continued support of our readers."
      ],
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586339949216-35c2747e6e5c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1577563682339-f749e8027e87?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Sundaytimes launches youth journalism program",
      date: "05 Nov 2024",
      paper: "Sundaytimes",
      year: "2024",
      subtitle: "Published on: 05 Nov 2024 | Sundaytimes",
      description: [
        "Sundaytimes is thrilled to announce the launch of its Youth Journalism Program, a groundbreaking initiative designed to nurture the next generation of journalists. This comprehensive training program will provide aspiring young reporters with hands-on experience and mentorship from our senior editorial team.",
        "The Youth Journalism Program is a six-month intensive training course that covers all aspects of modern journalism, from news gathering and reporting to digital media production and ethical journalism practices. Participants will work alongside experienced Sundaytimes journalists on real stories and assignments.",
        "Each participant in the program will be paired with a senior reporter who will serve as their mentor throughout the training period. This one-on-one guidance ensures personalized learning and professional development tailored to each individual's strengths and career goals.",
        "The curriculum includes training in investigative reporting, multimedia storytelling, data journalism, social media engagement, and editorial standards. Participants will also learn about media law, ethics, and the responsibilities that come with being a journalist in today's fast-paced digital environment.",
        "This program reflects Sundaytimes' commitment to investing in the future of journalism. By training young journalists and instilling in them the values of truth, accuracy, and public service, we are helping to ensure a vibrant and professional media landscape for years to come."
      ],
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1553532434-5ab5b6b84993?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop"
      ]
    }
  ]

  const release = pressReleases.find(r => r.id === parseInt(id))

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? release.images.length - 1 : prevIndex - 1
    )
  }

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === release.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Auto-advance carousel
  useEffect(() => {
    if (release && release.images) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === release.images.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [release])

  if (!release) {
    return (
      <div className="press-release-details-page">
        <Header />
        <div className="container py-5">
          <div className="alert alert-warning">
            Press release not found.
          </div>
          <Link to="/press-release" className="btn btn-secondary">Back to Press Releases</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="press-release-details-page">
      <Header />
      
      {/* Main Content */}
      <div className="container press-details-container py-5">
        <br />
        
        {/* Press Release Title */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="press-title">{release.title}</h1>
          <p className="press-subtitle">{release.subtitle}</p>
        </div>

        {/* Press Release Content */}
        <div className="press-content" data-aos="fade-up" data-aos-delay="100">
          {release.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Image Gallery Carousel */}
        <div 
          id="pressGallery" 
          className="carousel slide mb-5" 
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <div className="carousel-inner">
            {release.images.map((image, index) => (
              <div 
                key={index} 
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              >
                <img 
                  src={image} 
                  className="d-block w-100 gallery-img" 
                  alt={`Press Release Image ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Press+Release'
                  }}
                />
              </div>
            ))}
          </div>
          <button 
            className="carousel-control-prev" 
            type="button" 
            onClick={handlePrevSlide}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            onClick={handleNextSlide}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/press-release" className="btn btn-secondary">Back to Press Releases</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PressReleaseDetails

