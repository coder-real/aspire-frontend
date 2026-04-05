'use client';
import Link from 'next/link';
import { ProtectedRoute } from '@/lib/guards';
import { useTheme } from '@/hooks/useTheme';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { useStudentResults } from '@/hooks/useStudentResults';
import { ResultsSummaryCard } from '@/components/results/ResultsSummaryCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { config } = useTheme();
  const { profile, isLoading: isProfileLoading, error: profileError } = useStudentProfile();
  const { summary, results, isLoading: isResultsLoading } = useStudentResults();

  if (isProfileLoading || isResultsLoading) {
    return <LoadingSpinner fullscreen />;
  }

  if (profileError || !profile) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{
          textAlign: 'center',
          padding: '32px 24px',
          background: '#FEF2F2',
          borderRadius: 12,
          border: '1px solid #FECACA',
          maxWidth: 340,
        }}>
          <p style={{ fontSize: 13, color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>
            Could not load your profile. Try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const firstName = profile.fullName.trim().split(' ')[0];

  return (
    <div className="page-with-bottom-nav" style={{
      minHeight: '100vh',
      background: 'var(--surface-bg, #F7F8FA)',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* ── Top Header ─────────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(26,26,46,0.06)',
        boxShadow: '0 1px 4px rgba(26,26,46,0.04)',
      }}>
        {config?.logoUrl ? (
          <img src={config.logoUrl} alt="School Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--color-primary-dark, #006C4C), var(--color-primary, #1DB584))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 14,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {config?.name?.charAt(0) ?? 'A'}
          </div>
        )}
        <div>
          <p style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {profile.school.name}
          </p>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>Student Portal</p>
        </div>
      </header>

      <main style={{ maxWidth: 540, margin: '0 auto', padding: '28px 20px 0' }}>

        {/* ── Greeting ────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26,
            fontWeight: 800,
            color: '#1A1A2E',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: 4,
          }}>
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>
            Here is your latest academic overview.
          </p>
        </div>

        {/* ── Profile chip ───────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#FFFFFF',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(26,26,46,0.06)',
          border: '1px solid rgba(26,26,46,0.06)',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary-dark,#006C4C), var(--color-primary,#1DB584))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 16,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            flexShrink: 0,
          }}>
            {firstName.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{profile.fullName}</p>
            <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{profile.regNumber} &bull; {profile.class}</p>
          </div>
        </div>

        {/* ── Summary or empty state ──────────────────────── */}
        {results.length === 0 ? (
          <div style={{
            textAlign: 'center',
            background: '#FFFFFF',
            borderRadius: 14,
            padding: '40px 24px',
            boxShadow: '0 4px 16px -2px rgba(26,26,46,0.06)',
            border: '1px solid rgba(26,26,46,0.06)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
            <p style={{ fontWeight: 600, color: '#6B7280', fontSize: 15, marginBottom: 4 }}>No results yet</p>
            <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
              Your results will appear here once your school administrator uploads them.
            </p>
          </div>
        ) : (
          <>
            <ResultsSummaryCard summary={summary!} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <Link
                href="/results"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--color-primary, #1DB584)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                View all results
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
