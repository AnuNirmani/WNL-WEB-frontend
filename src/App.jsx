import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import Dashboard from './components/Dashboard'
import Leaders from './Leaders/Leaders'
import Faces from './Leaders/Faces'
import Awards from './Categories/Awards'

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
      </Routes>
    </Router>
  )
}

export default App

