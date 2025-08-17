'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : undefined
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email address' : undefined
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error and submit error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    if (submitError) {
      setSubmitError(null)
    }

    // Only do real-time validation for email and only if it has content
    if (name === 'email' && value.trim()) {
      const error = validateField(name, value)
      if (error) {
        setErrors(prev => ({
          ...prev,
          [name]: error
        }))
      }
    }
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFocusedField(null)
    
    // Only validate required fields on blur, and only if they have content
    if ((name !== 'company') && value.trim()) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'company') { // company is optional
        const error = validateField(key, value)
        if (error) newErrors[key as keyof FormErrors] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // First, try the standard Formspree submission
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('message', formData.message)

      const response = await fetch('https://formspree.io/f/xeozwaad', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setErrors({})
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            message: ''
          })
        }, 5000)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(`Server error: ${response.status} - ${errorData.error || 'Please try again'}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      
      // If fetch fails, try fallback method using a form submission
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Create a temporary form and submit it traditionally
        const form = document.createElement('form')
        form.action = 'https://formspree.io/f/xeozwaad'
        form.method = 'POST'
        form.style.display = 'none'
        
        // Add form fields
        const fields = [
          { name: 'name', value: formData.name },
          { name: 'email', value: formData.email },
          { name: 'company', value: formData.company },
          { name: 'message', value: formData.message }
        ]
        
        fields.forEach(field => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = field.name
          input.value = field.value
          form.appendChild(input)
        })
        
        document.body.appendChild(form)
        
        try {
          form.submit()
          // Assume success since we can't detect form submission result
          setIsSubmitted(true)
          setErrors({})
          setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
              name: '',
              email: '',
              company: '',
              message: ''
            })
          }, 5000)
        } catch {
          setSubmitError('Unable to send message. Please email us directly at mimirsoftwarefactory@gmail.com')
        } finally {
          document.body.removeChild(form)
        }
      } else {
        setSubmitError('Failed to send message. Please try again or email us directly at mimirsoftwarefactory@gmail.com')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    const hasValidName = formData.name.trim().length >= 2
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const hasValidMessage = formData.message.trim().length >= 10
    
    // Only check for errors in required fields
    const hasErrors = errors.name || errors.email || errors.message
    
    return hasValidName && hasValidEmail && hasValidMessage && !hasErrors
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="hero-pattern w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let&apos;s discuss how we can help you unlock the power of your data and accelerate your growth with AI-driven solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 mr-3 rounded-full"></span>
              Get in Touch
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fas fa-envelope text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email us at</p>
                  <span className="text-white font-medium">mimirsoftwarefactory@gmail.com</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fas fa-phone text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call us at</p>
                  <span className="text-white font-medium">(+61) 0433-514-560</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fas fa-globe text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">We&apos;re located</p>
                  <span className="text-white font-medium">Global Remote Team</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 floating">
                  <i className="fas fa-calendar-alt text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Free Strategy Consultation</h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Book a 30-minute strategy session to explore how AI and data science can accelerate your business goals. No commitment required.
                  </p>
                  {/* <button className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 font-medium">
                    <i className="fas fa-video mr-2"></i>
                    Schedule Call
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in">
            <div className="mb-4">
              <p className="text-sm text-gray-400">
                Having trouble with the form? <button 
                  type="button" 
                  onClick={() => window.open('mailto:mimirsoftwarefactory@gmail.com?subject=Project Inquiry&body=Hi, I would like to discuss a project...')}
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Email us directly
                </button>
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                  <i className="fas fa-exclamation-triangle text-red-400"></i>
                  <span className="text-red-300">{submitError}</span>
                </div>
              )}

              {isSubmitted && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3 animate-pulse">
                  <i className="fas fa-check-circle text-green-400"></i>
                  <span className="text-green-300">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all ${
                        errors.name ? 'border-2 border-red-500' : 'border-2 border-transparent'
                      } ${focusedField === 'name' ? 'transform scale-[1.02]' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {focusedField === 'name' && (
                      <div className="absolute -right-2 -top-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all ${
                        errors.email ? 'border-2 border-red-500' : 'border-2 border-transparent'
                      } ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}
                      placeholder="your.email@company.com"
                    />
                    {focusedField === 'email' && (
                      <div className="absolute -right-2 -top-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-300">
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('company')}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all border-2 border-transparent ${
                      focusedField === 'company' ? 'transform scale-[1.02]' : ''
                    }`}
                    placeholder="Your company or organization"
                  />
                  {focusedField === 'company' && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Project Details *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white resize-vertical transition-all ${
                      errors.message ? 'border-2 border-red-500' : 'border-2 border-transparent'
                    } ${focusedField === 'message' ? 'transform scale-[1.02]' : ''}`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                  ></textarea>
                  {focusedField === 'message' && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
                  )}
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.message}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full py-4 rounded-lg font-semibold transition-all transform flex items-center justify-center space-x-2 ${
                  isSubmitted
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : isSubmitting || !isFormValid()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <i className="fas fa-check-circle"></i>
                    <span>Message Sent!</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}