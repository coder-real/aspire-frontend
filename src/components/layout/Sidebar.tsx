'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Results',
    href: '/results',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 1.41 1.41L19.07 7.76a7.5 7.5 0 0 0-1.06-.88l-.61-2.27.06-.06.44-.23.58-.2.59-.23Zm0 14.14a10 10 0 0 0 1.41-1.41l-1.41-1.42a7.5 7.5 0 0 1-1.06.88"/>
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { config } = useTheme();

  const hide = ['/', '/school-select', '/login'].includes(pathname) || pathname.startsWith('/admin');
  if (hide) return null;

  return (
    <aside className="desktop-only" style={{
      width: 200,
      minHeight: '100vh',
      background: '#FFFFFF',
      flexDirection: 'column',
      padding: '24px 16px',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{ paddingLeft: 8, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #1DB584, #006C4C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 15, color: '#1DB584', letterSpacing: '-0.01em', lineHeight: 1 }}>Aspire</p>
            <p style={{ fontSize: 9, color: '#9CA3AF', letterSpacing: '0.06em', lineHeight: 1, marginTop: 2 }}>COGNITIVE SANCTUARY</p>
          </div>
        </div>
        {config && (
          <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10, paddingLeft: 2 }}>{config.name}</p>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ label, href, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? '#1A1A2E' : '#6B7280',
                background: active ? '#F7F8FA' : 'transparent',
                transition: '200ms ease-out',
              }}
            >
              <span style={{ color: active ? '#1DB584' : '#9CA3AF' }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10, border: 'none',
          background: 'transparent', cursor: 'pointer',
          fontSize: 14, color: '#6B7280', textAlign: 'left',
          transition: '200ms ease-out',
        }}>
          <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help
        </button>

        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10, border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontSize: 14, color: '#6B7280', textAlign: 'left',
            transition: '200ms ease-out',
          }}
        >
          <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>

        {/* New Analysis CTA */}
        <button style={{
          marginTop: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px',
          borderRadius: 10,
          border: 'none',
          background: 'linear-gradient(135deg, #006C4C 0%, #1DB584 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 4px 14px rgba(29,181,132,0.3)',
        }}>
          <span style={{ fontSize: 16 }}>+</span> NEW ANALYSIS
        </button>
      </div>
    </aside>
  );
}
