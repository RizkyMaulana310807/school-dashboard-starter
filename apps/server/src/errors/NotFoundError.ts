import { ApiError } from "./ApiError.js";

export class NotFoundError extends ApiError {
  constructor(message = "Data tidak ditemukan") {
    super(404, message);
  }
}