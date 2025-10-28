// src/components/AwardsPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAwardsController from '../controllers/useAwardsController';
import '../categories/Awards.css';

const AwardsPage = () => {
  const {
    filteredAwards,
    selectedYear,
    selectedDepartment,
    setSelectedYear,
    setSelectedDepartment,
    loading,
    error,
  } = useAwardsController();

  const years = [
    '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2006',
    '2007', '2008', '2009', '2010', '2015', '2017', '2018', '2019',
    '2020', '2021', '2022', '2023', '2024'
  ];

  const departments = [
    'Sunday Times', 'Daily Mirror', 'Sunday Lankadeepa', 'Daily Lankadeepa',
    'ADA', 'Hokandara Factory', 'Daily FT & Weekend FT'
  ];

  useEffect(() => {
    document.body.classList.add('awards-page-body');
    return () => document.body.classList.remove('awards-page-body');
  }, []);

  return (
    <div className="awards-page">
      <Header />

      {/* Banner */}
      <div className="container-fluid" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-sm-12 pl-0 pr-0">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
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

          {/* 🔹 Filters and Dropdowns */}
          <div className="row mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <select
                id="departmentFilter"
                className="form-control"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Filter by Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 🔹 Awards Grid (each AwardCard shown here) */}
          <div className="row" id="awardsGrid">
            {loading ? (
              <p>Loading awards...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : filteredAwards.length === 0 ? (
              <p>No Awards Found.</p>
            ) : (
              filteredAwards.map((award, index) => (
                <div
                  key={award.post_id}
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
                      <p className="card-text">
                        {/* <strong>Year:</strong>  */}
                        {award.sub_topic || '—'}
                      </p>
                      <Link to={`/award/${award.post_id}`} className="btn-view-more">
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AwardsPage;
