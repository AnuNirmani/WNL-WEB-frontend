// src/components/CareersPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useCareersController from '../controllers/useCareersController';
import '../categories/Careers.css';

const CareersPage = () => {
  const { careers, loading, error } = useCareersController();

  useEffect(() => {
    document.body.classList.add('careers-page-body');
    return () => document.body.classList.remove('careers-page-body');
  }, []);

  return (
    <div className="careers-page">
      <Header />

      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Careers</li>
          </ol>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="careers section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Current Job Openings</h2>
            <p>Join our team and be part of Sri Lanka's leading media organization.</p>
          </div>

          {/* Careers Table */}
          <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Job Title</th>
                  <th>Description</th>
                  <th>Closing Date</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">Loading careers...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-danger text-center">{error}</td>
                  </tr>
                ) : careers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No career openings available.</td>
                  </tr>
                ) : (
                  careers.map((career, index) => (
                    <tr key={career.post_id || index} data-aos="fade-up" data-aos-delay={300 + (index * 100)}>
                      <td>{career.title || '—'}</td>
                      <td>{career.sub_topic || '—'}</td>
                      <td>{career.end_date || '—'}</td>
                      <td>
                        <Link to={`/job/${career.post_id || index + 1}`} className="btn btn-danger btn-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
