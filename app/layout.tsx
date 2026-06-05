import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    default: 'DevopCom — Agence Digitale Bordeaux | Développement Web & Communication',
    template: '%s | DevopCom Bordeaux',
  },
  description: 'DevopCom, agence digitale à Bordeaux. Développement web Next.js, communication digitale, stratégie. Sites web sur-mesure, applications, identité visuelle. Devis gratuit.',
  keywords: [
    'agence digitale bordeaux',
    'développement web bordeaux',
    'création site web bordeaux',
    'agence web bordeaux',
    'next.js bordeaux',
    'communication digitale bordeaux',
    'site web sur mesure',
    'développeur web bordeaux',
    'agence communication bordeaux',
    'création site internet bordeaux',
    'devopcom',
  ],
  authors: [{ name: 'DevopCom', url: 'https://devopcom.fr' }],
  creator: 'DevopCom',
  publisher: 'DevopCom',
  metadataBase: new URL('https://devopcom.fr'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://devopcom.fr',
    siteName: 'DevopCom',
    title: 'DevopCom — Agence Digitale Bordeaux | Développement Web & Communication',
    description: 'DevopCom, agence digitale à Bordeaux. Développement web Next.js, communication digitale, stratégie. Sites web sur-mesure, applications, identité visuelle. Devis gratuit.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DevopCom — Agence Digitale Bordeaux' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevopCom — Agence Digitale Bordeaux',
    description: 'Développement web Next.js, communication digitale, stratégie. Devis gratuit.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Orbitron:wght@700;900&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              'name': 'DevopCom',
              'description': 'Agence digitale à Bordeaux spécialisée en développement web Next.js et communication digitale',
              'url': 'https://devopcom.fr',
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Bordeaux',
                'addressRegion': 'Nouvelle-Aquitaine',
                'addressCountry': 'FR',
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': 44.8378,
                'longitude': -0.5792,
              },
              'openingHours': 'Mo-Fr 09:00-18:00',
              'priceRange': '€€',
              'hasOfferCatalog': {
                '@type': 'OfferCatalog',
                'name': 'Services DevopCom',
                'itemListElement': [
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Développement Web Next.js' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Communication Digitale' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Stratégie Digitale' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}