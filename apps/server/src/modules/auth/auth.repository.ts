import { prisma } from "../../lib/prisma.js";

export class AuthRepository {

  
async findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
        email,
        },
    });
}

async findByEmailWithRoles(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      roles: true,
    },
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

async updateLastLogin(id: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
    },
  });
}



}