import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { successResponse, successResponseWithMeta } from "../../utils/response";
import { UnauthorizedError } from "../../errors";
import { STUDENT_MESSAGES, AUTH_MESSAGES } from "../../constant/messages";
import { getPagination } from "../../utils/pagination";

type studentParams = {
  id: string;
};

export class studentController {
    private service = new StudentService();

    getAll = async (req: Request, res: Response) => {
        const pagination = getPagination(req);
        const result = await this.service.findAll(pagination);
        return successResponseWithMeta(res, result.data, result.meta, STUDENT_MESSAGES.FETCHED);
    }
    
}