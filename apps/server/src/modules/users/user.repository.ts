import { prisma } from "../../lib/prisma.js";
import {
  CreateUserDto,
  UpdateUserDto,
} from "./user.types.js";
import { PaginationQuery } from "../../utils/pagination/index.js";

export class UserRepository {
  async findMany(query: PaginationQuery) {
    return prisma.user.findMany({
      skip: query.skip,
      take: query.limit,

      where: query.search
        ? {
            OR: [
              {
                name: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,

      orderBy: {
        [query.sort]: query.order,
      },

      include: {
        roles: true,
      },
    });
  }
  async count(search?: string) {
    return prisma.user.count({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
    });
  }
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,

        roles: {
          connect: data.roleIds.map((id) => ({
            id,
          })),
        },
      },

      include: {
        roles: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateUserDto
  ) {
    return prisma.user.update({
      where: {
        id,
      },

      data: {
        ...data,

        ...(data.roleIds && {
          roles: {
            set: data.roleIds.map((id) => ({
              id,
            })),
          },
        }),
      },

      include: {
        roles: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}