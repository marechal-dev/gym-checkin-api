import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUserUseCase {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
