import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export class SearchGymsUseCaseFactory {
  public static make() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
  }
}
