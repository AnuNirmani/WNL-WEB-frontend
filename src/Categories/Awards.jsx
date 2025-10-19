import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Awards.css';

const Awards = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const awardsData = [
    {
      id: 1,
      year: '1998',
      department: 'Sunday Times',
      title: 'Editors Guild Awards',
      description: 'Journalist of the Year: Iqbal Athas',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      year: '1999',
      department: 'Sunday Times',
      title: 'Editors Guild Awards',
      description: 'Photographer of the Year: Gemunu Wellage',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      year: '2000',
      department: 'Sunday Times',
      title: 'Editors Guild Awards',
      description: 'Best Foreign Report: Thalif Deen',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      year: '2007',
      department: 'Daily Mirror',
      title: 'Superbrand Status',
      description: 'Received Superbrand Status for Financial Times',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      year: '2008',
      department: 'Daily Mirror',
      title: 'Mass Media Award',
      description: 'Best English Newspaper in Sri Lanka',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      year: '2008',
      department: 'Sunday Lankadeepa',
      title: 'Editors Guild',
      description: 'Best Journalist on Social Issues: Ms. Asuntha Edirisuriya',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 7,
      year: '2017',
      department: 'ADA',
      title: 'Editors Guild',
      description: 'Best Sports Journalist: Pathum Wijerathne',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 8,
      year: '2009',
      department: 'Hokandara Factory',
      title: 'National Cleaner Production Awards',
      description: 'Silver Award for excellence in cleaner production practices',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    },
    {
      id: 9,
      year: '2009',
      department: 'Daily FT & Weekend FT',
      title: 'Editors Guild',
      description: 'Business Journalist of the Year: Miss. Cheranka Mendis',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    }
  ];

  const years = ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2006', '2007', '2008', '2009', '2010', '2015', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  const departments = ['Sunday Times', 'Daily Mirror', 'Sunday Lankadeepa', 'Daily Lankadeepa', 'ADA', 'Hokandara Factory', 'Daily FT & Weekend FT'];

  const filteredAwards = awardsData.filter(award => {
    const yearMatch = !selectedYear || award.year === selectedYear;
    const departmentMatch = !selectedDepartment || award.department === selectedDepartment;
    return yearMatch && departmentMatch;
  });

  const handleAwardClick = (awardId) => {
    // Navigate to award details page
    window.location.href = `/award/${awardId}`;
  };

  return (
    <div className="awards-page">
      <Header />
      
      {/* Breadcrumbs */}
      <section className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Awards</li>
          </ol>
        </div>
      </section>

      {/* Awards Banner Image */}
      {/* <div className="container py-5" data-aos="fade-up"> */}
      <div className="container-fluid">
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
      {/* </div> */}

      {/* Awards Section */}
      <section id="awards" className="awards section-bg py-5">
        <div className="container py-5" data-aos="fade-up">
          <div className="section-title" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-center mb-4">Awards</h2>
            <p className="text-center mb-4">Recognizing excellence in journalism and media innovation.</p>
          </div>

          {/* Filters */}
          <div className="row mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-md-6">
              <select 
                id="yearFilter" 
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Filter by Year</option>
                {years.map(year => (
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
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Awards Grid */}
          <div className="row" id="awardsGrid">
            {filteredAwards.map((award, index) => (
              <div 
                key={award.id}
                className="col-lg-4 col-md-6 mb-4 award-card" 
                data-year={award.year} 
                data-department={award.department} 
                onClick={() => handleAwardClick(award.id)}
                data-aos="zoom-in" 
                data-aos-delay={index < 3 ? (index + 1) * 100 : 300}
                style={index >= 3 ? { marginTop: '1.5rem' } : {}}
              >
                <div className="card h-100 shadow-sm">
                  {award.image && (
                    <img src={award.image} className="card-img-top" alt={`Award ${award.year}`} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{award.title}</h5>
                    <p className="card-text">
                      <strong>Year:</strong> {award.year} — {award.description}
                    </p>
                    <Link to={`/award/${award.id}`} className="btn-view-more">View More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Awards;
