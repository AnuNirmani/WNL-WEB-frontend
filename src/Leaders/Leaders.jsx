import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Leaders.css';

const Leaders = () => {
  const leaders = [
    {
      id: 1,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 2,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 3,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 4,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 5,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 6,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 7,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 8,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    },
    {
      id: 9,
      name: "Leader Name",
      position: "Position Title",
      bio: "Short bio or description of the leader's role and vision.",
      image: "https://placehold.co/400x400"
    }
  ];

  return (
    <div className="leaders-page">
      <Header />
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Leadership</li>
          </ol>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="our-leaders" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>OUR LEADERS</h2>
            <p>Meet the people guiding Wijeya Newspapers towards a brighter future.</p>
          </div>

          <div className="row">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in" 
                data-aos-delay={index < 3 ? (index + 1) * 100 : 300}
                style={index >= 3 ? { marginTop: '1.5rem' } : {}}
              >
                <div className="member">
                  <img src={leader.image} className="img-fluid" alt={leader.name} />
                  <div className="member-content">
                    <h4>{leader.name}</h4>
                    <span>{leader.position}</span>
                    <p>{leader.bio}</p>
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

export default Leaders;