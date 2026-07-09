import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/index.js";
import { PermissionService } from "../modules/auth/permission.service.js";

const permissionService = new PermissionService();

export function authorize(permission: string) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {

    const allowed = await permissionService.hasPermission(
      req.user!.userId,
      permission
    );

    if (!allowed) {
      throw new ForbiddenError(
        "Anda tidak memiliki permission."
      );
    }

    next();
  };
}