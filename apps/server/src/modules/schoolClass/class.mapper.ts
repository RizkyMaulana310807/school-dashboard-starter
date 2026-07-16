import { SchoolClass } from "@prisma/client";

export function toClassResponse(schoolClass: SchoolClass) {
  return schoolClass;
}

export function toClassesResponse(schoolClass: SchoolClass[]) {
  return schoolClass.map(toClassResponse);
}
