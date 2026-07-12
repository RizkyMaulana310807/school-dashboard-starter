import { ClassRepository } from "./class.repository.js";

import {
  CreateClassDto,
  UpdateClassDto,
} from "./class.types.js";

import {
  NotFoundError,
  ConflictError,
} from "../../errors";

import { PaginationQuery } from "../../utils/pagination";
import { createPaginationMeta } from "../../utils/pagination/PaginatedResponse";

import {
  toClassResponse,
  toClassesResponse,
} from "./class.mapper.js";

import { CLASS_MESSAGES } from "../../constant/messages";

export class ClassService {
  private repository = new ClassRepository();

  async findAll(query: PaginationQuery) {
    const classes =
      await this.repository.findMany(query);

    const total =
      await this.repository.count(query.search);

    return {
      data: toClassesResponse(classes),

      meta: createPaginationMeta(
        query.page,
        query.limit,
        total
      ),
    };
  }

  async findById(id: string) {
    const schoolClass =
      await this.repository.findById(id);

    if (!schoolClass) {
      throw new NotFoundError(
        CLASS_MESSAGES.NOT_FOUND
      );
    }

    return toClassResponse(schoolClass);
  }

  async create(data: CreateClassDto) {
    const existing =
      await this.repository.findByName(
        data.name
      );

    if (existing) {
      throw new ConflictError(
        CLASS_MESSAGES.NAME_EXISTS
      );
    }

    const schoolClass =
      await this.repository.create(data);

    return toClassResponse(schoolClass);
  }

  async update(
    id: string,
    data: UpdateClassDto
  ) {
    const schoolClass =
      await this.repository.findById(id);

    if (!schoolClass) {
      throw new NotFoundError(
        CLASS_MESSAGES.NOT_FOUND
      );
    }

    if (data.name) {
      const existing =
        await this.repository.findByName(
          data.name
        );

      if (existing && existing.id !== id) {
        throw new ConflictError(
          CLASS_MESSAGES.NAME_EXISTS
        );
      }
    }

    const updated =
      await this.repository.update(id, data);

    return toClassResponse(updated);
  }

  async delete(id: string) {
    const schoolClass =
      await this.repository.findById(id);

    if (!schoolClass) {
      throw new NotFoundError(
        CLASS_MESSAGES.NOT_FOUND
      );
    }

    await this.repository.delete(id);

    return {
      message: CLASS_MESSAGES.DELETED,
    };
  }
}