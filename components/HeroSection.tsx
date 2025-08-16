'use client'

import { useState, useEffect } from 'react'

const heroStats = [
  { 
    value: 50, 
    suffix: '+', 
    label: 'Models Deployed',
    icon: 'fas fa-robot',
    color: '#10B981'
  },
  { 
    value: 99.5, 
    suffix: '%', 
    label: 'Uptime',
    icon: 'fas fa-shield-alt',
    color: '#3B82F6'
  },
  { 
    value: 80, 
    suffix: '%', 
    label: 'Accuracy Improvement',
    icon: 'fas fa-chart-line',
    color: '#F59E0B'
  },
  { 
    value: 2.5, 
    suffix: 'M', 
    label: 'Data Points Processed',
    icon: 'fas fa-database',
    color: '#8B5CF6'
  }
]

const floatingTechnologies = [
  { name: 'TensorFlow', x: 45, y: 15, delay: 0 },
  { name: 'PyTorch', x: 85, y: 15, delay: 1000 },
  { name: 'Kubernetes', x: 70, y: 80, delay: 2000 },
  { name: 'Apache Spark', x: 90, y: 80, delay: 3000 },
  { name: 'dbt', x: 60, y: 80, delay: 4000 },
  { name: 'Terraform', x: 75, y: 10, delay: 500 },
]

const typewriterTexts = [
  "Data Intelligence",
  "AI Solutions", 
  "ML Innovation",
  "Smart Analytics"
]

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({})
  const [dataProcessingProgress, setDataProcessingProgress] = useState(0)
  const [activeModelIndex, setActiveModelIndex] = useState(0)
  const [showFloatingTechs, setShowFloatingTechs] = useState<boolean[]>([])

  const models = ['Neural Network', 'Random Forest', 'SVM', 'Deep Learning', 'XGBoost']

  // Typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex])

  // Animate stats counters
  useEffect(() => {
    heroStats.forEach((stat, index) => {
      setTimeout(() => {
        let current = 0
        const target = stat.value
        const increment = target / 100
        
        const counter = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(counter)
          }
          setAnimatedStats(prev => ({
            ...prev,
            [index]: Math.floor(current * 10) / 10
          }))
        }, 30)
      }, index * 500)
    })
  }, [])

  // Data processing progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataProcessingProgress(prev => {
        if (prev >= 100) return 20
        return prev + Math.random() * 3
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Model cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModelIndex(prev => (prev + 1) % models.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Floating technologies animation
  useEffect(() => {
    floatingTechnologies.forEach((_, index) => {
      setTimeout(() => {
        setShowFloatingTechs(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * 800)
    })
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const formatStatValue = (stat: typeof heroStats[0], index: number) => {
    const value = animatedStats[index] || 0
    if (stat.suffix === 'M') {
      return `${value.toFixed(1)}${stat.suffix}`
    }
    if (stat.suffix === '%') {
      return `${value.toFixed(1)}${stat.suffix}`
    }
    return `${Math.floor(value)}${stat.suffix}`
  }

  return (
    <section id="home" className="gradient-bg text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 animate-pulse"></div>
      </div>
      
      {/* Floating Technology Badges */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingTechnologies.map((tech, index) => (
          <div
            key={tech.name}
            className={`absolute transition-all duration-1000 ${
              showFloatingTechs[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${tech.x}%`,
              top: `${tech.y}%`,
              animation: `floating 4s ease-in-out infinite ${tech.delay}ms`
            }}
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-white border-opacity-30">
              {tech.name}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-yellow-400 border-opacity-30">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-300 text-sm font-medium">AI-Powered Solutions</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with
              <span className="block text-yellow-300 min-h-[1.2em]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Mímir Software Factory specializes in cutting-edge data science and machine learning solutions that drive measurable business impact. From AI strategy to implementation, we're your trusted partners in digital transformation.
            </p>
            
            {/* Interactive Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {heroStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <i className={`${stat.icon} text-lg`} style={{ color: stat.color }}></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold group-hover:scale-105 transition-transform">
                        {formatStatValue(stat, index)}
                      </div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all text-center transform hover:scale-105 hover:shadow-lg group"
              >
                <span className="group-hover:mr-2 transition-all">Start Your Project</span>
                <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-all"></i>
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all text-center transform hover:scale-105 hover:shadow-lg group"
              >
                <span className="group-hover:mr-2 transition-all">Explore Services</span>
                <i className="fas fa-compass opacity-0 group-hover:opacity-100 transition-all"></i>
              </button>
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="floating">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
              <div className="space-y-6">
                {/* AI Training Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-medium">AI Training: {models[activeModelIndex]}</span>
                  </div>
                  <div className="text-xs text-green-300 animate-pulse">ACTIVE</div>
                </div>

                {/* Data Processing Progress */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Data Processing</span>
                    <span className="text-sm">{Math.floor(dataProcessingProgress)}%</span>
                  </div>
                  <div className="bg-gray-300 bg-opacity-30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300 relative"
                      style={{ width: `${dataProcessingProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all cursor-pointer group">
                    <div className="text-2xl font-bold mb-1 group-hover:scale-110 transition-transform">
                      {formatStatValue(heroStats[0], 0)}
                    </div>
                    <div className="text-xs opacity-80">Models Active</div>
                  </div>
                  <div className="text-center p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all cursor-pointer group">
                    <div className="text-2xl font-bold mb-1 group-hover:scale-110 transition-transform">
                      {formatStatValue(heroStats[1], 1)}
                    </div>
                    <div className="text-xs opacity-80">System Health</div>
                  </div>
                </div>

                {/* Real-time Activity */}
                <div className="space-y-2">
                  <div className="text-xs font-medium opacity-75 mb-3">RECENT ACTIVITY</div>
                  {[
                    { action: 'Model deployed', time: '2min ago', icon: 'fas fa-rocket', color: 'text-green-400' },
                    { action: 'Data pipeline optimized', time: '5min ago', icon: 'fas fa-cog', color: 'text-blue-400' },
                    { action: 'Anomaly detected & resolved', time: '12min ago', icon: 'fas fa-shield-alt', color: 'text-yellow-400' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all">
                      <div className="flex items-center space-x-2">
                        <i className={`${activity.icon} ${activity.color} text-xs`}></i>
                        <span className="text-xs">{activity.action}</span>
                      </div>
                      <span className="text-xs opacity-60">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}