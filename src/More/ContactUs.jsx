import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../utils/SEO';
import './ContactUs.css'

const ContactUs = () => {
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
    e.preventDefault() // Prevent default form submission
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Use the Node.js backend server with SMTP
      const apiUrl = 'http://localhost:3001/api/contact'
      console.log('Submitting to:', apiUrl)
      
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
    <div className="contact-us-page">
            <SEO
        title="Contact Us"
        path="/contact-us"
      />
      <Header />

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
            <h2>Thank You for Contacting Us!</h2>
            <p className="modal-message">
              We have received your message and appreciate you reaching out to us.
            </p>
            <p className="modal-submessage">
              Our team will review your inquiry and get back to you as soon as possible, 
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

      <main id="main">

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Contact US</h2>
              <p>We Innovate and lead, Newspapers, Magazines and Digital Publishing with Powerful Advertising Solutions</p>
            </div>

            <div className="row">
              {/* Contact Information and Map */}
              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">

                  <div className="address">
                    <i className="fas fa-map-marker-alt"></i>
                    <h4>Location:</h4>
                    <p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Wijeyanewspapers+Head+Office,+No.+8,+Hunupitiya+Cross+Road,+Colombo+02"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', cursor: 'pointer' }}
                      >
                        Wijeyanewspapers Head Office, No. 8, Hunupitiya Cross Road, Colombo 02.
                      </a>
                    </p>
                  </div>

                  <div className="email">
                    <i className="fas fa-envelope"></i>
                    <h4>Email:</h4>
                    <p>
                      <a href="mailto:wnlgen@wijeya.lk" style={{ color: 'inherit' }}>
                        wnlgen@wijeya.lk
                      </a>
                    </p>
                  </div>

                  <div className="phone">
                    <i className="fas fa-phone"></i>
                    <h4>Call:</h4>
                    <p><a href="tel:0112479479">011 247 9479</a></p>
                  </div>

                  <div className="phone">
                    <i className="fas fa-phone"></i>
                    <h4>Fax:</h4>
                    <p><a href="tel:0112448323">011 244 8323</a></p>
                  </div>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7993540799444!2d79.85580295104413!3d6.9145770203854315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596c00ece979%3A0x53a3556932f7759d!2sWijeya%20Newspapers%20Head%20Office!5e0!3m2!1sen!2slk!4v1596169079307!5m2!1sen!2slk"
                    width="100%"
                    height="290px"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Wijeya Newspapers Head Office Location"
                  ></iframe>

                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <form 
                  onSubmit={handleSubmit} 
                  className="php-email-form"
                  noValidate
                >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Your Email</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      className="form-control"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      className="form-control"
                      name="message"
                      id="message"
                      rows="10"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message here..."
                      required
                      disabled={isSubmitting}
                      style={{ 
                        width: '100%',
                        minHeight: '120px',
                        resize: 'vertical'
                      }}
                    />
                    <div className="validate"></div>
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

                  <div className="text-center">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://www.linkedin.com/company/wijeya-newspapers-ltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-linkedin mt-3"
                    >
                      <i className="fab fa-linkedin-in"></i> Follow us on LinkedIn
                    </a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactUs
