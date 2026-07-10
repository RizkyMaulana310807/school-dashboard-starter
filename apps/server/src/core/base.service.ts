import { QueryOptions } from "./base.repository.js";

export abstract class BaseService {
  protected constructor() {}

  protected buildPagination(options: QueryOptions) {
    return {
      skip: options.skip,
      take: options.take,
      orderBy: options.sort
        ? {
            [options.sort]: options.order ?? "desc",
          }
        : undefined,
    };
  }

  protected buildMeta(
    page: number,
    limit: number,
    total: number
  ) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrevious: page > 1,
    };
  }
}