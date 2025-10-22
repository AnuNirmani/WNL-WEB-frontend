import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AwardDetails.css";

const AwardDetails = () => {
  const { id } = useParams(); // get the award ID from URL
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const API_URL = `http://127.0.0.1:8000/api/posts/${id}`; // ✅ endpoint for a single post

  useEffect(() => {
    if (!id) {
      setError("No award ID provided");
      setLoading(false);
      return;
    }

    console.log("Fetching award details from:", API_URL);
    console.log("Award ID:", id);

    fetch(API_URL)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`Failed to fetch award details. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Award details received:", data);
        setAward(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching award:", err);
        setError(`Failed to load award details: ${err.message}`);
        setLoading(false);
      });
  }, [id, API_URL]);

  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? award.images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveIndex((prev) =>
      prev === award.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading Award Details...</p>
      </div>
    );
  }

  if (error || !award) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || "Award not found."}</p>
      </div>
    );
  }

  return (
    <div className="award-details-page">
      <Header />

      <div className="container award-details-container py-5">
        <br />

        {/* ✅ Title and Subtopic */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="award-title">{award.title}</h1>
          <p className="award-subtitle">
            {award.sub_topic ? `Awarded for: ${award.sub_topic}` : ""}
          </p>
        </div>

        {/* ✅ Description (with HTML rendering) */}
        <div
          className="award-content"
          data-aos="fade-up"
          data-aos-delay="100"
          dangerouslySetInnerHTML={{ __html: award.description }}
        ></div>

        {/* ✅ Image Section */}
        {award.image && (
          <div
            className="carousel slide mb-5"
            id="awardGallery"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={award.image}
                  className="d-block w-100 gallery-img"
                  alt={award.title}
                  onError={(e) =>
                    (e.target.src = "/assets/img/awards/dummy.jpg")
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* ✅ Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/awards" className="btn btn-danger px-4">
            ← Back to Awards
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AwardDetails;
