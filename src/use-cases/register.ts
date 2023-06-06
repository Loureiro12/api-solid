import { prisma } from '@/lib/prisma'
import { PrismaUserRepositories } from '@/repositories/prisma-user-repositories'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUserRepositories = new PrismaUserRepositories()

  prismaUserRepositories.create({
    name,
    email,
    password_hash,
  })
}
