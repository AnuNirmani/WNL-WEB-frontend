<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import usePublicationsController from '../controllers/usePublicationsController'

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const { publications, loading, error, categories } = usePublicationsController()

  const handleFilterClick = (filter) => setActiveFilter(filter)

  const filteredPublications = activeFilter === 'all'
    ? publications
    : publications.filter(pub => pub.category === activeFilter)

  if (loading) return <div className="text-center py-5">Loading...</div>
  if (error) return <div className="text-center py-5 text-danger">{error}</div>
=======
// src/components/PublicationsPage.jsx
import React from 'react';
import usePublicationsController from '../controllers/usePublicationsController';
import '../components/Dashboard.css';

const Publications = () => {
  const {
    filteredPublications,
    activeFilter,
    handleFilterClick,
    loading,
    error,
  } = usePublicationsController();

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  const filters = ['all', 'weekly', 'daily', 'magazines'];
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5

  return (
    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        {/* Section Header */}
        <div className="section-title">
          <h2>Publications</h2>
          <p>
            Wijeya's publications meet Sri Lanka's cultural and linguistic
            diversity. Our English newspapers and publications include dailies
            such as the Daily Mirror and Financial Times and the weekend paper
            Sunday Times; magazines such as the society journal HI! and Lanka Woman.
          </p>
        </div>

<<<<<<< HEAD
        <ul id="portfolio-flters" className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
          <li
            className={activeFilter === 'all' ? 'filter-active' : ''}
            onClick={() => handleFilterClick('all')}
            style={{ cursor: 'pointer' }}
          >
            All
          </li>
          {categories.map(filter => (
=======
        {/* Filters */}
        <ul
          id="portfolio-flters"
          className="d-flex justify-content-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {filters.map((filter) => (
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
            <li
              key={filter}
              className={activeFilter === filter ? 'filter-active' : ''}
              onClick={() => handleFilterClick(filter)}
              style={{ cursor: 'pointer' }}
            >
              {filter}
            </li>
          ))}
        </ul>

        {/* Publications Grid */}
        <div
          className="row portfolio-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredPublications.map((pub) => (
            <div
              className="col-lg-3 col-md-6 portfolio-item"
              key={pub.id}
            >
              <div className="portfolio-img">
<<<<<<< HEAD
                {pub.cover_image && (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${pub.cover_image}`} 
                    className="img-fluid" 
                    alt={pub.name} 
                  />
                )}
              </div>
              <div className="portfolio-info">
                <h4>{pub.name}</h4>
                <p>{pub.category}</p>
                {pub.cover_image && (
                  <a 
                    href={`http://127.0.0.1:8000/storage/${pub.cover_image}`} 
                    data-gall="portfolioGallery" 
                    className="venobox preview-link" 
                    title={pub.name}
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                )}
                {pub.link && (
                  <a 
                    href={pub.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-link" 
                    title="More Details"
=======
                <img
                  src={`http://127.0.0.1:8000/${pub.image}`}
                  className="img-fluid"
                  alt={pub.title}
                  onError={(e) => (e.target.src = '/assets/img/placeholder.jpg')}
                />
              </div>
              <div className="portfolio-info">
                <h4>{pub.title}</h4>

                <a
                  href={`http://127.0.0.1:8000/${pub.image}`}
                  data-gall="portfolioGallery"
                  className="venobox preview-link"
                  title={pub.title}
                >
                  <i className="bx bx-plus"></i>
                </a>

                {pub.link && (
                  <a
                    href={pub.link}
                    className="details-link"
                    title="More Details"
                    target="_blank"
                    rel="noopener noreferrer"
>>>>>>> 3bf38029520358042b1159c55c28b9333ea714b5
                  >
                    <i className="bx bx-link"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
