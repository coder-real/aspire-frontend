'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { getErrorMessage } from '@/lib/errors';

export default function LoginPage() {
  const router = useRouter();
  const { loginStudent, loginAdmin } = useAuth();
  const { config } = useTheme();

  const [role, setRole]             = useState<'student' | 'admin'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState('');

  const schoolCode = config?.code ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!schoolCode) { router.push('/school-select'); return; }
    setIsLoading(true);
    setError('');
    try {
      if (role === 'student') {
        await loginStudent({ schoolCode, regNumber: identifier, password });
      } else {
        await loginAdmin({ schoolCode, email: identifier, password });
      }
    } catch (err: unknown) {
      const code = (err as { response?: { data?: { error?: { code?: string } } } })?.response?.data?.error?.code ?? 'INTERNAL_ERROR';
      setError(getErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-wrapper" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Left Branding Panel ─────────────────────────────── */}
      <div
        className="login-left"
        style={{
          background: 'linear-gradient(160deg, #1DB584 0%, #006C4C 100%)',
          color: '#fff',
        }}
      >
        {/* Decorative circles — desktop only */}
        <div className="login-left-quote" style={{
          position: 'absolute', top: -80, right: -80,
          width: 260, height: 260, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div className="login-left-quote" style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        {/* Logo — always visible */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 13,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 18,
          }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13, fontWeight: 800,
              color: '#1DB584', letterSpacing: '-0.02em',
            }}>aspire</span>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 30, fontWeight: 800,
            marginBottom: 4, letterSpacing: '-0.02em',
          }}>Aspire</h1>
          <p style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Cognitive Sanctuary
          </p>
        </div>

        {/* Quote card — desktop only */}
        <div className="login-left-quote" style={{
          position: 'relative', zIndex: 1,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          borderRadius: 14,
          padding: '20px 22px',
          marginBottom: 8,
        }}>
          <svg width="22" height="18" viewBox="0 0 22 18" fill="rgba(255,255,255,0.5)" style={{ marginBottom: 10 }}>
            <path d="M0 18V10.8C0 7.6 .867 4.9 2.6 2.7 4.333.9 6.7 0 9.7 0v3c-1.667 0-3 .667-4 2-1 1.267-1.5 2.8-1.5 4.6H7V18H0Zm12 0V10.8c0-3.2.867-5.9 2.6-8.1C16.333.9 18.7 0 21.7 0v3c-1.667 0-3 .667-4 2-1 1.267-1.5 2.8-1.5 4.6H19V18h-7Z"/>
          </svg>
          <p style={{ fontSize: 14, fontStyle: 'italic', lineHeight: 1.65, opacity: 0.9 }}>
            Precision in thought, clarity in action. Empowering the next generation of creative intelligence.
          </p>
        </div>

        {/* Footer — desktop only */}
        <p className="login-left-footer" style={{
          position: 'relative', zIndex: 1,
          fontSize: 11, opacity: 0.45,
          letterSpacing: '0.06em',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          SYSTEM.V.4.0.2 // ENCRYPTED
        </p>
      </div>

      {/* ── Right Form Panel ────────────────────────────────── */}
      <div className="login-right">

        {/* School context */}
        {config && (
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 4 }}>
            Signing into <span style={{ color: 'var(--color-primary, #1DB584)', fontWeight: 600 }}>{config.name}</span>
          </p>
        )}

        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 26, fontWeight: 700,
          color: '#1A1A2E', marginBottom: 6,
          letterSpacing: '-0.02em',
        }}>Welcome back</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>
          Sign in to your Aspire account
        </p>

        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          background: '#F7F8FA',
          borderRadius: 10, padding: 4,
          marginBottom: 28,
          width: 'fit-content', gap: 4,
        }}>
          {(['student', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setIdentifier(''); setError(''); }}
              style={{
                padding: '8px 20px',
                borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                textTransform: 'capitalize',
                transition: '200ms ease-out',
                background: role === r ? '#FFFFFF' : 'transparent',
                color: role === r ? '#1A1A2E' : '#9CA3AF',
                boxShadow: role === r ? '0 1px 4px rgba(26,26,46,0.08)' : 'none',
              }}
            >{r}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: 360, width: '100%' }}>
          {/* Identifier */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.07em', color: '#6B7280',
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              {role === 'student' ? 'Registration Number' : 'Email Address'}
            </label>
            <input
              type={role === 'student' ? 'text' : 'email'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'student' ? 'e.g. ASP/2024/001' : 'name@school.edu'}
              required
              style={{
                width: '100%', padding: '12px 14px', fontSize: 14,
                border: 'none', borderBottom: '1.5px solid #E5E7EB',
                borderRadius: 0, outline: 'none', background: 'transparent',
                color: '#1A1A2E', transition: '200ms ease-out',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottom = '1.5px solid var(--color-primary, #1DB584)'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottom = '1.5px solid #E5E7EB'; }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: '#6B7280', textTransform: 'uppercase' }}>
                Password
              </label>
              <span style={{ fontSize: 12, color: 'var(--color-primary, #1DB584)', fontWeight: 600, cursor: 'pointer' }}>
                Forgot password?
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '12px 40px 12px 14px', fontSize: 14,
                  border: 'none', borderBottom: '1.5px solid #E5E7EB',
                  borderRadius: 0, outline: 'none', background: 'transparent',
                  color: '#1A1A2E', transition: '200ms ease-out',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottom = '1.5px solid var(--color-primary, #1DB584)'; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottom = '1.5px solid #E5E7EB'; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}
              >
                {showPass ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 16, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8 }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', marginTop: 28, padding: '14px',
              fontSize: 14, fontWeight: 700, letterSpacing: '0.04em',
              background: isLoading ? '#9CA3AF' : 'linear-gradient(135deg, #006C4C 0%, #1DB584 100%)',
              color: '#fff', border: 'none', borderRadius: 8,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: '200ms ease-out',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {isLoading ? 'Signing in...' : (
              <>
                Sign In
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Change school */}
        <button
          onClick={() => router.push('/school-select')}
          style={{
            marginTop: 24, background: 'none', border: 'none',
            color: '#9CA3AF', fontSize: 13, cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          Wrong school?{' '}
          <span style={{ color: 'var(--color-primary, #1DB584)', fontWeight: 600 }}>Change school</span>
        </button>

        {/* Footer — desktop only */}
        <div className="login-left-quote" style={{
          position: 'absolute', bottom: 24, right: 40,
          display: 'flex', gap: 20,
        }}>
          <span style={{ fontSize: 12, color: '#D1D5DB', cursor: 'pointer' }}>Privacy</span>
          <span style={{ fontSize: 12, color: '#D1D5DB', cursor: 'pointer' }}>Terms</span>
        </div>
      </div>
    </div>
  );
}
