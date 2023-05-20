import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let gymsRepository: InMemoryGymsRepository
let checkInsRepository: InMemoryCheckInsRepository
let systemUnderTest: CheckInUseCase

const LATITUTDE = -32.0327967
const LONGITUDE = -52.1085698

describe('Check-In Use Case Tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    systemUnderTest = new CheckInUseCase(gymsRepository, checkInsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Estação Fitness',
      description: 'Academia bacana',
      latitude: LATITUTDE,
      longitude: LONGITUDE,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await systemUnderTest.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: LATITUTDE,
      userLongitude: LONGITUDE,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await systemUnderTest.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: LATITUTDE,
      userLongitude: LONGITUDE,
    })

    await expect(() =>
      systemUnderTest.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: LATITUTDE,
        userLongitude: LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await systemUnderTest.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: LATITUTDE,
      userLongitude: LONGITUDE,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await systemUnderTest.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: LATITUTDE,
      userLongitude: LONGITUDE,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Estação Random',
      description: 'Academia random',
      latitude: new Decimal(-32.0698927),
      longitude: new Decimal(-52.1759048),
      phone: '',
    })

    await expect(() =>
      systemUnderTest.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: LATITUTDE,
        userLongitude: LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
