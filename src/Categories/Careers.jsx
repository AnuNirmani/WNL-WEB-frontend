import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Careers.css';

const Careers = () => {
  const jobs = [
    {
      title: "Senior Journalist",
      description: "Join our editorial team and make an impact.",
      closingDate: "30 Aug 2025"
    },
    {
      title: "Graphic Designer", 
      description: "Create stunning visuals for our publications.",
      closingDate: "05 Sep 2025"
    },
    {
      title: "Digital Marketing Executive",
      description: "Boost our online presence and engagement.",
      closingDate: "10 Sep 2025"
    },
    {
      title: "HR Assistant",
      description: "Support our growing team with HR processes.",
      closingDate: "15 Sep 2025"
    }
  ];

  const additionalJobs = [
    {
      title: "Assistant Manager - Contracts - Group Legal and Regulatory",
      company: "Wijeyanewspapers PLC",
      location: "Colombo",
      closing: "31/08/2025"
    },
    {
      title: "Senior Legal Officer - Contracts - Group Legal and Regulatory", 
      company: "Wijeyanewspapers PLC",
      location: "Colombo",
      closing: "30/09/2025"
    },
    {
      title: "Data Engineer",
      company: "Wijeyanewspapers PLC", 
      location: "Colombo",
      closing: "31/10/2025"
    }
  ];

  return (
    <div className="careers-page">
      <Header />
      
      <main id="main">
        <section className="container" data-aos="fade-up">
          <br />
          <div className="section-title" data-aos="fade-up" data-aos-delay="100">
            <h2 className="mb-4">Current Job Openings</h2>
            {/* <p>Join our team and be part of Sri Lanka's leading media organization.</p> */}
          </div>
          
          {/* Table View */}
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
                {jobs.map((job, index) => (
                  <tr key={index} data-aos="fade-up" data-aos-delay={300 + (index * 100)}>
                    <td>{job.title}</td>
                    <td>{job.description}</td>
                    <td>{job.closingDate}</td>
                    <td>
                      <Link to={`/job/${index + 1}`} className="btn btn-danger btn-sm">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Additional Jobs */}
          {/* <div className="mt-5" data-aos="fade-up" data-aos-delay="700">
            <div className="section-title">
              <h3 className="mb-4">More Opportunities</h3>
              <p>Explore additional career opportunities across our organization.</p>
            </div>
            <div id="job-listings">
              {additionalJobs.map((job, index) => (
                <div 
                  key={index} 
                  className="job-card row align-items-center"
                  data-aos="zoom-in" 
                  data-aos-delay={800 + (index * 150)}
                >
                  <div className="col-md-6">
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">{job.company}</div>
                  </div>
                  <div className="col-md-3 job-meta">
                    <i className="fas fa-map-marker-alt"></i> {job.location} <br />
                    <i className="fas fa-calendar-alt"></i> Closing: {job.closing}
                  </div>
                  <div className="col-md-3 text-md-right mt-2 mt-md-0">
                    <a href="#" className="view-details mr-3">
                      <i className="fas fa-eye"></i> View Details
                    </a>
                    <button className="apply-btn">Apply for job</button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
