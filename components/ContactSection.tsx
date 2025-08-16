'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300">Let&apos;s discuss how we can help you unlock the power of your data</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="fade-in">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-indigo-400"></i>
                <span>mimirsoftwarefactory@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-indigo-400"></i>
                <span>(+61) 0433-514-560</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-indigo-400"></i>
                <span>Global Remote Team</span>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Free Consultation</h4>
              <p className="text-gray-300 mb-4">
                Book a 30-minute strategy session to explore how AI and data science can accelerate your business goals.
              </p>
              <button className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Schedule Call
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 fade-in">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white resize-vertical"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isSubmitted
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : isSubmitting
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isSubmitted ? 'Message Sent!' : isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}