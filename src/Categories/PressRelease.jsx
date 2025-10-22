import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './PressRelease.css'

const PressRelease = () => {
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedPaper, setSelectedPaper] = useState('')

  const pressReleases = [
    {
      id: 1,
      title: "Dailymirror announces new editorial team",
      date: "10 Jan 2025",
      paper: "Dailymirror",
      year: "2025",
      description: "Dailymirror introduces its new editorial board, aiming to expand investigative reporting and digital reach...",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Lankadeepa celebrates 30 years of excellence",
      date: "20 Dec 2024",
      paper: "Lankadeepa",
      year: "2024",
      description: "Marking three decades of impactful journalism, Lankadeepa held an anniversary event recognizing its dedicated staff...",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Sundaytimes launches youth journalism program",
      date: "05 Nov 2024",
      paper: "Sundaytimes",
      year: "2024",
      description: "A new initiative to train aspiring journalists under senior reporters of Sundaytimes has been officially launched...",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
    }
  ]

  const years = ['2025', '2024', '2023', '2022']
  const papers = ['Lankadeepa', 'Dailymirror', 'Sundaytimes', 'Ada']

  const filteredPressReleases = pressReleases.filter(release => {
    const matchYear = !selectedYear || release.year === selectedYear
    const matchPaper = !selectedPaper || release.paper === selectedPaper
    return matchYear && matchPaper
  })

  return (
    <div className="press-release-page">
      <Header />
      
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Press Release</li>
          </ol>
        </div>
      </section>

      {/* Press Release Section */}
      <section id="press-release" className="press-release section-bg py-5">
        <div className="container">
          <div className="section-title">
            <h2>Press Release</h2>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-4 mb-2">
              <select 
                id="yearFilter" 
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Filter by Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-2">
              <select 
                id="paperFilter" 
                className="form-control"
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
              >
                <option value="">Filter by Paper</option>
                {papers.map(paper => (
                  <option key={paper} value={paper}>{paper}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Press Release Grid */}
          <div className="row" id="pressList">
            {filteredPressReleases.map((release) => (
              <div key={release.id} className="col-lg-4 col-md-6 mb-4 press-item">
                <div className="card h-100 shadow-sm">
                  <img 
                    src={release.image} 
                    className="card-img-top" 
                    alt="Press Release"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Press+Release'
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{release.title}</h5>
                    <p className="text-muted small">{release.date} | {release.paper}</p>
                    <p className="card-text">{release.description}</p>
                    <Link 
                      to={`/press-release/${release.id}`} 
                      className="btn-view-more"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPressReleases.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No press releases found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default PressRelease

