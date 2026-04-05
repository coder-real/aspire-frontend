import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.07em',
        color: '#6B7280',
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'Inter, sans-serif',
      }}>
        {label}
      </label>
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: 14,
          border: 'none',
          borderBottom: error
            ? '1.5px solid #EF4444'
            : focused
            ? '1.5px solid var(--color-primary, #1DB584)'
            : '1.5px solid #E5E7EB',
          borderRadius: 0,
          outline: 'none',
          background: 'transparent',
          color: '#1A1A2E',
          transition: '200ms ease-out',
          fontFamily: 'Inter, sans-serif',
          ...props.style,
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
}
