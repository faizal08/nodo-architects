import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Founder from './pages/Founder'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Approach from './pages/Approach'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

let lenis

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="grain">
      <Preloader />
      <Cursor />
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
