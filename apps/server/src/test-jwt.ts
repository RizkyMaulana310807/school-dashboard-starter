import {
  generateAccessToken,
  verifyAccessToken,
} from "./lib/jwt.js";
import { logger } from "./lib/logger.js"

const token = generateAccessToken({
  userId: "123",
  email: "admin@example.com",
});

logger.info(token);

const payload = verifyAccessToken(token);

logger.info(payload);