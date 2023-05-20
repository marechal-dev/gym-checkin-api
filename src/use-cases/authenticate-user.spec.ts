import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate-user'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let systemUnderTest: AuthenticateUserUseCase

describe('Authenticate User Use Case Tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    systemUnderTest = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      systemUnderTest.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const EMAIL = 'john.doe@gmail.com'
    const PASSWORD_HASH = await hash('123456', 6)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: EMAIL,
      password_hash: PASSWORD_HASH,
    })

    await expect(() =>
      systemUnderTest.execute({
        email: EMAIL,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should authenticate successfully', async () => {
    const EMAIL = 'john.doe@gmail.com'
    const PASSWORD = '123456'
    const PASSWORD_HASH = await hash(PASSWORD, 6)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: EMAIL,
      password_hash: PASSWORD_HASH,
    })

    const { user } = await systemUnderTest.execute({
      email: EMAIL,
      password: PASSWORD,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
