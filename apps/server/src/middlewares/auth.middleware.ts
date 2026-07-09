import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt.js";
import { UnauthorizedError } from "../errors/index.js";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError("Authorization header tidak ditemukan");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Format token tidak valid");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    req.user = payload;
  next();
}