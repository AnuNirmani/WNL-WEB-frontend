import React, { useEffect } from 'react'
import Header from './Header'
import Hero from './Hero'
import Publications from './Publications'
import PressRelease from './PressReleasedb'
import CallToAction from './CallToAction'
import Footer from './Footer'
import './Dashboard.css'

const Dashboard = () => {
  useEffect(() => {
    // Scroll to top button functionality
    const toggleBackToTop = () => {
      const backToTop = document.querySelector('.back-to-top')
      if (backToTop) {
        if (window.scrollY > 100) {
          backToTop.classList.add('active')
        } else {
          backToTop.classList.remove('active')
        }
      }
    }

    window.addEventListener('scroll', toggleBackToTop)
    toggleBackToTop()

    return () => {
      window.removeEventListener('scroll', toggleBackToTop)
    }
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="clearfix"></div>
      <main id="main">
        <Hero />
        <Publications />
        <PressRelease />
        <CallToAction />
      </main>
      <Footer />
      <a href="#" className="back-to-top" onClick={scrollToTop}>
        <i className="ri-arrow-up-line"></i>
      </a>
    </div>
  )
}

export default Dashboard

