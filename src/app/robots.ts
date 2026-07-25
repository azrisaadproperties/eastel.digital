import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Jangan indeks admin dashboard
    },
    sitemap: 'https://eastel.digital/sitemap.xml',
  }
}
