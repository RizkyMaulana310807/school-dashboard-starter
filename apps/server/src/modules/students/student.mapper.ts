export function toStudentResponse(student: any) {
  return {
    id: student.id,
    name: student.name,
    gender: student.gender,
    birthDate: student.birthDate,
    createdAt: student.createdAt,
    email: student.user?.email || null,
    className: student.schoolClass?.name ?? null,
  };
}

export function toStudentsResponse(students: any[]) {
  return students.map(toStudentResponse);
}
