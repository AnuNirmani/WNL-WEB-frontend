import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../utils/SEO';
import './AdvertiseWithUs.css'

const AdvertiseWithUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Use the Node.js backend server with SMTP
      const apiUrl = 'http://localhost:3001/api/advertise'
      console.log('Submitting advertise form to:', apiUrl)
      
      const jsonData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log('Response:', result)

      if (result.success) {
        setSubmitStatus('success')
        setSubmittedEmail(formData.email) // Save email before clearing form
        setShowThankYouModal(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      alert('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowThankYouModal(false)
  }

  return (
    <div>
          <SEO
        title="Advertise With Us"
        path="/advertise-with-us"
      />
      <Header />
<<<<<<< HEAD

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="thank-you-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Thank You for Your Interest!</h2>
            <p className="modal-message">
              We have received your advertising inquiry and appreciate your interest in partnering with us.
            </p>
            <p className="modal-submessage">
              Our advertising team will review your inquiry and get back to you as soon as possible, 
              typically within 1-2 business days.
            </p>
            <div className="modal-footer">
              <p>
                <i className="fas fa-envelope"></i> A confirmation email has been sent to <strong>{submittedEmail}</strong>
              </p>
            </div>
            <button className="modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Advertise With Us</li>
          </ol>
        </div>
      </section>
=======
>>>>>>> e09af9f49d8be6040c0366e9d05517377b750f82

      {/* Main Content */}
      <section className="inner-page">
        <div className="container">
          <div className="section-title">
            <h2>Advertise With Us</h2>
          </div>
          <div className="row">
            
            {/* Left Column: Contact Details */}
            <div className="col-lg-6 mb-4 advertise-item">
              <div className="p-4 border rounded shadow-sm">
                <h4 className="mb-3">Web Advertising</h4>
                <p><strong>Phone (Dilan):</strong> +94 77 372 7288<br/>
                   <strong>Email:</strong> <a href="mailto:dilanj@wnl.lk">dilanj@wnl.lk</a>
                </p>
                <p><strong>Phone (Dushyanth):</strong> +94 77 912 5988<br/>
                   <strong>Email:</strong> <a href="mailto:dushyantha@wijeyadigital.lk">dushyantha@wijeyadigital.lk</a>
                </p>
                <p><strong>Phone (Sanjaya):</strong> +94 76 685 3168<br/>
                   <strong>Email:</strong> <a href="mailto:sanjaya@wijeyadigital.lk">sanjaya@wijeyadigital.lk</a>
                </p>
                
                <h4 className="mt-4 mb-3">Print Advertising</h4>
                <p><strong>Phone (Indika):</strong> +94 77 385 0781<br/>
                   <strong>Email:</strong> <a href="mailto:indikaj@wijeya.lk">indikaj@wijeya.lk</a>
                </p>
              </div>
            </div>
            
            {/* Right Column: Contact Form */}
            <div className="col-lg-6 mb-4 advertise-item">
              <div className="p-4 border rounded shadow-sm">
                <h4 className="mb-3">Send Us a Message</h4>
                <form onSubmit={handleSubmit} className="php-email-form">
                  <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    {isSubmitting && <div className="loading">Sending...</div>}
                    {submitStatus === 'error' && (
                      <div className="error-message">Error sending message. Please try again.</div>
                    )}
                    {submitStatus === 'success' && (
                      <div className="sent-message">Your message has been sent. Thank you!</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdvertiseWithUs
