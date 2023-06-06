import { Prisma, User } from '@prisma/client'

export interface UsersREpository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
