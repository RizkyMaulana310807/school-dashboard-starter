import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3).max(100),

  email: z.email().trim().toLowerCase(),

  password: z.string().min(6).max(100),

  roleIds: z.array(z.string()).min(1),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),

  email: z.email().trim().toLowerCase().optional(),

  password: z.string().min(6).max(100).optional(),

  isActive: z.boolean().optional(),

  roleIds: z.array(z.string()).optional(),
});

export const userQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(10),

  search: z.string().optional(),

  sort: z.string().default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type UserQueryInput = z.infer<typeof userQuerySchema>;
