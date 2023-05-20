import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { SearchGymsUseCaseFactory } from '@/use-cases/factories/make-search-gyms-use-case'

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQueryParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const data = searchGymsQueryParamsSchema.parse(request.query)

  const searchGymsUseCase = SearchGymsUseCaseFactory.make()

  const gyms = await searchGymsUseCase.execute(data)

  return reply.status(200).send(gyms)
}
