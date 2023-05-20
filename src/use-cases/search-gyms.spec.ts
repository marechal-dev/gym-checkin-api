import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let systemUnderTest: SearchGymsUseCase

describe('Search Gyms Use Case Tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -32.0698927,
      longitude: -52.1759048,
    })

    await gymsRepository.create({
      title: 'TS Gym',
      description: null,
      phone: null,
      latitude: -32.0698927,
      longitude: -52.1759048,
    })

    const { gyms } = await systemUnderTest.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JS Gym',
      }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 0; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: null,
        phone: null,
        latitude: -32.0698927,
        longitude: -52.1759048,
      })
    }

    const { gyms } = await systemUnderTest.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JS Gym 20',
      }),
      expect.objectContaining({
        title: 'JS Gym 21',
      }),
      expect.objectContaining({
        title: 'JS Gym 22',
      }),
    ])
  })
})
