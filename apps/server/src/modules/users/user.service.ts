import bcrypt from "bcrypt";

import { UserRepository } from "./user.repository.js";
import { User } from "@prisma/client";
import {
  CreateUserDto,
  UpdateUserDto,
} from "./user.types.js";

import { NotFoundError } from "../../errors/NotFoundError.js";
import { ConflictError } from "../../errors/ConflictError.js";

export class UserService {
  private repository = new UserRepository();

  /**
   * Remove password from response
   */
  private sanitizeUser(user: User) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Get all users
   */
  async findAll() {
    const users = await this.repository.findMany();

    return users.map((user) => this.sanitizeUser(user));
  }

  /**
   * Get user by id
   */
  async findById(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.sanitizeUser(user);
  }

  /**
   * Create new user
   */
  async create(data: CreateUserDto) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return this.sanitizeUser(user);
  }

  /**
   * Update user
   */
  async update(id: string, data: UpdateUserDto) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (data.email) {
      const existing = await this.repository.findByEmail(data.email);

      if (existing && existing.id !== id) {
        throw new ConflictError("Email already exists");
      }
    }

    let updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.repository.update(id, updateData);

    return this.sanitizeUser(updatedUser);
  }

  /**
   * Delete user
   */
  async delete(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.repository.delete(id);

    return {
      message: "User deleted successfully",
    };
  }
}