import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate Controller End-To-End Test Suite', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    }

    await request(app.server).post('/users').send(user)

    const response = await request(app.server).post('/sessions').send({
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
