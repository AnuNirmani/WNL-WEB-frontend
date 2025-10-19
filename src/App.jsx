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
import Locations from './More/Locations'
import FAQ from './More/FAQ'
import AdvertiseWithUs from './More/AdvertiseWithUs'
import ContactUs from './More/ContactUs'
import AboutUs from './WhoAreWe/AboutUs'
import Papers from './Others/Papers'
import OurJourny from './Others/OurJourny'
import Overview from './Others/Overview'

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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-journey" element={<OurJourny />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  )
}

export default App

