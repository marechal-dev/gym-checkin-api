import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUserUseCaseFactory } from '@/use-cases/factories/make-register-user-use-case'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = registerUserBodySchema.parse(request.body)

  try {
    const registerUserUseCase = RegisterUserUseCaseFactory.make()

    await registerUserUseCase.execute(data)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
