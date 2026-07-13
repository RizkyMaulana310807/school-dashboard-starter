import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter").max(100),

  gender: z.enum(["MALE", "FEMALE"]),

  birthDate: z.coerce.date().optional(),

  userId: z.string().min(1, "User ID wajib diisi"),

  classIds: z.array(z.string()).min(1, "Pilih minimal satu kelas"),
});

export const updateStudentSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),

  gender: z.enum(["MALE", "FEMALE"]).optional(),

  birthDate: z.coerce.date().optional(),

  classIds: z.array(z.string()).optional(),
});

export const studentQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(10),

  search: z.string().optional(),

  sort: z.string().default("name"),

  order: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentQueryInput = z.infer<typeof studentQuerySchema>;
