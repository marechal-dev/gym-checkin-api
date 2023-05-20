import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateGymUseCaseFactory } from '@/use-cases/factories/make-create-gym-use-case'

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const data = createGymBodySchema.parse(request.body)

  const createGymUseCase = CreateGymUseCaseFactory.make()

  await createGymUseCase.execute(data)

  return reply.status(201).send()
}
