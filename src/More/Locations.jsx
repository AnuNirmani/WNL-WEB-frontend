// src/components/LocationsPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import useLocationsController from '../controllers/useLocationsController';
import '../more/Locations.css';

const Locations = () => {
  const { locations, loading, error } = useLocationsController();

  return (
    <div className="locations-page">
            <SEO
        title="Locations"
        description="Find the various office locations of Wijeya Newspapers across Sri Lanka."
        path="/locations"
      />
      <Header />
      <main id="main">
        <section className="inner-page">
          <div className="container">
            <div className="section-title">
              <h2>Locations</h2>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ marginBottom: '1rem' }}
              >
                {error}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && <p>Loading locations…</p>}

            {/* Locations Grid */}
            {!loading && !error && (
              <div className="row">
                {locations.map((location, index) => (
                  <div
                    key={location.id}
                    className="col-xl-4 col-md-6 d-flex align-items-stretch"
                    data-aos="zoom-in"
                    data-aos-delay={`${(index + 1) * 100}`}
                  >
                    <div className="icon-box contact-box">
                      <h4>{location.title}</h4>

                      {location.address.map((line, idx) => (
                        <p key={`addr-${idx}`}>{line}</p>
                      ))}
                      {location.contact.map((line, idx) => (
                        <p key={`contact-${idx}`}>{line}</p>
                      ))}
                      {location.fax.map((line, idx) => (
                        <p key={`fax-${idx}`}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
