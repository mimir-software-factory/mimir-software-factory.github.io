'use client'

const footerLinks = {
  services: [
    { name: 'Machine Learning', href: '#services' },
    { name: 'Data Analytics', href: '#services' },
    { name: 'AI Strategy', href: '#services' },
    { name: 'MLOps', href: '#services' }
  ],
  industries: [
    { name: 'Financial Services', href: '#solutions' }
  ],
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/mimir-software-factory/', icon: 'fab fa-linkedin' },
    { name: 'GitHub', href: 'https://github.com/mimir-software-factory', icon: 'fab fa-github' }
  ]
}

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4 gradient-text">
              Mímir Software Factory
            </h3>
            <p className="text-sm">
              Transforming businesses through intelligent data solutions and cutting-edge machine learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.industries.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
            <div>
              <a
                href="mailto:mimirsoftwarefactory@gmail.com"
                className="text-sm hover:text-white transition-colors"
              >
                mimirsoftwarefactory@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; 2025 Mímir Software Factory. All rights reserved. |{' '}
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}