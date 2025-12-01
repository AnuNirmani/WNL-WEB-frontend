// src/pages/OverviewPage.jsx
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import useOverviewController from '../controllers/useOverviewController';
import '../others/Overview.css'; // You can reuse this CSS

const OverviewPage = () => {
  const location = useLocation();
  const stateItem = location.state;
  const id = stateItem?.id || useParams().id;

  const { post, loading, error } = useOverviewController(id);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading post details...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || 'No post found.'}</p>
      </div>
    );
  }

  return (
    <div className="award-details-page">
            <SEO
        title="Overview Details"
        path="/overview/details"
      />
      <Header />

      <div className="container award-details-container py-5">
        <br />

        {/* Title & Subtitle */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="award-title">{post.title}</h1>
          {post.sub_topic && (
            <p className="award-subtitle">
              {post.category_name === 'Awards'
                ? `Awarded for: ${post.sub_topic}`
                : post.sub_topic}
            </p>
          )}
        </div>

        {/* ✅ Description with embedded images */}
        <div
          className="award-content"
          data-aos="fade-up"
          data-aos-delay="100"
          dangerouslySetInnerHTML={{ __html: post.description }}
        ></div>

        {/* Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OverviewPage;
