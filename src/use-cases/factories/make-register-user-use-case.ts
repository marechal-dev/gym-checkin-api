import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export class RegisterUserUseCaseFactory {
  public static make() {
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    return registerUserUseCase
  }
}
