import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
