import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Locations.css'
import { fetchLocationsFromApi } from '../api/locationsApi'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchLocationsFromApi()
        if (!cancelled) {
          // Format data from Laravel
          const formatted = data.map(dep => ({
            id: dep.id,
            title: dep.department_name,
            address: dep.address ? dep.address.split('\n') : [],
            contact: dep.telephone ? dep.telephone.split('\n') : [],
            fax: dep.fax ? dep.fax.split('\n') : []
          }))
          setLocations(formatted)
        }
      } catch (err) {
        console.error('Error fetching locations:', err)
        if (!cancelled) setError(err?.message || 'Failed to load locations')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="locations-page">
      <Header />
      <main id="main">
        <section className="inner-page">
          <div className="container">
            <div className="section-title">
              <h2>Locations</h2>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert" style={{ marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            {loading && (
              <p>Loading locations…</p>
            )}
            <div className="row">
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className="col-xl-4 col-md-6 d-flex align-items-stretch"
                  data-aos="zoom-in"
                  data-aos-delay={`${(index + 1) * 100}`}
                >
                  <div className="icon-box contact-box">
                    <h4>{location.title}</h4>
                    {location.address.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    {location.contact.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    {location.fax.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
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

export default Locations
