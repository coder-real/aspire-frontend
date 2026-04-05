'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminRoute } from '@/lib/guards';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
  { label: 'Overview', href: '/admin' },
  { label: 'Students', href: '/admin/students' },
  { label: 'Results',  href: '/admin/results'  },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const { config } = useTheme();
  const pathname = usePathname();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-bg, #F7F8FA)', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Top Bar ─────────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        background: 'linear-gradient(135deg, var(--color-primary-dark, #006C4C) 0%, var(--color-primary, #1DB584) 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em',
            }}>A</span>
          </div>
          <div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Admin Panel
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              {config?.name ?? 'Aspire School'}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 7,
            padding: '6px 12px',
            fontSize: 12, fontWeight: 600, color: '#fff',
            cursor: 'pointer',
            transition: '200ms ease-out',
          }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </header>

      {/* ── Tab Navigation ──────────────────────────────── */}
      <nav style={{
        display: 'flex',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(26,26,46,0.08)',
        padding: '0 24px',
        boxShadow: '0 1px 4px rgba(26,26,46,0.04)',
      }}>
        {NAV_LINKS.map((link) => {
          const isActive = link.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '14px 16px',
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-primary, #1DB584)' : '#6B7280',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--color-primary, #1DB584)' : '2px solid transparent',
                transition: '200ms ease-out',
                whiteSpace: 'nowrap',
                marginBottom: -1,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '28px 20px' }}>
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <AdminShell>{children}</AdminShell>
    </AdminRoute>
  );
}
