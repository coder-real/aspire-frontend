import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, style, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface-card, #FFFFFF)',
        borderRadius: 12,
        boxShadow: '0 4px 16px -2px rgba(26, 26, 46, 0.08)',
        border: '1px solid rgba(26, 26, 46, 0.06)',
        padding: '20px',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
