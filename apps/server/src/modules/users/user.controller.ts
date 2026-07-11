import { Request, Response } from "express";
import { UserService } from "./user.service";
import {
  successResponse,
  successResponseWithMeta,
} from "../../utils/response";import { getPagination } from "../../utils/pagination";
import { UnauthorizedError } from "../../errors";
import {
  USER_MESSAGES,
  AUTH_MESSAGES,
} from "../../constant/messages";

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

    return successResponseWithMeta(
      res,
      result.data,
      result.meta,
      USER_MESSAGES.FETCHED
    );
  };

  getById = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const user =
      await this.service.findById(
        req.params.id
      );

    return successResponse(
      res,
      user,
      USER_MESSAGES.FETCHED_ONE
    );
  };

  create = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    const user =
      await this.service.create(
        req.body
      );

    return successResponse(
      res,
      user,
      USER_MESSAGES.CREATED,
      201
    );
  };

  update = async (
    req: Request<UserParams>,
    res: Response
  ) => {
    const user = await this.service.update(
      req.params.id,
      req.body
    );
    return successResponse(
      res,
      user,
      USER_MESSAGES.UPDATED
    );
  };

  delete = async (
    req: Request<UserParams>,
    res: Response
  ) => {

    if (!req.user) {
      throw new UnauthorizedError(AUTH_MESSAGES.UNAUTHORIZED);
    }
    
    const result =
      await this.service.delete(
        req.params.id,
        req.user.userId
      );

    return successResponse(
      res,
      null,
      USER_MESSAGES.DELETED
    );

  };
}