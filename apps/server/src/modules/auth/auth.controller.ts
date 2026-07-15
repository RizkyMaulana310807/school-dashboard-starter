import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { successResponse } from "../../utils/response.js";
import { success } from "../../utils/response/index.js";

export class AuthController {
  private service = new AuthService();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await this.service.login(email, password);

    return success(res, result, "Login berhasil");
  };

  me = async (req: Request, res: Response) => {
    const result = await this.service.me(req.user!.userId);

    return success(res, result, "Profil berhasil diambil");
  };
}
