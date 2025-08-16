'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">Mímir Software Factory</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-yellow-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-yellow-300'}`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-yellow-300'}`}
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-yellow-300'}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Contact
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button 
            onClick={() => scrollToSection('home')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            Solutions
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}