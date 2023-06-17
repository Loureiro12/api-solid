import { PrismaUserRepositories } from '@/repositories/prisma/prisma-user-repositories'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepositories()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
