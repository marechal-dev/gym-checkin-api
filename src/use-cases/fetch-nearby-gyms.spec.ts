import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let systemUnderTest: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case Tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -31.7581754,
      longitude: -52.328677,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -32.0328527,
      longitude: -52.10857,
    })

    const { gyms } = await systemUnderTest.execute({
      userLatitude: -32.0345216,
      userLongitude: -52.1134417,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
