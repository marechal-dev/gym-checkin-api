import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ValidateCheckInUseCaseFactory } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const params = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = ValidateCheckInUseCaseFactory.make()

  await validateCheckInUseCase.execute({
    checkInId: params.checkInId,
  })

  return reply.status(204).send()
}
