// src/components/PressReleasePage.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePressReleaseController from '../controllers/usePressReleaseController';
import './PressRelease.css';

const PressReleasePage = () => {
  const {
    filteredPressReleases,
    years,
    selectedYear,
    searchTitle,
    setSelectedYear,
    setSearchTitle,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = usePressReleaseController();

  // 🔹 Infinite scroll observer
  const observerRef = useRef(null);
  const lastPressElementRef = useCallback(
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
    document.body.classList.add('press-release-page-body');
    return () => document.body.classList.remove('press-release-page-body');
  }, []);

  return (
    <div className="press-release-page">
      <Header />

      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Press Release</li>
          </ol>
        </div>
      </section>

      {/* Press Release Section */}
      <section id="press-release" className="press-release section-bg py-5">
        <div className="container">
          <div className="section-title">
            <h2>Press Release</h2>
            <p>Official statements and updates from Wijeya Newspapers.</p>
          </div>

          {/* 🔹 Filters */}
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
<select
  id="yearFilter"
  className="form-control w-100"
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
>
  <option value="">Filter by Year</option>
  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>

            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                id="titleFilter"
                className="form-control w-100"
                placeholder="Search by Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>

          {/* 🔹 Press Release Cards */}
          <div className="row" id="pressList">
            {loading && filteredPressReleases.length === 0 ? (
              <p className="text-center">Loading press releases...</p>
            ) : error ? (
              <p className="text-danger text-center">{error}</p>
            ) : filteredPressReleases.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No press releases found matching your criteria.</p>
              </div>
            ) : (
              <>
                {filteredPressReleases.map((release, index) => {
                  const isLastElement = index === filteredPressReleases.length - 1;
                  return (
                    <div
                      key={release.post_id}
                      ref={isLastElement ? lastPressElementRef : null}
                      className="col-lg-4 col-md-6 mb-4 press-item"
                      data-aos="zoom-in"
                      data-aos-delay={index < 3 ? (index + 1) * 100 : 300}
                      style={index >= 3 ? { marginTop: '1.5rem' } : {}}
                    >
                      <div className="card h-100 shadow-sm">
                        <img
                          src={release.image || 'https://via.placeholder.com/400x250?text=Press+Release'}
                          className="card-img-top"
                          alt={release.title || 'Press Release'}
                          onError={(e) =>
                            (e.target.src = 'https://via.placeholder.com/400x250?text=Press+Release')
                          }
                        />
                        <div className="card-body">
                          <h5 className="card-title">{release.title}</h5>
                          <p className="text-muted small">{release.sub_topic || ''}</p>
                          <Link to={`/press-release/${release.post_id}`} className="btn-view-more">
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {loadingMore && (
                  <div className="col-12 text-center my-4">
                    {/* <p>Loading more press releases...</p> */}
                  </div>
                )}
                {!hasMore && !selectedYear && !searchTitle && filteredPressReleases.length > 0 && (
                  <div className="col-12 text-center my-4">
                    {/* <p>No more press releases to load.</p> */}
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

export default PressReleasePage;
