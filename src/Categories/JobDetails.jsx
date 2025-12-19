import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import './JobDetails.css';
import { authFetch } from '../api/client';

const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await authFetch(`/careers/${id}`);

        // Fix relative image URLs inside description
        if (data.description) {
          const publicBase = `${window.location.origin}/WNL-Web/public`;
          data.description = data.description.replace(
            /src=["'](\/storage[^"']+)["']/g,
            `src="${publicBase}$1"`
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
        title={jobData.title || 'Job Details'}
        path={`/job/${id}`}
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
              {jobData.sub_category_type && (
                <span>
                  <i></i> Vacansies at: {jobData.sub_category_type}
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

            <center><button className="btn-apply" onClick={handleApply}>
              Send Your CV To Us
            </button>
            </center>
          </div>

          <center><div className="back-link">
            <Link to="/careers" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Careers
            </Link>
          </div>
          </center>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
