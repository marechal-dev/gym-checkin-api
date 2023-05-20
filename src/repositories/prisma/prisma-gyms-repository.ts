import { Prisma, Gym } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  public async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  public async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE (
        6371 * acos(
          cos(
            radians(${latitude}) 
          ) * cos(
            radians(latitude)
          ) * cos(
            radians(longitude) - radians(${longitude}) 
          ) + sin(
            radians(${latitude}) 
          ) * sin( 
            radians(latitude) 
          ) 
        ) 
      ) <= 10
    `

    return gyms
  }

  public async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
}
