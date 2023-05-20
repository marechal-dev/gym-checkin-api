import { describe, it, expect, beforeEach } from 'vitest'

import { compare } from 'bcryptjs'

import { RegisterUserUseCase } from './register-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let systemUnderTest: RegisterUserUseCase

describe('Register User Use Case Tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    systemUnderTest = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should hash user password upon registration', async () => {
    const PASSWORD = '123456'

    const { user } = await systemUnderTest.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: PASSWORD,
    })

    const isPasswordCorrectlyHashed = await compare(
      PASSWORD,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not be able to register with same email twice', async () => {
    const EMAIL = 'johndoe@example.com'

    await systemUnderTest.execute({
      name: 'John Doe',
      email: EMAIL,
      password: '123456',
    })

    await expect(() =>
      systemUnderTest.execute({
        name: 'John Doe',
        email: EMAIL,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register ', async () => {
    const { user } = await systemUnderTest.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
