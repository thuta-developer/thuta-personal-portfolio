import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Preloader from './components/Preloader'
import Index from './pages/Index'
import Identity from './pages/Identity'
import Stack from './pages/Stack'
import Work from './pages/Work'
import Process from './pages/Process'
import WorkDetail from './pages/WorkDetail'

function App() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(() => {
    // Only show preloader on very first visit (sessionStorage clears when tab closes)
    return !sessionStorage.getItem('visited')
  })
  const [loaderFinished, setLoaderFinished] = useState(false)

  useEffect(() => {
    if (loaderFinished) {
      sessionStorage.setItem('visited', 'true')
    }
  }, [loaderFinished])

  return (
    <>
      {showLoader && (
        <Preloader onFinish={() => {
          setLoaderFinished(true)
          setShowLoader(false)
        }} />
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="stack" element={<Stack />} />
            <Route path="identity" element={<Identity />} />
            <Route path="work" element={<Work />} />
            <Route path="/work/:id" element={<WorkDetail />} />
            <Route path="process" element={<Process />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App