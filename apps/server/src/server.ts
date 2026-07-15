import app from "./app";
import { env } from "./config/env.js";
import { logger } from "./lib/logger";

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🚀 API running at http://localhost:${env.PORT}`);
});
