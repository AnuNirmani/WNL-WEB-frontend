import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Faces.css';

const Faces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const faces = [
    {
      id: 1,
      name: "Amal Perera",
      position: "Senior Journalist",
      department: "Political Desk",
      image: "https://placehold.co/200"
    },
    {
      id: 2,
      name: "Nadeesha Fernando",
      position: "Photojournalist",
      department: "Events & Features",
      image: "https://placehold.co/200"
    },
    {
      id: 3,
      name: "Ruwan Jayasinghe",
      position: "Editor",
      department: "Business News",
      image: "https://placehold.co/200"
    },
    {
      id: 4,
      name: "Shalika Dias",
      position: "Reporter",
      department: "Sports Desk",
      image: "https://placehold.co/200"
    },
    {
      id: 5,
      name: "Manori Wickramasinghe",
      position: "Columnist",
      department: "Lifestyle & Culture",
      image: "https://placehold.co/200"
    },
    {
      id: 6,
      name: "Tharindu Senanayake",
      position: "Digital Media Executive",
      department: "Online News",
      image: "https://placehold.co/200"
    },
    {
      id: 7,
      name: "Sachini Ranasinghe",
      position: "News Anchor",
      department: "TV Division",
      image: "https://placehold.co/200"
    },
    {
      id: 8,
      name: "Damith Hettiarachchi",
      position: "Cameraman",
      department: "Broadcasting",
      image: "https://placehold.co/200"
    },
    {
      id: 9,
      name: "Ishara de Silva",
      position: "Features Writer",
      department: "Travel & Tourism",
      image: "https://placehold.co/200"
    },
    {
      id: 10,
      name: "Kavindu Dissanayake",
      position: "Graphics Designer",
      department: "Creative Team",
      image: "https://placehold.co/200"
    },
    {
      id: 11,
      name: "Chathuri Perera",
      position: "Copy Editor",
      department: "English Publications",
      image: "https://placehold.co/200"
    },
    {
      id: 12,
      name: "Roshan Samarasinghe",
      position: "Print Production Manager",
      department: "Press Operations",
      image: "https://placehold.co/200"
    },
    {
      id: 13,
      name: "Dilani Abeywardena",
      position: "Sub-Editor",
      department: "Sunday Magazine",
      image: "https://placehold.co/200"
    },
    {
      id: 14,
      name: "Harsha Gunawardena",
      position: "Photographer",
      department: "Nature & Wildlife",
      image: "https://placehold.co/200"
    },
    {
      id: 15,
      name: "Piumi Wijesinghe",
      position: "Social Media Strategist",
      department: "Digital Outreach",
      image: "https://placehold.co/200"
    },
    {
      id: 16,
      name: "Ravindu Kulatunga",
      position: "Investigative Reporter",
      department: "Special Reports",
      image: "https://placehold.co/200"
    },
    {
      id: 17,
      name: "Shamila Bandara",
      position: "Content Creator",
      department: "Video Stories",
      image: "https://placehold.co/200"
    },
    {
      id: 18,
      name: "Lakshan Weerasinghe",
      position: "Page Layout Artist",
      department: "Design & Publishing",
      image: "https://placehold.co/200"
    },
    {
      id: 19,
      name: "Janani Alahakoon",
      position: "Research Analyst",
      department: "Data & Insights",
      image: "https://placehold.co/200"
    },
    {
      id: 20,
      name: "Dinusha Perera",
      position: "Event Coordinator",
      department: "Corporate Affairs",
      image: "https://placehold.co/200"
    }
  ];

  const departments = [
    "Ada Editorial",
    "Administration II",
    "Advertising Department",
    "Chairman's/Director's Staff",
    "Circulation Department",
    "Commercial Printing Unit",
    "COO Staff",
    "Corporate & Legal Department",
    "Daily Lankadeepa",
    "Daily Mirror",
    "Political Desk",
    "Events & Features",
    "Business News",
    "Sports Desk",
    "Lifestyle & Culture",
    "Online News",
    "TV Division",
    "Broadcasting",
    "Travel & Tourism",
    "Creative Team",
    "English Publications",
    "Press Operations",
    "Sunday Magazine",
    "Nature & Wildlife",
    "Digital Outreach",
    "Special Reports",
    "Video Stories",
    "Design & Publishing",
    "Data & Insights",
    "Corporate Affairs"
  ];

  const filteredFaces = useMemo(() => {
    return faces.filter(face => {
      const matchesName = face.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === '' || 
        face.department.toLowerCase().includes(selectedDepartment.toLowerCase());
      
      return matchesName && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment]);

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

      {/* Our Faces Section */}
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
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Faces Grid */}
          <div className="row">
            {filteredFaces.map((face, index) => (
              <div 
                key={face.id} 
                className="col-lg-2 col-md-4 col-sm-6 col-12 mb-4"
                data-aos="zoom-in" 
                data-aos-delay={index < 6 ? (index + 1) * 100 : 300}
              >
                <div className="face-card">
                  <img src={face.image} alt={face.name} />
                  <h3>{face.name}</h3>
                  <p>{face.position} – {face.department}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredFaces.length === 0 && (
            <div className="no-results" data-aos="fade-up">
              <p>No faces found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faces;
