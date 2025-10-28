// src/components/FacesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFacesController from '../controllers/useFacesController';
import '../leaders/Faces.css';

const FacesPage = () => {
  const {
    filteredFaces,
    departments,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    loading,
    error,
  } = useFacesController();

  return (
    <div className="faces-page">
      <Header />

      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Faces</li>
          </ol>
        </div>
      </section>

      {/* Faces Section */}
      <section id="our-faces" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>OUR FACES</h2>
            <p>Meet the talented individuals who make Wijeya Newspapers a trusted source of news and information.</p>
          </div>

          {/* Search and Filter */}
          <div className="row mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="col-md-6">
              <input 
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select 
                className="form-control"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Filter by Department</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Faces Grid */}
          {loading && <p>Loading faces...</p>}
          {error && <p className="text-danger">Error loading faces.</p>}

          <div className="row">
            {!loading && !error && filteredFaces.map((face, index) => (
              <div 
                key={face.id} 
                className="col-lg-2 col-md-4 col-sm-6 col-12 mb-4"
                data-aos="zoom-in"
                data-aos-delay={index < 6 ? (index + 1) * 100 : 300}
              >
                <div className="face-card">
                  <img 
                    src={face.photo || 'https://placehold.co/200x200'} 
                    alt={face.name || 'Employee'} 
                    onError={(e) => e.target.src = 'https://placehold.co/200x200'}
                  />
                  <h3>{face.name}</h3>
                  <p>{face.position} – {face.department}</p>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredFaces.length === 0 && (
            <div className="no-results" data-aos="fade-up">
              <p>No faces found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FacesPage;
