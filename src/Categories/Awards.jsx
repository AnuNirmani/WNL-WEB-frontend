import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import useAwardsController from '../controllers/useAwardsController';
import '../categories/Awards.css';
import awardsBanner from '../assets/awards.jpg';

const AwardsPage = () => {
  const {
    filteredAwards,
    years,
    selectedYear,
    selectedTitle,
    setSelectedYear,
    setSelectedTitle,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useAwardsController();

  const observerRef = useRef(null);
  const lastAwardElementRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, loadMore]
  );

  useEffect(() => {
    document.body.classList.add('awards-page-body');
    return () => document.body.classList.remove('awards-page-body');
  }, []);

  return (
    <div className="awards-page">
      <SEO
        title="Awards"
        description="Recognizing excellence in journalism and media innovation at Wijeya Newspapers."
        path="/awards"
      />
      <Header />

      {/* Banner */}
      <div className="container-fluid" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-sm-12 pl-0 pr-0">
            <img
              src={awardsBanner}
              className="img-fluid awards-banner-img"
              alt="Awards Banner - Wijeya Newspapers Awards Collection"
            />
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <section id="awards" className="awards section-bg" style={{ marginTop: 0, paddingTop: '1rem' }}>
        <div className="container py-3" data-aos="fade-up">
          <div className="section-title" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-center mb-4">Awards</h2>
            <p className="text-center mb-4">
              Recognizing excellence in journalism and media innovation.
            </p>
          </div>

          {/* 🔹 Filters */}
          <div className="row mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-md-6">
<select
  id="yearFilter"
  className="form-control"
  value={selectedYear}
  onChange={(e) => {
    setSelectedYear(e.target.value);
  }}
>
  <option value="">Filter by Year</option>
  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>

            </div>
            <div className="col-md-6">
              <input
                type="text"
                id="titleFilter"
                className="form-control"
                placeholder="Filter by Title"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              />
            </div>
          </div>

          {/* 🔹 Awards Grid */}
          <div className="row" id="awardsGrid">
            {loading && filteredAwards.length === 0 ? (
              <p>Loading awards...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : filteredAwards.length === 0 ? (
              <p>No Awards Found.</p>
            ) : (
              <>
                {filteredAwards.map((award, index) => {
                  const isLastElement = index === filteredAwards.length - 1;
                  return (
                    <div
                      key={award.post_id}
                      ref={isLastElement ? lastAwardElementRef : null}
                      className="col-lg-4 col-md-6 mb-4 award-card"
                      data-aos="zoom-in"
                      data-aos-delay={index < 3 ? (index + 1) * 100 : 300}
                      style={index >= 3 ? { marginTop: '1.5rem' } : {}}
                    >
                      <div className="card h-100 shadow-sm">
                        <img
                          src={award.image || 'assets/img/awards/dummy.jpg'}
                          className="card-img-top"
                          alt={award.title || 'Award Image'}
                          onError={(e) => (e.target.src = 'assets/img/awards/dummy.jpg')}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{award.title}</h5>
                          <p className="card-text">{award.sub_topic || '—'}</p>
                          <Link to={`/award/${award.post_id}`} className="btn-view-more">
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {loadingMore && (
                  <div className="col-12 text-center my-4">
                    <p>Loading more awards...</p>
                  </div>
                )}
                {!hasMore && !selectedYear && !selectedTitle && filteredAwards.length > 0 && (
                  <div className="col-12 text-center my-4">
                    {/* <p>No more awards to load.</p> */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AwardsPage;
