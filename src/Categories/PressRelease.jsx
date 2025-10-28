// src/components/PressReleasePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePressReleaseController from '../controllers/usePressReleaseController';
import '../categories/PressRelease.css';

const PressReleasePage = () => {
  const {
    filteredPressReleases,
    years,
    papers,
    selectedYear,
    setSelectedYear,
    selectedPaper,
    setSelectedPaper,
    loading,
    error,
  } = usePressReleaseController();

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
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-4 mb-2">
              <select
                id="yearFilter"
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Filter by Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-2">
              <select
                id="paperFilter"
                className="form-control"
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
              >
                <option value="">Filter by Paper</option>
                {papers.map((paper) => (
                  <option key={paper} value={paper}>{paper}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center">Loading press releases...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : filteredPressReleases.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No press releases found matching your criteria.</p>
            </div>
          ) : (
            <div className="row" id="pressList">
              {filteredPressReleases.map((release) => (
                <div key={release.post_id} className="col-lg-4 col-md-6 mb-4 press-item">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={release.image || 'https://via.placeholder.com/400x250?text=Press+Release'}
                      className="card-img-top"
                      alt="Press Release"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=Press+Release')}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{release.title}</h5>
                      <p className="text-muted small">
                        {release.sub_topic || ''}
                        {/* {release.end_date || '—'} | {release.sub_topic || ''} */}
                      </p>
                      {/* <p className="card-text">{release.description || 'No description available.'}</p> */}
                      <Link to={`/press-release/${release.post_id}`} className="btn-view-more">
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PressReleasePage;
