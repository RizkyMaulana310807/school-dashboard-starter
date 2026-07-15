import { Request, Response } from "express";

import { ClassService } from "./class.service";

import { successResponse, successResponseWithMeta } from "../../utils/response";
import { getPagination } from "../../utils/pagination/index";

import { CLASS_MESSAGES } from "../../constant/messages";

type ClassParams = {
  id: string;
};

export class ClassController {
  private service = new ClassService();

  /**
   * GET /classes
   */
  getAll = async (req: Request, res: Response) => {
    const pagination = getPagination(req);

    const result = await this.service.findAll(pagination);

    return successResponseWithMeta(res, result.data, result.meta, CLASS_MESSAGES.FETCHED);
  };

  /**
   * GET /classes/:id
   */
  getById = async (req: Request<ClassParams>, res: Response) => {
    const schoolClass = await this.service.findById(req.params.id);

    return successResponse(res, schoolClass, CLASS_MESSAGES.FETCHED_ONE);
  };

  /**
   * POST /classes
   */
  create = async (req: Request, res: Response) => {
    const schoolClass = await this.service.create(req.body);

    return successResponse(res, schoolClass, CLASS_MESSAGES.CREATED, 201);
  };

  /**
   * PATCH /classes/:id
   */
  update = async (req: Request<ClassParams>, res: Response) => {
    const schoolClass = await this.service.update(req.params.id, req.body);

    return successResponse(res, schoolClass, CLASS_MESSAGES.UPDATED);
  };

  /**
   * DELETE /classes/:id
   */
  delete = async (req: Request<ClassParams>, res: Response) => {
    const result = await this.service.delete(req.params.id);

    return successResponse(res, null, result.message);
  };
}
