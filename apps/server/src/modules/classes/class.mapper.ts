import { SchoolClass } from "@prisma/client";

export function toClassResponse(
  schoolClass: SchoolClass
) {
  return schoolClass;
}

export function toClassesResponse(
  classes: SchoolClass[]
) {
  return classes.map(toClassResponse);
}