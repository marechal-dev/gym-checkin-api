import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let systemUnderTest: CreateGymUseCase

describe('Create Gym Use Case Tests', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create', async () => {
    const { gym } = await systemUnderTest.execute({
      title: 'JGym',
      description: null,
      phone: null,
      latitude: -32.0698927,
      longitude: -52.1759048,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
