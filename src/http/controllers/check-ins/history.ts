import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FetchUserCheckInsHistoryUseCaseFactory } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const data = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckinsHistoryUseCase =
    FetchUserCheckInsHistoryUseCaseFactory.make()

  const history = await fetchUserCheckinsHistoryUseCase.execute({
    userId: request.user.sub,
    page: data.page,
  })

  return reply.status(200).send(history)
}
