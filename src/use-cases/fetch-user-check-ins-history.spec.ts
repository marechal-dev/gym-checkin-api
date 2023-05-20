import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let systemUnderTest: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-Ins History Use Case Tests', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    systemUnderTest = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await systemUnderTest.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
      }),
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i + 1}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await systemUnderTest.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
      expect.objectContaining({
        gym_id: 'gym-23',
      }),
    ])
  })
})
