'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home',    href: '/dashboard' },
  { label: 'Results', href: '/results'   },
];

export function BottomNav() {
  const pathname = usePathname();

  const hide = ['/', '/school-select', '/login'].includes(pathname) ||
    pathname.startsWith('/admin');

  if (hide) return null;

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
    }}>
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? 'var(--color-primary)' : '#9ca3af',
              textDecoration: 'none',
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
