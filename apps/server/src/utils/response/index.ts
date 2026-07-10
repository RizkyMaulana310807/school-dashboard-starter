import { Response } from "express";

export function success(
  res: Response,
  data: unknown,
  message = "Success"
) {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

export function created(
  res: Response,
  data: unknown,
  message = "Created"
) {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

export function noContent(res: Response) {
  return res.status(204).send();
}

export function fail(
  res: Response,
  message: string,
  status = 400
) {
  return res.status(status).json({
    success: false,
    message,
  });
}