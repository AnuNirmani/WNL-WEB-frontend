import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useCallback } from 'react';
import '../categories/AwardDetails.css'; // reuse the same CSS (optional)

const Overview = () => {
  const location = useLocation();
  const newsItem = location.state;
  const id = newsItem?.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post details
  const fetchPost = useCallback(async () => {
    if (!id) {
      setError('No post ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      // Fix relative image paths inside the description
      if (data.description) {
        data.description = data.description.replace(
          /src=["'](\/storage[^"']+)["']/g,
          `src="http://127.0.0.1:8000$1"`
        );
      }

      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(`Failed to load post details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading post details...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error || 'No post found.'}</p>
      </div>
    );
  }

  return (
    <div className="award-details-page">
      <Header />

      <div className="container award-details-container py-5">
        <br />

        {/* Title & Subtitle */}
        <div className="text-center mb-4" data-aos="fade-up">
          <h1 className="award-title">{post.title}</h1>
          {post.sub_topic && (
            <p className="award-subtitle">
              {post.category_name === 'Awards'
                ? `Awarded for: ${post.sub_topic}`
                : post.sub_topic}
            </p>
          )}
        </div>

        {/* Description */}
        <div
          className="award-content"
          data-aos="fade-up"
          data-aos-delay="100"
          dangerouslySetInnerHTML={{ __html: post.description }}
        ></div>

        {/* Featured Image (or carousel) */}
        {post.image && (
          <div
            // className="carousel slide mb-5"
            // id="overviewGallery"
            // data-aos="fade-up"
            // data-aos-delay="200"
          >
            {/* <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={post.image}
                  className="d-block w-100 gallery-img"
                  alt={post.title}
                  onError={(e) =>
                    (e.target.src = '/assets/img/awards/dummy.jpg')
                  }
                />
              </div>
            </div> */}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link to="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Overview;
