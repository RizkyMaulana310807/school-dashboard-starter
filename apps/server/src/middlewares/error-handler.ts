import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { ApiError } from "../errors/index.js";
import { logger } from "../lib/logger.js";

export function globalErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }

  logger.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
