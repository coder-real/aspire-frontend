'use client';

import { ProtectedRoute } from '@/lib/guards';
import { useStudentResults } from '@/hooks/useStudentResults';
import { useStudentProfile } from '@/hooks/useStudentProfile';

function gradeColor(total: number) {
  if (total >= 70) return '#1DB584';
  if (total >= 50) return '#F59E0B';
  return '#EF4444';
}

function ResultsContent() {
  const { results, summary, isLoading, error } = useStudentResults();
  const { profile } = useStudentProfile();

  const avg = results.length > 0
    ? results.reduce((a, b) => a + b.total, 0) / results.length
    : 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>

      {/* ── Main ─────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 28px', minWidth: 0 }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 6 }}>
          {profile?.class ?? 'Student'} ›{' '}
          <span style={{ color: '#1A1A2E', fontWeight: 500 }}>My Results</span>
        </p>

        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A2E',
          letterSpacing: '-0.02em', marginBottom: 4,
        }}>
          Academic Results
        </h1>
        {summary && (
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 28 }}>
            {summary.term} · {summary.session}
          </p>
        )}

        {error && (
          <div style={{ padding: '12px 16px', background: '#FEF2F2', borderRadius: 10, color: '#EF4444', fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Summary cards */}
        {!isLoading && summary && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
            {[
              { label: 'Average', value: summary.average.toFixed(1), sub: '/ 100', color: '#1DB584' },
              { label: 'Highest', value: summary.highest,            sub: 'Best score', color: '#7C4DFF' },
              { label: 'Lowest',  value: summary.lowest,             sub: 'Needs focus', color: '#F59E0B' },
            ].map(({ label, value, sub, color }) => (
              <div key={label} style={{
                background: '#fff', borderRadius: 14,
                padding: '18px 20px',
                boxShadow: '0 4px 12px rgba(26,26,46,0.04)',
              }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{sub}</p>
              </div>
            ))}
          </div>
        )}

        {/* Results table */}
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 12px rgba(26,26,46,0.04)' }}>
          {isLoading ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{
                width: 32, height: 32,
                border: '3px solid #E5E7EB',
                borderTop: '3px solid #1DB584',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto',
              }}/>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
              No results uploaded yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F7F8FA' }}>
                  {['Subject', 'C.A', 'Exam', 'Total', 'Grade'].map((h) => (
                    <th key={h} style={{
                      padding: '14px 18px',
                      textAlign: 'left',
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: '0.07em',
                      color: '#9CA3AF',
                      textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.id} style={{ borderTop: i === 0 ? 'none' : '1px solid #F7F8FA' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1A1A2E' }}>{r.subject}</td>
                    <td style={{ padding: '14px 18px', color: '#6B7280', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{r.ca}</td>
                    <td style={{ padding: '14px 18px', color: '#6B7280', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{r.exam}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700, fontSize: 14,
                        color: gradeColor(r.total),
                      }}>{r.total}</span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 30, height: 30, borderRadius: '50%',
                        background: gradeColor(r.total) + '18',
                        color: gradeColor(r.total),
                        fontWeight: 700, fontSize: 13,
                      }}>{r.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #F7F8FA', background: '#FAFAFA' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1A1A2E', fontSize: 13 }}>Average</td>
                  <td colSpan={2} />
                  <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#1DB584' }}>{avg.toFixed(1)}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>

      {/* ── Right panel ──────────────────────────────────── */}
      <div style={{ width: 240, background: '#fff', padding: '32px 18px', flexShrink: 0 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#7C4DFF', textTransform: 'uppercase', marginBottom: 16 }}>Quick Actions</p>
        {[
          { label: 'Download Result PDF', icon: '📄' },
          { label: 'Print Transcript',    icon: '🖨️' },
          { label: 'Share Results',       icon: '🔗' },
        ].map(({ label, icon }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '12px 14px',
            borderRadius: 10, border: 'none',
            background: '#F7F8FA', cursor: 'pointer',
            marginBottom: 8, textAlign: 'left',
            transition: '200ms ease-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{icon}</span>
              <span style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 500 }}>{label}</span>
            </div>
            <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <ResultsContent />
    </ProtectedRoute>
  );
}
