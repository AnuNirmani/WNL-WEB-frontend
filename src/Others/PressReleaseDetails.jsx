// src/components/PressReleaseDetailsPage.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePressReleaseDetailsController from '../controllers/usePressReleaseDetailsController';
import '../others/PressReleaseDetails.css';

const PressReleaseDetailsPage = () => {
  const { id } = useParams();
  const { release, loading, error } = usePressReleaseDetailsController(id);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading Press Release Details...</p>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || 'Press release not found.'}</p>
      </div>
    );
  }

  return (
    <div className="press-release-details-page">
      <Header />

      <div className="container press-details-container py-5">
        <br />

        {/* Title & Subtitle */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="press-title">{release.title}</h1>
          <p className="press-subtitle">{release.sub_topic}</p>
        </div>

        {/* Description (render HTML directly) */}
        <div
          className="press-content"
          data-aos="fade-up"
          data-aos-delay="100"
          dangerouslySetInnerHTML={{
            __html: Array.isArray(release.description)
              ? release.description.join(' ')
              : release.description,
          }}
        ></div>

        {/* Image (if available) */}
        {release.image && (
          <div
            // className="carousel slide mb-5"
            // id="pressGallery"
            // data-aos="fade-up"
            // data-aos-delay="200"
          >
            {/* <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={release.image}
                  className="d-block w-100 gallery-img"
                  alt={release.title}
                  onError={(e) => (e.target.src = '/assets/img/press/dummy.jpg')}
                />
              </div>
            </div> */}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/press-release" className="btn-secondary">
            ← Back to Press Releases
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PressReleaseDetailsPage;
