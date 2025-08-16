'use client'

import { useState, useEffect } from 'react'

const approaches = [
  {
    icon: 'fas fa-bullseye',
    title: 'Business-First Methodology',
    description: 'We start with your business goals and work backwards to the technical solution',
    color: 'text-blue-500'
  },
  {
    icon: 'fas fa-rocket',
    title: 'Agile & Iterative',
    description: 'Rapid prototyping and continuous improvement ensure fast time-to-value',
    color: 'text-green-500'
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'End-to-End Ownership',
    description: "From strategy to deployment and beyond, we're with you every step of the way",
    color: 'text-purple-500'
  }
]

const stats = [
  { number: '10+', label: 'Projects Delivered', icon: 'fas fa-project-diagram', color: 'text-blue-500' },
  { number: '95%', label: 'Client Satisfaction', icon: 'fas fa-heart', color: 'text-red-500' },
  { number: '5+', label: 'Years Experience', icon: 'fas fa-calendar-alt', color: 'text-green-500' },
  // { number: '24/7', label: 'Support', icon: 'fas fa-headset', color: 'text-purple-500' }
]

const technologyCategories = [
  {
    name: 'Programming Languages',
    technologies: [
      { name: 'Python', icon: 'fab fa-python', color: '#3776ab', description: 'Primary language for ML & data science' },
      { name: 'SQL', icon: 'fas fa-database', color: '#336791', description: 'Database querying & management' },
      { name: 'Typescript', icon: 'fas fa-code', color: '#276DC3', description: 'Website and ui development' },
      { name: 'Rust', icon: 'fas fa-stream', color: '#DC322F', description: 'Compiled or high-performane applications' }
    ]
  },
  {
    name: 'Machine Learning Frameworks',
    technologies: [
      { name: 'TensorFlow', icon: 'fas fa-brain', color: '#FF6F00', description: 'Deep learning & neural networks' },
      { name: 'PyTorch', icon: 'fas fa-fire', color: '#EE4C2C', description: 'Research-oriented ML framework' },
      { name: 'Scikit-learn', icon: 'fas fa-chart-line', color: '#F7931E', description: 'Classical machine learning' },
      { name: 'Hugging Face', icon: 'fas fa-robot', color: '#FFD21E', description: 'NLP & transformer models' }
    ]
  },
  {
    name: 'Cloud Platforms',
    technologies: [
      { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900', description: 'Amazon Web Services' },
      { name: 'Azure', icon: 'fab fa-microsoft', color: '#0078D4', description: 'Microsoft cloud platform' },
      { name: 'GCP', icon: 'fab fa-google', color: '#4285F4', description: 'Google Cloud Platform' },
      { name: 'Databricks', icon: 'fas fa-cloud', color: '#FF3621', description: 'Unified analytics platform' }
    ]
  },
  {
    name: 'Data Engineering',
    technologies: [
      { name: 'Apache Kafka', icon: 'fas fa-stream', color: '#231F20', description: 'Real-time data streaming' },
      { name: 'Apache Airflow', icon: 'fas fa-wind', color: '#017CEE', description: 'Workflow orchestration' },
      { name: 'Airbyte', icon: 'fas fa-exchange-alt', color: '#615EFF', description: 'Data integration platform' },
      { name: 'Apache Spark', icon: 'fas fa-bolt', color: '#E25A1C', description: 'Big data processing' },
      { name: 'MinIO', icon: 'fas fa-hdd', color: '#C72E29', description: 'Object storage solution' },
      { name: 'dbt', icon: 'fas fa-table', color: '#FF694B', description: 'Data transformation tool' },
    ]
  },
  {
    name: 'Infrastructure & DevOps',
    technologies: [
      { name: 'GitHub', icon: 'fab fa-github', color: '#0c4bd2ff', description: 'Code versioning and process orchestration' },
      { name: 'GitLab', icon: 'fab fa-gitlab', color: 'hsla(0, 78%, 55%, 1.00)', description: 'Code versioning and process orchestration' },
      { name: 'Kubernetes', icon: 'fas fa-dharmachakra', color: '#32e56eff', description: 'Container orchestration' },
      { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED', description: 'Containerization platform' },
      { name: 'Terraform', icon: 'fas fa-cubes', color: '#7B42BC', description: 'Infrastructure as code' }
    ]
  }
]

export function AboutSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({})
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  // Counter animation for stats
  const animateCounter = (finalValue: string, index: number) => {
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, '')) || 0
    const isPercentage = finalValue.includes('%')
    const hasPlus = finalValue.includes('+')
    
    let current = 0
    const increment = Math.ceil(numericValue / 60)
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        current = numericValue
        clearInterval(timer)
      }
      
      setAnimatedStats(prev => ({
        ...prev,
        [index]: current
      }))
    }, 60)
  }

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('stats-container')) {
            stats.forEach((stat, index) => {
              if (!(index in animatedStats)) {
                setTimeout(() => animateCounter(stat.number, index), index * 200)
              }
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    const statsElement = document.querySelector('.stats-container')
    if (statsElement) {
      observer.observe(statsElement)
    }

    return () => observer.disconnect()
  }, [animatedStats])

  // Auto-rotate technology categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % technologyCategories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatStatNumber = (stat: typeof stats[0], index: number) => {
    const animatedValue = animatedStats[index] || 0
    const isPercentage = stat.number.includes('%')
    const hasPlus = stat.number.includes('+')
    const hasSlash = stat.number.includes('/')
    
    if (hasSlash) return stat.number // Keep "24/7" as is
    
    let suffix = ''
    if (isPercentage) suffix = '%'
    if (hasPlus) suffix = '+'
    
    return `${animatedValue}${suffix}`
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Mímir?</h2>
          <p className="text-xl text-gray-600">Your trusted partner in data-driven transformation</p>
        </div>

        {/* Our Approach Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="fade-in">
            <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Named after the Norse god of wisdom and knowledge, Mímir Software Factory brings deep expertise and innovative thinking to every project. We don't just build solutions – we craft intelligent systems that evolve with your business.
            </p>
            <div className="space-y-6">
              {approaches.map((approach, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <i className={`${approach.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {approach.title}
                    </h4>
                    <p className="text-gray-600">{approach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Animated Stats */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 fade-in stats-container">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex flex-col items-center">
                    <i className={`${stat.icon} ${stat.color} text-2xl mb-2 group-hover:scale-125 transition-transform`}></i>
                    <div className="text-3xl font-bold text-indigo-600 mb-2 group-hover:text-indigo-700 transition-colors">
                      {formatStatNumber(stat, index)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="fade-in">
          <h3 className="text-3xl font-bold text-center mb-8">Our Technology Ecosystem</h3>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We leverage cutting-edge technologies across the entire data science and ML lifecycle, from data ingestion to model deployment and monitoring.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {technologyCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Technology Grid */}
          <div className="min-h-[400px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologyCategories[activeCategory].technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease forwards'
                  }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${tech.color}15` }}
                    >
                      <i 
                        className={`${tech.icon} text-2xl`}
                        style={{ color: tech.color }}
                      ></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tech.name}
                    </h4>
                    <p className={`text-xs text-gray-500 transition-all duration-300 ${
                      hoveredTech === tech.name ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                    }`}>
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-sm text-gray-600">Core Technologies</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Technology Categories</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Cloud Native</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}