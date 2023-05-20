import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

export class AuthenticateUserUseCaseFactory {
  public static make() {
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new AuthenticateUserUseCase(usersRepository)

    return registerUserUseCase
  }
}
