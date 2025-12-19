// src/components/LeadersPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import useLeadersController from '../controllers/useLeadersController';
import '../leaders/Leaders.css';

const LeadersPage = () => {
  const { 
    leaders, 
    loading, 
    loadingMore,
    error, 
    loadMore,
    hasMore,
  } = useLeadersController();

  // Infinite scroll observer
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, loadMore]);

  return (
    <div className="leaders-page">
      <SEO
        title="Leaders"
        description="Meet the leaders guiding Wijeya Newspapers."
        path="/leaders"
      />
      <Header />

      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Leadership</li>
          </ol>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="our-leaders" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>OUR LEADERS</h2>
            <p>Meet the people guiding Wijeya Newspapers towards a brighter future.</p>
          </div>

          <div id="leadersGrid" className="row">
            {loading && <p className="text-center w-100">Loading leaders...</p>}
            {error && <p className="text-danger text-center w-100">{error}</p>}
            {!loading && !error && leaders.length === 0 && (
              <p className="text-center w-100">No leaders found.</p>
            )}

            {!loading && !error && leaders.map((emp, index) => (
              <div
                key={emp.id}
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay={100 + index * 100}
              >
                <div className="member">
                  <img
                    src={emp.photo || 'https://placehold.co/400x400?text=No+Photo'}
                    className="img-fluid"
                    alt={emp.name || 'Unnamed Leader'}
                    onError={(e) => (e.target.src = 'https://placehold.co/400x400?text=No+Photo')}
                  />
                  <div className="member-content">
                    <h4>{emp.name || 'Unnamed'}</h4>
                    <span>{emp.job_title || emp.title || ''}</span>
                    <p>{emp.bio?.trim() ? emp.bio : 'No bio available.'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {!loading && !error && hasMore && (
            <div ref={observerTarget} style={{ height: '20px', marginTop: '20px', width: '100%' }}>
              {loadingMore && (
                <p className="text-center text-muted">Loading more leaders...</p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadersPage;
