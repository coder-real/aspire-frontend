'use client';

import { AdminRoute } from '@/lib/guards';
import { useAuth } from '@/hooks/useAuth';

function AdminContent() {
  const { logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', padding: '32px 28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#7C4DFF', textTransform: 'uppercase', marginBottom: 6 }}>
            Admin Portal
          </p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.02em' }}>
            Admin Dashboard
          </h1>
        </div>
        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 8, border: 'none',
            background: '#FEF2F2', color: '#EF4444',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      </div>

      {/* Placeholder */}
      <div style={{
        background: '#fff', borderRadius: 14,
        padding: '48px 32px',
        boxShadow: '0 4px 12px rgba(26,26,46,0.04)',
        textAlign: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: '#EFECFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="26" height="26" fill="none" stroke="#7C4DFF" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>
          Admin features coming soon
        </h2>
        <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.6 }}>
          Student management, result uploads, and analytics<br/>will be available in the next release.
        </p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 32, display: 'flex', gap: 24, justifyContent: 'center' }}>
        {['🔒 ENCRYPTED DATABASE', '✅ ISO 27001 COMPLIANT', '🔄 REDUNDANT BACKUP'].map((t) => (
          <span key={t} style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: '0.04em' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}
