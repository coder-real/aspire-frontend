'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  const { logout } = useAuth();
  const { config } = useTheme();

  return (
    <header style={{
      background: 'var(--color-primary)',
      color: '#fff',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <p style={{ fontSize: 12, opacity: 0.8, margin: 0 }}>{config?.name ?? ''}</p>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h1>
      </div>
      <button
        onClick={logout}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        Sign out
      </button>
    </header>
  );
}
