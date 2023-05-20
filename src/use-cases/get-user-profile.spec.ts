import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let systemUnderTest: GetUserProfileUseCase

describe('Get User Profile Use Case Tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    systemUnderTest = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get User profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await systemUnderTest.execute({
      userId: createdUser.id,
    })

    expect(user).toBeTruthy()
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get User profile with wrong ID', async () => {
    await expect(() =>
      systemUnderTest.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
