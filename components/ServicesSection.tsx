'use client'

const services = [
  {
    icon: 'fas fa-brain',
    title: 'Machine Learning Solutions',
    description: 'Custom ML models for predictive analytics, recommendation systems, and automated decision-making processes.',
    features: [
      'Supervised & Unsupervised Learning',
      'Deep Learning & Neural Networks',
      'MLOps & Model Deployment'
    ],
    gradient: 'from-blue-50 to-indigo-100',
    iconBg: 'bg-indigo-600'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Data Analytics & BI',
    description: 'Transform your data into compelling stories with advanced analytics and interactive dashboards.',
    features: [
      'Real-time Dashboards',
      'Statistical Analysis',
      'Data Visualization'
    ],
    gradient: 'from-green-50 to-emerald-100',
    iconBg: 'bg-emerald-600'
  },
  {
    icon: 'fas fa-robot',
    title: 'AI Strategy & Consulting',
    description: 'Strategic guidance to identify AI opportunities and develop roadmaps for successful implementation.',
    features: [
      'AI Readiness Assessment',
      'Technology Selection',
      'Implementation Planning'
    ],
    gradient: 'from-purple-50 to-violet-100',
    iconBg: 'bg-violet-600'
  },
  {
    icon: 'fas fa-database',
    title: 'Data Engineering',
    description: 'Build robust data pipelines and infrastructure to support your analytics and ML initiatives.',
    features: [
      'Data Pipeline Development',
      'Cloud Architecture',
      'ETL/ELT Processes'
    ],
    gradient: 'from-red-50 to-pink-100',
    iconBg: 'bg-pink-600'
  },
  {
    icon: 'fas fa-cog',
    title: 'MLOps & Automation',
    description: 'Streamline your machine learning operations with automated deployment and monitoring systems.',
    features: [
      'Model Versioning',
      'Automated Testing',
      'Performance Monitoring'
    ],
    gradient: 'from-orange-50 to-amber-100',
    iconBg: 'bg-amber-600'
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Training & Workshops',
    description: 'Empower your team with cutting-edge data science and ML skills through customized training programs.',
    features: [
      'Executive Workshops',
      'Technical Training',
      'Best Practices'
    ],
    gradient: 'from-teal-50 to-cyan-100',
    iconBg: 'bg-cyan-600'
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver end-to-end solutions that transform raw data into actionable insights and competitive advantages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.gradient} rounded-xl p-6 card-hover fade-in`}
            >
              <div className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                <i className={`${service.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="text-sm text-gray-500 space-y-1">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}