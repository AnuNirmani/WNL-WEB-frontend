import React from 'react';
import { Link } from 'react-router-dom';
import { usePressReleaseDbController } from '../controllers/usePressReleaseDbController';

/**
 * Press Release View Component
 * Displays a list of press releases with infinite scroll
 */
const PressRelease = () => {
  const { pressReleases, loading, lastItemRef } = usePressReleaseDbController();

  return (
    <section id="press-release" className="press">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Press Release</h2>
        </div>

        <div className="row" id="pressList">
          {loading && pressReleases.length === 0 ? (
            <div className="text-center py-5">Loading press releases...</div>
          ) : pressReleases.length > 0 ? (
            pressReleases.map((press, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4 press-item"
                key={press.post_id}
                ref={index === pressReleases.length - 1 ? lastItemRef : null}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={press.image}
                    className="card-img-top"
                    alt={press.title}
                    onError={(e) =>
                      (e.target.src = '/assets/img/press/default.jpg')
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{press.title}</h5>
                    {press.sub_topic && (
                      <p className="text-muted small">{press.sub_topic}</p>
                    )}
                    <Link
                      to={`/press-release/${press.post_id}`}
                      state={press}
                      className="btn-view-more"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">No press releases available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PressRelease;
