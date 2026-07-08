import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    success: true,
    users,
  });
});

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      status: "ok",
      database: "connected",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      success: false,
      status: "error",
      database: "disconnected",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  }
});


export default router;