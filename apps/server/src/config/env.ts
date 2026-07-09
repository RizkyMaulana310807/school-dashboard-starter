import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

export const env = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};