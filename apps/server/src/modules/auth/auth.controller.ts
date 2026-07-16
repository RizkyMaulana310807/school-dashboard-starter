import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { success } from "../../utils/response/index.js";
import { AuthRepository } from "./auth.repository.js";
import { StudentRepository } from "../students/student.repository.js";

export class AuthController {
  private authRepository = new AuthRepository();
  private studentRepository = new StudentRepository();

  private service = new AuthService(this.authRepository, this.studentRepository);
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
