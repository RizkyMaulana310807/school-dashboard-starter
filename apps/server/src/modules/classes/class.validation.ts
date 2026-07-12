import { z } from "zod";

export const createClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(100),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  grade: z
    .number()
    .int()
    .min(1)
    .max(12),

  academicYear: z
    .string()
    .trim()
    .max(20)
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export const updateClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  grade: z
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),

  academicYear: z
    .string()
    .trim()
    .max(20)
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export const classQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(10),

  search: z.string().optional(),

  sort: z.string().default("createdAt"),

  order: z
    .enum(["asc", "desc"])
    .default("desc"),
});

export type CreateClassInput =
  z.infer<typeof createClassSchema>;

export type UpdateClassInput =
  z.infer<typeof updateClassSchema>;

export type ClassQueryInput =
  z.infer<typeof classQuerySchema>;