// src/pages/Papers.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../utils/SEO';
import PublicationsPage from '../components/Publications'; // ✅ import new MVC-based Publications
import '../others/Papers.css';
import '../components/Dashboard.css';

const Papers = () => {
  return (
    <div>
      <SEO
        title="Papers"
        path="/papers"
      />
      <Header />

      <main className="papers-page">
        {/* Breadcrumbs */}
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li>Advertise With Us</li>
            </ol>
          </div>
        </section>

        {/* ✅ Publications section */}
        <PublicationsPage />
      </main>

      <Footer />
    </div>
  );
};

export default Papers;
