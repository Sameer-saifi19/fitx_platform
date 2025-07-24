'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';

export async function signupAction(formData: {
  firstName: string
  lastName?: string
  email: string
  password: string
}) {
  const existingUser = await prisma.admin.findUnique({
    where: { email: formData.email },
  })

  if (existingUser) {
    return { error: "user already exists"}
  }

  const hashedPassword = await bcrypt.hash(formData.password, 12)

  const user = await prisma.admin.create({
    data: {
      firstName: formData.firstName,
      lastName: formData.lastName || '',
      email: formData.email,
      password: hashedPassword,
    },
  })

  return { success: true, user }
}
