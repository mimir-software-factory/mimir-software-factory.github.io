'use client'

const solutions = [
  {
    title: 'Financial Services',
    description: 'Advanced risk modeling and algorithmic trading solutions that help financial institutions make smarter decisions.',
    features: [
      { title: 'Risk Assessment', description: 'ML-powered risk evaluation' },
      { title: 'Algo Trading', description: 'Real-time algorithmic trading' }
    ],
    highlight: {
      icon: '📊',
      title: 'Portfolio Optimization',
      description: 'AI-driven investment strategies with 15% better returns'
    },
    order: 'normal'
  }
  // {
  //   title: 'Healthcare & Life Sciences',
  //   description: 'Revolutionize patient care with predictive analytics, drug discovery acceleration, and personalized treatment recommendations.',
  //   features: [
  //     { title: 'Drug Discovery', description: 'AI-accelerated compound identification' },
  //     { title: 'Clinical Analytics', description: 'Patient outcome prediction and optimization' }
  //   ],
  //   highlight: {
  //     icon: '🏥',
  //     title: 'Predictive Healthcare',
  //     description: 'Early disease detection with 90% accuracy improvement'
  //   },
  //   order: 'reverse'
  // },
  // {
  //   title: 'Retail & E-commerce',
  //   description: 'Enhance customer experience with personalized recommendations, demand forecasting, and intelligent inventory management.',
  //   features: [
  //     { title: 'Personalization', description: 'AI-powered product recommendations' },
  //     { title: 'Demand Forecasting', description: 'Predictive inventory optimization' }
  //   ],
  //   highlight: {
  //     icon: '🛍️',
  //     title: 'Customer Intelligence',
  //     description: '25% increase in conversion rates through AI insights'
  //   },
  //   order: 'normal'
  // }
]

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
          <p className="text-xl text-gray-600">Tailored solutions for specific industry challenges</p>
        </div>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                solution.order === 'reverse' ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`fade-in ${solution.order === 'reverse' ? 'lg:col-start-2' : ''}`}>
                <h3 className="text-3xl font-bold mb-6">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`bg-white rounded-xl p-8 shadow-lg fade-in ${
                solution.order === 'reverse' ? 'lg:col-start-1' : ''
              }`}>
                <div className="text-center">
                  <div className="text-4xl mb-4">{solution.highlight.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">{solution.highlight.title}</h4>
                  <p className="text-gray-600">{solution.highlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
