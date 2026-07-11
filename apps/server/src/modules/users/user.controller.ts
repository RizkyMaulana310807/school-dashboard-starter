import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse } from "../../utils/response";
import { getPagination } from "../../utils/pagination";
import { UnauthorizedError } from "../../errors";

type UserParams = {
  id: string;
};


export class UserController {

  private service = new UserService();

  getAll = async (
    req: Request,
    res: Response
  ) => {
    const pagination = getPagination(req);

    const result = await this.service.findAll(pagination);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  };

  getById = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const user =
      await this.service.findById(
        req.params.id
      );

    return successResponse(res, user, "User fetched successfully");
  };

  create = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const user =
      await this.service.create(
        req.body
      );

    return successResponse(res, user, "User created successfully");

  };

  update = async (
    req: Request<UserParams>,
    res: Response
  ) => {
    const user = await this.service.update(
      req.params.id,
      req.body
    );
    return successResponse(res, user, "User updated successfully");
  };

  delete = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    if (!req.user) {
      throw new UnauthorizedError("Unauthorized");
    }
    
    const result =
      await this.service.delete(
        req.params.id,
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  };
}