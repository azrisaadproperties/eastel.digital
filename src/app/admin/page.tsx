import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const isAuthenticated = session?.value === 'authenticated'

  // Jika tidak login, jangan load data untuk elak masalah sekuriti
  if (!isAuthenticated) {
    return <AdminDashboardClient isAuthenticated={false} agents={[]} content={null} />
  }

  // Jika login, load semua data HQ
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } })
  const content = await prisma.content.findFirst()

  return (
    <AdminDashboardClient 
      isAuthenticated={true} 
      agents={agents} 
      content={content} 
    />
  )
}
