import { AuthRepository } from "./auth.repository.js";
import { comparePassword } from "../../lib/password.js";
import { generateAccessToken } from "../../lib/jwt.js";
import { UnauthorizedError } from "../../errors/index.js";
import { NotFoundError } from "../../errors/index.js";
import { StudentRepository } from "../students/student.repository.js";
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private studentRepository: StudentRepository,
  ) {}
  async login(email: string, password: string) {
    const user = await this.repository.findByEmailWithRoles(email);
    if (!user) {
      throw new UnauthorizedError("Email atau password salah");
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError("Email atau password salah");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Akun telah dinonaktifkan");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const student = await this.studentRepository.findByUserId(user.id);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      student: student
        ? {
            id: student.id,
          }
        : null,
    };
  }

  async me(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }
}
