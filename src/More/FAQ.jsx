import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../utils/SEO';
import './FAQ.css'

const FAQ = () => {
  const [openAccordion, setOpenAccordion] = useState(0)

  const faqData = [
    {
      id: 1,
      question: "What is Wijeya Newspapers Ltd.?",
      answer: "Wijeya Newspapers Ltd. (WNL) is one of Sri Lanka's leading media organizations, publishing newspapers, magazines, and operating digital media platforms across multiple languages."
    },
    {
      id: 2,
      question: "Which newspapers are part of WNL?",
      answer: "Our publications include the Daily Mirror, Sunday Times, Lankadeepa, Ada, Deshaya, Tamil Mirror, Daily FT, and several magazines and online portals."
    },
    {
      id: 3,
      question: "How can I submit a press release or news tip?",
      answer: "You can email your press releases or news tips to editor@wijeyanewspapers.lk. Please include your contact information for verification."
    },
    {
      id: 4,
      question: "How do I advertise with WNL?",
      answer: "Visit our Advertise With Us page for details, or contact our advertising team at 0112 479 479 for packages across print and digital platforms."
    },
    {
      id: 5,
      question: "Where can I find job opportunities at WNL?",
      answer: "All vacancies are listed on our Careers page. You can apply online or send your resume to our HR department."
    }
  ]

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index)
  }

  return (
    <div className="faq-page">
      <SEO
        title="FAQ"
        path="/faq"
      />
      <Header />
      
      <main id="main">

        {/* FAQ Section */}
        <section id="faq" className="faq section-bg py-5">
          <div className="container">
            <div className="section-title">
              <h2>FAQ</h2>
              <p>Find answers to the most common questions about Wijeya Newspapers Ltd.</p>
            </div>

            <div className="accordion" id="faqAccordion">
              {faqData.map((faq, index) => (
                <div className="card" key={faq.id}>
                  <div className="card-header" id={`heading${faq.id}`}>
                    <h2 className="mb-0">
                      <button 
                        className={`btn btn-link btn-block text-left ${openAccordion === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={openAccordion === index}
                        aria-controls={`faq${faq.id}`}
                      >
                        {faq.question}
                        <i className={`fas fa-chevron-${openAccordion === index ? 'up' : 'down'} ms-auto`}></i>
                      </button>
                    </h2>
                  </div>
                  <div 
                    id={`faq${faq.id}`} 
                    className={`collapse ${openAccordion === index ? 'show' : ''}`}
                    aria-labelledby={`heading${faq.id}`}
                    data-parent="#faqAccordion"
                  >
                    <div className="card-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FAQ
