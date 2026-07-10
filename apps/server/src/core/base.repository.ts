export interface PaginationOptions {
  skip?: number;
  take?: number;
}

export interface SortOptions {
  sort?: string;
  order?: "asc" | "desc";
}

export interface QueryOptions
  extends PaginationOptions,
    SortOptions {}

export abstract class BaseRepository {
  protected constructor() {}
}