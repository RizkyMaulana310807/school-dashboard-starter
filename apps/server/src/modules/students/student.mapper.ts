import { Student } from "@prisma/client";
import { email } from "zod";

export function toStudentResponse(student: any) {
  return {
    id: student.id,
    name: student.name,
    gender: student.gender,
    birthDate: student.birthDate,
    createdAt: student.createdAt,
    email: student.user?.email || null,
    className:
      student.classes && student.classes.length > 0 ? student.classes[0].name : "Belum ada kelas",
  };
}

export function toStudentsResponse(students: any[]) {
  return students.map(toStudentResponse);
}
