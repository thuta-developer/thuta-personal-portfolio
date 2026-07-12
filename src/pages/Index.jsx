import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import Transition from '../components/Transition'
import IdentitySection from '../components/IdentitySection'
import WorkSection from '../components/WorkSection'
import ProcessSection from '../components/ProcessSection'
import StackSection from '../components/StackSection'

gsap.registerPlugin(ScrollTrigger)

const Index = () => {
  const mainRef = useRef(null)

  useEffect(() => {
    const sections = mainRef.current.querySelectorAll('[data-bg]')
    const colors = []

    sections.forEach((section) => {
      const color = section.getAttribute('data-bg')
      if (color) colors.push(color)
    })

    if (colors.length === 0) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    })

    sections.forEach((section, i) => {
      if (i === 0) return
      tl.to(mainRef.current, {
        backgroundColor: colors[i],
        duration: 1,
        ease: 'power2.inOut',
      }, `-=${0.5}`)
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <Transition>
      <main ref={mainRef} className='relative min-h-screen transition-colors duration-700' style={{ backgroundColor: '#f5f5f0' }}>
        <Hero />
        <IdentitySection />
        <WorkSection />
        <ProcessSection />
        <StackSection />
      </main>
    </Transition>
  )
}

export default Index