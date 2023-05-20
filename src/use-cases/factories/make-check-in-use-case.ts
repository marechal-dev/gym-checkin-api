import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export class CheckInUseCaseFactory {
  public static make() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(gymsRepository, checkInsRepository)

    return useCase
  }
}
