import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();

  // Sample job data - in a real app, this would come from an API or props
  const jobData = {
    id: id || '1',
    title: "Assistant Manager - Contracts - Group Legal and Regulatory",
    company: "Wijeya Newspapers PLC",
    location: "Colombo",
    closingDate: "31/08/2025",
    // vacancyCount: "01",
    description: "We are seeking an experienced Assistant Manager to join our Group Legal and Regulatory team. The selected candidate will be responsible for managing contract negotiations, compliance matters, and providing legal support for various business operations.",
    keyResponsibilities: [
      "Draft, review, and negotiate contracts and agreements.",
      "Provide legal advice on corporate, regulatory, and compliance issues.",
      "Coordinate with internal departments to ensure legal compliance.",
      "Assist in resolving disputes and managing litigation matters."
    ],
    requirements: [
      "Bachelor's degree in Law or related field (LLB/Attorney-at-Law preferred).",
      "Minimum 5 years' experience in corporate legal work.",
      "Strong understanding of Sri Lankan regulatory frameworks.",
      "Excellent communication and negotiation skills."
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobData.title,
        text: `Check out this job opportunity at ${jobData.company}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleApply = () => {
    // In a real app, this would redirect to an application form or external link
    alert('Application functionality would be implemented here');
  };

  return (
    <div className="job-details-page">
      <Header />
      
      <main id="main">
        <div className="container">
          {/* Job Header */}
          <div className="job-header">
            <div className="job-title">
              {jobData.title}
              <span className="vacancy-badge" style={{background: '#a57c1b'}}>
                {jobData.vacancyCount}
              </span>
            </div>
            <div className="company-name">{jobData.company}</div>

            <div className="job-meta">
              <span>
                <i className="fas fa-map-marker-alt"></i> {jobData.location}
              </span>
              <span>
                <i className="fas fa-calendar-alt"></i> Closing Date: {jobData.closingDate}
              </span>
              <span>
                <i className="fas fa-share-alt share-icon" onClick={handleShare}></i> Share
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="job-description">
            <h4>Job Description</h4>
            <p>{jobData.description}</p>

            <h4>Key Responsibilities</h4>
            <ul>
              {jobData.keyResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>

            <h4>Requirements</h4>
            <ul>
              {jobData.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>

            <button className="btn-apply" onClick={handleApply}>
              Apply for this position
            </button>
          </div>

          <div className="back-link">
            <Link to="/careers" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Careers
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
