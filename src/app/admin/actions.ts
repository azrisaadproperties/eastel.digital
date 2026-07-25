'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addAgent(formData: FormData) {
  const subdomain = formData.get('subdomain') as string
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  
  if (!subdomain || !name) return

  try {
    await prisma.agent.create({
      data: {
        subdomain: subdomain.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        name,
        phone,
        password: 'password123', // Lalai
      }
    })
    revalidatePath('/admin')
  } catch (error) {
    console.error('Gagal menambah ejen', error)
  }
}

export async function deleteAgent(id: string) {
  try {
    await prisma.agent.delete({ where: { id } })
    revalidatePath('/admin')
  } catch (error) {
    console.error('Gagal memadam ejen', error)
  }
}

export async function updateContent(formData: FormData) {
  const id = formData.get('id') as string
  const headline = formData.get('headline') as string
  const subheadline = formData.get('subheadline') as string
  const description = formData.get('description') as string
  const paymentDetails = formData.get('paymentDetails') as string
  const webhookUrl = formData.get('webhookUrl') as string

  if (!id) return

  try {
    await prisma.content.update({
      where: { id },
      data: { headline, subheadline, description, paymentDetails, webhookUrl }
    })
    revalidatePath('/admin')
    revalidatePath('/', 'layout') // revalidate semua page
  } catch (error) {
    console.error('Gagal mengemaskini kandungan', error)
  }
}
