import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { PaginationQuery } from "../../utils/pagination";

export class ClassRepository {
  async findMany(query: PaginationQuery) {
    const where: Prisma.SchoolClassWhereInput = {
      ...(query.search && {
        OR: [
          {
            name: {
              contains: query.search,
            },
          },
          {
            academicYear: {
              contains: query.search,
            },
          },
        ],
      }),
    };

    return prisma.schoolClass.findMany({
      where,

      skip: query.skip,

      take: query.limit,

      orderBy: {
        [query.sort]: query.order,
      },
    });
  }

  async findById(id: string) {
    return prisma.schoolClass.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return prisma.schoolClass.findUnique({
      where: {
        name,
      },
    });
  }

  async create(
    data: Prisma.SchoolClassCreateInput
  ) {
    return prisma.schoolClass.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.SchoolClassUpdateInput
  ) {
    return prisma.schoolClass.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.schoolClass.delete({
      where: {
        id,
      },
    });
  }

  async count(search?: string) {
    return prisma.schoolClass.count({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                academicYear: {
                  contains: search,
                },
              },
            ],
          }
        : {},
    });
  }
}