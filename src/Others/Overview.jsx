import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Overview.css'

const Overview = () => {
  const location = useLocation()
  const newsItem = location.state || {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    title: 'News Headline',
    date: 'October 2025'
  }

  return (
    <>
      <Header />
      
      <main id="main">
        {/* Breadcrumbs */}
        <section className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li>News Overview</li>
            </ol>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="overview">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <article className="news-article">
                  {/* Article Header */}
                  <div className="article-header">
                    <span className="article-date">{newsItem.date}</span>
                    <h1 className="article-title">{newsItem.title}</h1>
                  </div>

                  {/* Featured Image */}
                  <div className="article-image">
                    <img 
                      src={newsItem.image} 
                      alt={newsItem.title} 
                      className="img-fluid"
                    />
                  </div>

                  {/* Article Content */}
                  <div className="article-content">
                    <p className="lead">
                      This is a comprehensive overview of the latest news and developments. 
                      Our team has been working diligently to bring you the most accurate 
                      and up-to-date information.
                    </p>

                    <h3>Introduction</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                  </div>

                  {/* Article Footer */}
                  <div className="article-footer">
                    {/* <div className="article-tags">
                      <span className="tag">News</span>
                      <span className="tag">Updates</span>
                      <span className="tag">Industry</span>
                    </div> */}
                    <div className="article-share">
                      <span>Share:</span>
                      <a href="#" className="share-btn" title="Share on Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="share-btn" title="Share on Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="share-btn" title="Share on LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Overview

