import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AwardDetails.css';

const AwardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample award details data - in a real app, this would come from an API or state management
  const awardDetails = {
    id: id,
    title: 'Upali Wijewardene Feature Writer of the Year',
    subtitle: 'Awarded by: Kumudini Hettiarachchi',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo ut pretium convallis, libero nisl iaculis metus, eget tincidunt urna turpis a odio.',
      'Aliquam erat volutpat. Morbi sed lacus a nisl convallis convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed lacinia leo nec sapien laoreet, in tincidunt ex fermentum.',
      'Suspendisse potenti. Integer fringilla, ligula id egestas tincidunt, justo justo efficitur turpis, a cursus nunc lacus vel leo. Praesent vulputate metus at lorem venenatis, a viverra nisi malesuada.'
    ],
    images: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400'
    ]
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? awardDetails.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === awardDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === awardDetails.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [awardDetails.images.length]);

  return (
    <div className="award-details-page">
      <Header />
      
      {/* Main Content */}
      <div className="container award-details-container py-5">
        <br />
        
        {/* Award Title */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="award-title">{awardDetails.title}</h1>
          <p className="award-subtitle">{awardDetails.subtitle}</p>
        </div>

        {/* Award Description */}
        <div className="award-content" data-aos="fade-up" data-aos-delay="100">
          {awardDetails.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Image Gallery Carousel */}
        <div 
          id="awardGallery" 
          className="carousel slide mb-5" 
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <div className="carousel-inner">
            {awardDetails.images.map((image, index) => (
              <div 
                key={index} 
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              >
                <img 
                  src={image} 
                  className="d-block w-100 gallery-img" 
                  alt={`Award Image ${index + 1}`} 
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
          <Link to="/awards" className="btn btn-secondary">Back to Awards</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AwardDetails;

