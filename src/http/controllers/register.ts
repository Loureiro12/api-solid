import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepositories } from '@/repositories/prisma/prisma-user-repositories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send(409)
  }

  return reply.status(201).send()
}
