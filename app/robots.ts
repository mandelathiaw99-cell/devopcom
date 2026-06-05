import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/admin',
          '/auth',
          '/onboarding',
          '/api',
        ],
      },
    ],
    sitemap: 'https://devopcom.fr/sitemap.xml',
    host: 'https://devopcom.fr',
  }
}