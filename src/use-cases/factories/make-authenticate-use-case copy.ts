import { PrismaUserRepositories } from '@/repositories/prisma/prisma-user-repositories'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepositories()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
