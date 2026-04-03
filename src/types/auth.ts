export interface StudentLoginRequest {
  schoolCode: string;
  regNumber: string;
  password: string;
}

export interface AdminLoginRequest {
  schoolCode: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  schoolId: string;
  schoolCode: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type UserRole = 'admin' | 'student';
