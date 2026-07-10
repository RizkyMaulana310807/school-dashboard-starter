import { prisma } from "../../lib/prisma.js";
import {
  CreateUserDto,
  UpdateUserDto,
} from "./user.types.js";

export class UserRepository {
  async findMany() {
    return prisma.user.findMany({
      include: {
        roles: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async count() {
    return prisma.user.count();
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