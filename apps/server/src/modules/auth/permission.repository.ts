import { prisma } from "../../lib/prisma.js";

export class PermissionRepository {
  async getUserPermissions(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return user;
  }
}
