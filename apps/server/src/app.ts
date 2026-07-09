import express from "express";
import cors from "cors";

import routes from "./routes";
import { globalErrorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);
app.use(globalErrorHandler);

export default app;