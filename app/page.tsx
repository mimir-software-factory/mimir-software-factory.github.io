'use client'

import { HeroSection } from '@/components/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'
import { SolutionsSection } from '@/components/SolutionsSection'
import { AboutSection } from '@/components/AboutSection'
// import { ContactSection } from '@/components/ContactSection'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Add loaded class to body when component mounts
    document.body.classList.add('loaded')
    document.body.classList.remove('loading')

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    // Cleanup observer on unmount
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SolutionsSection />
      <AboutSection />
      {/* <ContactSection /> */}
    </>
  )
}