import { ApiError } from "./ApiError.js";

export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(404, message);
  }
}