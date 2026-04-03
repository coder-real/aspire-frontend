'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { SchoolConfig } from '@/types/school';

interface ThemeState {
  config: SchoolConfig | null;
  isLoaded: boolean;
}

interface ThemeContextValue extends ThemeState {
  applyTheme: (code: string) => Promise<void>;
  clearTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const FALLBACK_PRIMARY   = '#1E3A8A';
const FALLBACK_SECONDARY = '#FBBF24';
const STORAGE_KEY        = 'aspire:schoolCode';

function injectCSSVars(primary: string, secondary: string) {
  document.documentElement.style.setProperty('--color-primary',   primary);
  document.documentElement.style.setProperty('--color-secondary', secondary);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>({
    config: null,
    isLoaded: false,
  });

  useEffect(() => {
    injectCSSVars(FALLBACK_PRIMARY, FALLBACK_SECONDARY);

    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      api.get<{ data: { school: SchoolConfig } }>(`/schools/${savedCode}/config`)
        .then((res) => {
          const school: SchoolConfig = res.data.data.school;
          injectCSSVars(school.theme.primaryColor, school.theme.secondaryColor);
          setState({ config: school, isLoaded: true });
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEY);
          setState({ config: null, isLoaded: true });
        });
    } else {
      setState({ config: null, isLoaded: true });
    }
  }, []);

  async function applyTheme(code: string) {
    const res = await api.get(`/schools/${code}/config`);
    const school: SchoolConfig = res.data.data.school;
    injectCSSVars(school.theme.primaryColor, school.theme.secondaryColor);
    localStorage.setItem(STORAGE_KEY, code);
    setState({ config: school, isLoaded: true });
  }

  function clearTheme() {
    localStorage.removeItem(STORAGE_KEY);
    injectCSSVars(FALLBACK_PRIMARY, FALLBACK_SECONDARY);
    setState({ config: null, isLoaded: true });
  }

  return (
    <ThemeContext.Provider value={{ ...state, applyTheme, clearTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
