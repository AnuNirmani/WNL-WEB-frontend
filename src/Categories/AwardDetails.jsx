// src/components/AwardDetailsPage.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAwardDetailsController from '../controllers/useAwardDetailsController';
import '../categories/AwardDetails.css';

const AwardDetailsPage = () => {
  const { id } = useParams();
  const {
    award,
    loading,
    error,
    activeIndex,
    handlePrevSlide,
    handleNextSlide,
  } = useAwardDetailsController(id);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading Award Details...</p>
      </div>
    );
  }

  if (error || !award) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || 'No award found.'}</p>
      </div>
    );
  }

  return (
    <div className="award-details-page">
      <Header />

      <div className="container award-details-container py-5">
        <br />

        {/* Title & Subtitle */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="award-title">{award.title}</h1>
          <p className="award-subtitle">
            {award.sub_topic ? `Awarded for: ${award.sub_topic}` : ''}
          </p>
        </div>

        {/* Description */}
        <div
          className="award-content"
          data-aos="fade-up"
          data-aos-delay="100"
          dangerouslySetInnerHTML={{ __html: award.description }}
        ></div>

        {/* Image Carousel */}
        {award.image && (
          <div
            // className="carousel slide mb-5"
            // id="awardGallery"
            // data-aos="fade-up"
            // data-aos-delay="200"
          >
            {/* <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={award.image}
                  className="d-block w-100 gallery-img"
                  alt={award.title}
                  onError={(e) => (e.target.src = '/assets/img/awards/dummy.jpg')}
                />
              </div>
            </div> */}

            {/* (Optional) Navigation buttons */}
            {/* {award.images && award.images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  onClick={handlePrevSlide}
                >
                  <span className="carousel-control-prev-icon" />
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  onClick={handleNextSlide}
                >
                  <span className="carousel-control-next-icon" />
                </button>
              </>
            )} */}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/awards" className="btn-secondary">
            ← Back to Awards
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AwardDetailsPage;
