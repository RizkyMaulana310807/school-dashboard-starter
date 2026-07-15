import { hashPassword, comparePassword } from "./lib/password.js";
import { logger } from "./lib/logger.js";
const password = "admin123";

const hash = await hashPassword(password);

logger.info(hash);

logger.info(await comparePassword(password, hash));
