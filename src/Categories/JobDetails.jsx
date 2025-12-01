import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/careers/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        // Fix relative image URLs inside description
        if (data.description) {
          data.description = data.description.replace(
            /src=["'](\/storage[^"']+)["']/g,
            `src="http://127.0.0.1:8000$1"`
          );
        }

        setJobData(data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobData?.title,
        text: `Check out this job opportunity at Wijeya Newspapers PLC`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleApply = () => {
    const email = 'careers@wijeya.lk'; // Replace with actual HR email
    const subject = `Application for ${jobData?.title || 'Job Position'}`;
    const body = `Dear Hiring Team,`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || 'Job not found.'}</p>
        <Link to="/careers" className="btn btn-secondary mt-3">
          <i className="fas fa-arrow-left"></i> Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-page">
            <SEO
        title="Job Details"
        path="/jobs/details"
      />
      <Header />

      <main id="main">
        <div className="container">
          {/* Job Header */}
          <div className="job-header">
            <div className="job-title">
              {jobData.title}
            </div>
            <div className="company-name">Wijeya Newspapers PLC</div>

            <div className="job-meta">
              {jobData.sub_topic && (
                <span>
                  <i></i> {jobData.sub_topic}
                </span>
              )}
              {jobData.end_date && (
                <span>
                  <i className="fas fa-calendar-alt"></i> Closing Date: {jobData.end_date}
                </span>
              )}
              <span>
                <i
                  className="fas fa-share-alt share-icon"
                  onClick={handleShare}
                  style={{ cursor: 'pointer' }}
                ></i>{' '}
                Share
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="job-description">
            <div
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>

            <button className="btn-apply" onClick={handleApply}>
              Send Your CV To Us
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
