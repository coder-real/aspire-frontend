import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  isLoading?: boolean;
  size?: 'sm' | 'md';
}

export function Button({ variant = 'primary', isLoading, size = 'md', children, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: size === 'sm' ? '9px 16px' : '13px 20px',
    fontSize: size === 'sm' ? 13 : 14,
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    letterSpacing: '0.02em',
    border: 'none',
    borderRadius: 8,
    cursor: isLoading || props.disabled ? 'not-allowed' : 'pointer',
    transition: '200ms ease-out',
    opacity: isLoading || props.disabled ? 0.65 : 1,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary-dark, #006C4C) 0%, var(--color-primary, #1DB584) 100%)',
      color: '#ffffff',
    },
    ghost: {
      background: '#F7F8FA',
      color: '#1A1A2E',
      border: '1.5px solid #E5E7EB',
    },
    danger: {
      background: '#FEF2F2',
      color: '#EF4444',
      border: '1.5px solid #FECACA',
    },
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      style={{ ...base, ...variants[variant], ...props.style }}
    >
      {isLoading ? (
        <>
          <div style={{
            width: 14, height: 14,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid #fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          Processing...
        </>
      ) : children}
    </button>
  );
}
