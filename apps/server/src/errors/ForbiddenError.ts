import { ApiError } from "./ApiError.js";

export class ForbiddenError extends ApiError {
  constructor(message = "Access Forbidden") {
    super(403, message);
  }
}