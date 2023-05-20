import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export class CreateGymUseCaseFactory {
  public static make() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
  }
}
