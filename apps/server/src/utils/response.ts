import { Response } from "express";

export function successResponse(res: Response, data: unknown, message = "Success", status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

export function successResponseWithMeta(
  res: Response,
  data: unknown,
  meta: unknown,
  message = "Success",
  status = 200,
) {
  return res.status(status).json({
    success: true,
    message,
    data,
    meta,
  });
}

export function errorResponse(res: Response, message = "Error", status = 500) {
  return res.status(status).json({
    success: false,
    message,
  });
}
