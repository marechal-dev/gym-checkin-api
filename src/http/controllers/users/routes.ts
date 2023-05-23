import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticateUserController } from './authenticate'
import { registerUserController } from './register'
import { profileController } from './profile'
import { refreshController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)

  app.patch('/token/refresh', refreshController)

  // Authenticated Routes
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profileController,
  )
}
