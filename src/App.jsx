import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import Dashboard from './components/Dashboard'
import Leaders from './Leaders/Leaders'

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
      </Routes>
    </Router>
  )
}

export default App

