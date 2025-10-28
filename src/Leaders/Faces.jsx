import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Faces.css';

const Faces = () => {
  const [faces, setFaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/employees')
      .then(res => res.json())
      .then(data => {
        // Filter only active Faces employees
        const facesData = data.filter(emp =>
          (emp.position?.toLowerCase().includes('faces') ||
           emp.department?.toLowerCase().includes('faces')) &&
          emp.status?.toLowerCase() === 'active'
        );
        setFaces(facesData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredFaces = useMemo(() => {
    return faces.filter(face => {
      const matchesName = face.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDepartment === '' || face.department?.toLowerCase() === selectedDepartment.toLowerCase();
      return matchesName && matchesDept;
    });
  }, [faces, searchTerm, selectedDepartment]);

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
                {/* Dynamically populate departments */}
                {Array.from(new Set(faces.map(f => f.department))).map((dept, idx) => (
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
                  <img src={face.photo || 'https://placehold.co/200x200'} alt={face.name} />
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

export default Faces;
