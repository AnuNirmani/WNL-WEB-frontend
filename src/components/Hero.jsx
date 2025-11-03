// src/components/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHeroController from '../controllers/useHeroController';
import '../components/dashboard.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const { newsItems, loading, error } = useHeroController();

  const handleViewMore = (item) => {
    navigate('/overview', { state: item });
  };

  return (
    <section id="intro-sec">
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          {/* Loading State */}
          {loading && (
            <div className="col-12 text-center py-5">
              <p>Loading latest posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="col-12 text-center py-5 text-danger">
              <p>{error}</p>
            </div>
          )}

          {/* No Data */}
          {!loading && !error && newsItems.length === 0 && (
            <div className="col-12 text-center py-5">
              <p>No recent posts found.</p>
            </div>
          )}

          {/* News Items */}
          {!loading &&
            !error &&
            newsItems.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="card news-card shadow-sm border-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      style={{
                        height: '250px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.5rem',
                        borderTopRightRadius: '0.5rem',
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="text-muted mb-1">{item.sub_topic}</p>
                    {item.date && <span className="date pb-2">{item.date}</span>}
                    <br />
                    <button
                      onClick={() => handleViewMore(item)}
                      className="btn btn-view mt-3"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
