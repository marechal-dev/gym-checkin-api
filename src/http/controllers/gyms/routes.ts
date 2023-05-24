import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { searchController } from './search'
import { nearbyController } from './nearby'
import { createController } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchController)
  app.get('/gyms/nearby', nearbyController)

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    createController,
  )
}
