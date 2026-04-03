export interface StudentProfile {
  id: string;
  fullName: string;
  regNumber: string;
  class: string;
  school: {
    name: string;
    code: string;
  };
}

export interface CreateStudentRequest {
  fullName: string;
  regNumber: string;
  class: string;
  email: string;
  password: string;
}
