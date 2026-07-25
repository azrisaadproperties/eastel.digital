import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eastel.digital'

  // Halaman Statik
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/daftar`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ]

  // Halaman Dinamik (Subdomain Ejen)
  // Untuk sitemap, Google mungkin tak faham wildcard subdomain dengan mudah dalam sitemap yang sama.
  // Tetapi kita letak sebagai rujukan sahaja. Google lebih mengutamakan Canonical (Laman Utama).
  const agents = await prisma.agent.findMany({
    select: { subdomain: true, updatedAt: true }
  })

  const agentPages = agents.map((agent) => ({
    url: `https://${agent.subdomain}.eastel.digital`,
    lastModified: agent.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...agentPages]
}
