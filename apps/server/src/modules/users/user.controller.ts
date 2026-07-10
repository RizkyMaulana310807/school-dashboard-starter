import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse } from "../../utils/response";
type UserParams = {
  id: string;
};


export class UserController {

  private service = new UserService();

  getAll = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const users =
      await this.service.findAll();

    return res.status(200).json({

      success: true,

      message: "Users fetched successfully",

      data: users,

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

    const user =
      await this.service.update(

        req.params.id,

        req.body

      );

    return successResponse(res, user, "User updated successfully");

  };

  delete = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const result =
      await this.service.delete(
        req.params.id
      );

    return res.status(200).json({

      success: true,

      message: result.message,

    });

  };

}