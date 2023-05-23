import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FetchNearbyGymsUseCaseFactory } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearbyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyGymsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const data = fetchNearbyGymsBodySchema.parse(request.query)

  const fetchNearbyGymsUseCase = FetchNearbyGymsUseCaseFactory.make()

  const gyms = await fetchNearbyGymsUseCase.execute({
    userLatitude: data.latitude,
    userLongitude: data.longitude,
  })

  return reply.status(200).send(gyms)
}
