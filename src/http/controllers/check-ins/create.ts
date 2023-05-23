import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CheckInUseCaseFactory } from '@/use-cases/factories/make-check-in-use-case'

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const params = createCheckInParamsSchema.parse(request.params)
  const data = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = CheckInUseCaseFactory.make()

  await checkInUseCase.execute({
    gymId: params.gymId,
    userId: request.user.sub,
    userLatitude: data.latitude,
    userLongitude: data.longitude,
  })

  return reply.status(201).send()
}
