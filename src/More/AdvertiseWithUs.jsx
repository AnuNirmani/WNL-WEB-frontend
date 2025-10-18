import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './AdvertiseWithUs.css'

const AdvertiseWithUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <>
      <Header />
      
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><a href="/">Home</a></li>
            <li>Advertise With Us</li>
          </ol>
        </div>
      </section>

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
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" className="form-control" id="subject" name="subject" required />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AdvertiseWithUs
