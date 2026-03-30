// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeroController from '../controllers/useHeroController';
import '../components/Dashboard.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const { newsItems, loading, error } = useHeroController();
  const carouselRef = useRef(null);
  const carouselItems =
    newsItems.length > 0 && newsItems.length <= 3
      ? [...newsItems, ...newsItems, ...newsItems]
      : newsItems;

  const getSlideStep = (track) => {
    const firstSlide = track?.querySelector('.hero-carousel-slide');
    if (!firstSlide) {
      return Math.max(track.clientWidth * 0.8, 300);
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const handleViewMore = (item) => {
    navigate('/overview', { state: item });
  };

  const scrollToNext = () => {
    if (!carouselRef.current) return;

    const track = carouselRef.current;
    const scrollAmount = getSlideStep(track);
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const currentLeft = track.scrollLeft;

    if (maxScrollLeft <= 0) return;

    if (currentLeft >= maxScrollLeft - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    const nextLeft = Math.min(currentLeft + scrollAmount, maxScrollLeft);
    track.scrollTo({ left: nextLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    if (loading || error || carouselItems.length === 0) return undefined;

    const intervalId = window.setInterval(() => {
      scrollToNext();
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [loading, error, carouselItems.length]);

  return (
    <section id="intro-sec">
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          {/* Loading State */}
          {loading && (
            <div className="col-12 text-center py-5">
              <p>Loading latest posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="col-12 text-center py-5 text-danger">
              <p>{error}</p>
            </div>
          )}

          {/* No Data */}
          {!loading && !error && newsItems.length === 0 && (
            <div className="col-12 text-center py-5">
              <p>No recent posts found.</p>
            </div>
          )}

          {/* News Items Carousel */}
          {!loading && !error && newsItems.length > 0 && (
            <div className="col-12">
              <div className="hero-carousel-wrapper">
                <div className="hero-carousel-track" ref={carouselRef}>
                  {carouselItems.map((item, index) => (
                    <article className="hero-carousel-slide" key={`${item.id}-${index}`}>
                      <div className="card news-card shadow-sm border-0 h-100">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="card-img-top"
                            style={{
                              height: '250px',
                              objectFit: 'cover',
                              borderTopLeftRadius: '0.5rem',
                              borderTopRightRadius: '0.5rem',
                            }}
                          />
                        )}
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{item.title}</h5>
                          {item.sub_topic && <span className="date pb-2">{item.sub_topic}</span>}
                          <button
                            onClick={() => handleViewMore(item)}
                            className="btn btn-view mt-3 align-self-start"
                          >
                            View More
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
