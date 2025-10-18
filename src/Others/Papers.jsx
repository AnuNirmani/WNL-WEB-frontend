import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Publications from '../components/Publications'
import './Papers.css'
import '../components/Dashboard.css'

const Papers = () => {
  return (
    <div>
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

        <Publications />
      </main>
      <Footer />
    </div>
  )
}

export default Papers

