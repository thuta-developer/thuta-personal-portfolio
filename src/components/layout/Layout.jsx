import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import Lenis from "lenis"
import Menu from "./Menu"
import Footer from "./Footer"
import { motion } from "framer-motion"

const Layout = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Menu />
      <motion.div
        className="fixed inset-0 bg-[#1E1E1E] z-100 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 1 }}
      />
      <main className="min-h-screen relative">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout