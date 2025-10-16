import { useEffect } from 'react'
import AOS from 'aos'
import Dashboard from './components/Dashboard'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return <Dashboard />
}

export default App

