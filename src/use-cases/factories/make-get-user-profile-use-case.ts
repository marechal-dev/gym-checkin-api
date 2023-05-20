import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export class GetUserProfileUseCaseFactory {
  public static make() {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)

    return useCase
  }
}
