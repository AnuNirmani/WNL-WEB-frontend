import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import Dashboard from './components/Dashboard'
import Leaders from './Leaders/Leaders'
import Faces from './Leaders/Faces'
import Awards from './Categories/Awards'
import AwardDetails from './Categories/AwardDetails'
import Careers from './Categories/Careers'
import JobDetails from './Categories/JobDetails'
import PressRelease from './Categories/PressRelease'
import Locations from './Categories/Locations'
import FAQ from './Categories/FAQ'
import AdvertiseWithUs from './Categories/AdvertiseWithUs'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leaders" element={<Leaders />} />
        <Route path="/faces" element={<Faces />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/award/:id" element={<AwardDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/press-release" element={<PressRelease />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
      </Routes>
    </Router>
  )
}

export default App

