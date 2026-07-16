export interface CreateClassDto {
  name: string;
  description?: string;
  grade: number;
  academicYear?: string;
  isActive?: boolean;
}

export interface UpdateClassDto {
  name?: string;
  description?: string;
  grade?: number;
  academicYear?: string;
  isActive?: boolean;
}
