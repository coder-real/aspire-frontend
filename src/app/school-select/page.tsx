'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';
import { School } from '@/types/school';

function getAvatarColor(name: string): string {
  const colors = [
    '#1DB584', '#7C4DFF', '#F59E0B', '#EF4444',
    '#3B82F6', '#EC4899', '#10B981', '#8B5CF6',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export default function SchoolSelectPage() {
  const router = useRouter();
  const { applyTheme } = useTheme();

  const [schools, setSchools]     = useState<School[]>([]);
  const [search, setSearch]       = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState('');
  const [selected, setSelected]   = useState<string | null>(null);

  useEffect(() => {
    api.get<{ data: { schools: School[] } }>('/schools')
      .then((res) => setSchools(res.data.data.schools))
      .catch(() => setError('Failed to load schools. Please refresh.'))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSelect(school: School) {
    setSelected(school.id);
    try {
      await applyTheme(school.code);
      router.push('/login');
    } catch {
      setError('Failed to load school config. Please try again.');
      setSelected(null);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0FDF9 0%, #F7F8FA 40%, #EFECFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 8 }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 36,
          fontWeight: 800,
          color: '#1DB584',
          letterSpacing: '-0.02em',
        }}>
          Aspire
        </span>
      </div>

      {/* Heading */}
      <h1 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 28,
        fontWeight: 700,
        color: '#1A1A2E',
        marginBottom: 8,
        letterSpacing: '-0.01em',
      }}>
        Select your school
      </h1>
      <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32 }}>
        Your dashboard adapts to your school's identity
      </p>

      {/* Card container */}
      <div style={{
        width: '100%',
        maxWidth: 540,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 12px 32px -4px rgba(26, 26, 46, 0.08)',
        overflow: 'hidden',
        padding: '20px',
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#F7F8FA',
          borderRadius: 10,
          padding: '10px 14px',
          marginBottom: 16,
        }}>
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search by school name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              color: '#1A1A2E',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8 }}>{error}</p>
        )}

        {/* School list */}
        {isLoading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
            Loading schools...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
            No schools found.
          </div>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((school) => {
              const isSelected = selected === school.id;
              const avatarColor = getAvatarColor(school.name);
              return (
                <li key={school.id}>
                  <button
                    onClick={() => handleSelect(school)}
                    disabled={!!selected}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      border: isSelected ? '1.5px solid #1DB584' : '1.5px solid transparent',
                      borderRadius: 12,
                      background: isSelected ? '#F0FDF9' : '#F7F8FA',
                      cursor: selected ? 'default' : 'pointer',
                      transition: '200ms ease-out',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) {
                        (e.currentTarget as HTMLButtonElement).style.background = '#F0FDF9';
                        (e.currentTarget as HTMLButtonElement).style.border = '1.5px solid rgba(29,181,132,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.background = '#F7F8FA';
                        (e.currentTarget as HTMLButtonElement).style.border = '1.5px solid transparent';
                      }
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: avatarColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 16,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      {school.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E', lineHeight: 1.3 }}>{school.name}</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{school.code}</p>
                    </div>

                    {/* Check or chevron */}
                    {isSelected ? (
                      <div style={{ color: '#1DB584' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                      </div>
                    ) : (
                      <div style={{ color: '#D1D5DB' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <p style={{ marginTop: 28, fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>
        Don't see your school?{' '}
        <span style={{ color: '#1DB584', cursor: 'pointer', fontWeight: 500 }}>
          Contact your administrator.
        </span>
      </p>
    </main>
  );
}
