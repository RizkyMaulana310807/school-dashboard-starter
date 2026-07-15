import { Request } from "express";

export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  sort: string;
  order: "asc" | "desc";
}

export function getPagination(req: Request): PaginationQuery {
  const page = Math.max(Number(req.query.page) || 1, 1);

  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  const skip = (page - 1) * limit;

  const search = typeof req.query.search === "string" ? req.query.search : undefined;

  const sort = typeof req.query.sort === "string" ? req.query.sort : "createdAt";

  const order = req.query.order === "asc" ? "asc" : "desc";

  return {
    page,
    limit,
    skip,
    search,
    sort,
    order,
  };
}
