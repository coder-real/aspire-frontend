'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AuthState, AuthUser, StudentLoginRequest, AdminLoginRequest } from '@/types/auth';

interface AuthContextValue extends AuthState {
  loginStudent: (credentials: StudentLoginRequest) => Promise<void>;
  loginAdmin:   (credentials: AdminLoginRequest)   => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'aspire:token';

function decodeToken(token: string): { exp: number; userId: string; role: string; schoolId: string; schoolCode: string } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && isTokenValid(token)) {
      const payload = decodeToken(token)!;
      const user: AuthUser = {
        id:         payload.userId,
        email:      '',
        role:       payload.role as 'admin' | 'student',
        schoolId:   payload.schoolId,
        schoolCode: payload.schoolCode,
      };
      setState({ user, token, isAuthenticated: true, isLoading: false });
    } else {
      if (token) localStorage.removeItem(TOKEN_KEY);
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  async function loginStudent(credentials: StudentLoginRequest) {
    const res = await api.post('/auth/login/student', credentials);
    const { token, user } = res.data.data;
    localStorage.setItem(TOKEN_KEY, token);
    setState({ user, token, isAuthenticated: true, isLoading: false });
    router.push('/dashboard');
  }

  async function loginAdmin(credentials: AdminLoginRequest) {
    const res = await api.post('/auth/login/admin', credentials);
    const { token, user } = res.data.data;
    localStorage.setItem(TOKEN_KEY, token);
    setState({ user, token, isAuthenticated: true, isLoading: false });
    router.push('/admin');
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('aspire:schoolCode');
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    router.push('/school-select');
  }

  return (
    <AuthContext.Provider value={{ ...state, loginStudent, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
