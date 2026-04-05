import React from 'react';

export function LoadingSpinner({ fullscreen = false }: { fullscreen?: boolean }) {
  const wrapper: React.CSSProperties = fullscreen
    ? { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }
    : { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' };

  return (
    <div style={wrapper}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '2.5px solid #E5E7EB',
        borderTop: '2.5px solid var(--color-primary, #1DB584)',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
