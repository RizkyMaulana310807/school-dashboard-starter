import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // =========================
  // Permissions
  // =========================

  const permissions = [
    "dashboard.read",

    "user.read",
    "user.create",
    "user.update",
    "user.delete",

    "role.read",
    "role.create",
    "role.update",
    "role.delete",

    "permission.read",
    "permission.create",
    "permission.update",
    "permission.delete",
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {},
      create: {
        name: permission,
      },
    });
  }

  console.log("✅ Permissions seeded");

  // =========================
  // Role
  // =========================

  const superAdminRole = await prisma.role.upsert({
    where: {
      name: "Super Admin",
    },
    update: {},
    create: {
      name: "Super Admin",
      description: "Has full access to the system",
    },
  });

  console.log("✅ Role seeded");

  // =========================
  // Connect Permissions
  // =========================

  const allPermissions = await prisma.permission.findMany();

  await prisma.role.update({
    where: {
      id: superAdminRole.id,
    },
    data: {
      permissions: {
        set: allPermissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
  });

  console.log("✅ Role permissions assigned");

  // =========================
  // Admin User
  // =========================

  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@example.com",
      password,

      roles: {
        connect: [
          {
            id: superAdminRole.id,
          },
        ],
      },
    },
  });

  console.log("✅ Admin user seeded");

  console.log("🎉 Seed completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });