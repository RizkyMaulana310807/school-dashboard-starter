import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { successResponse } from "../../utils/response.js";

export class AuthController {
  private service = new AuthService();

  login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const result = await this.service.login(
      email,
      password
    );

    return successResponse(
        res,
        result,
        "Login berhasil"
    );  
  }

  me = async (req: Request, res: Response) => {
    const result = await this.service.me(req.user!.userId);

    return res.status(200).json({
      success: true,
      message: "Profil berhasil diambil",
      data: result,
    });
  };
  
}