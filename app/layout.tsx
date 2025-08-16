import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mímir Software Factory - Data & ML Consulting',
  description: 'Transform your business with cutting-edge data science and machine learning solutions. Expert consulting for AI strategy, implementation, and digital transformation.',
  keywords: 'data science, machine learning, AI consulting, data analytics, MLOps, artificial intelligence, business intelligence',
  authors: [{ name: 'Mímir Software Factory' }],
  creator: 'Mímir Software Factory',
  publisher: 'Mímir Software Factory',
  robots: 'index, follow',
  openGraph: {
    title: 'Mímir Software Factory - Data & ML Consulting',
    description: 'Transform your business with cutting-edge data science and machine learning solutions.',
    url: 'https://mimir-software-factory.github.io',
    siteName: 'Mímir Software Factory',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mímir Software Factory - Data & ML Consulting',
    description: 'Transform your business with cutting-edge data science and machine learning solutions.',
    creator: '@mimirsoftware',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-50 loading`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}