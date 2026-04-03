'use client';

import { ProtectedRoute } from '@/lib/guards';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { useStudentResults } from '@/hooks/useStudentResults';
import Link from 'next/link';

/* ── Score Ring ───────────────────────────────────────────── */
function ScoreRing({ value, size = 120 }: { value: number; size?: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const progress = (value / 100) * circ;
  const color = value >= 70 ? '#1DB584' : value >= 50 ? '#F59E0B' : '#EF4444';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke={color + '22'} strokeWidth="6" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={`${progress} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="46" textAnchor="middle" fill="#1A1A2E" fontSize="18" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">{value.toFixed(1)}</text>
      <text x="50" y="59" textAnchor="middle" fill="#9CA3AF" fontSize="8.5" fontFamily="Inter, sans-serif">OVERALL AVG</text>
    </svg>
  );
}

/* ── Subject icon ─────────────────────────────────────────── */
function subjectIcon(subject: string) {
  const s = subject.toLowerCase();
  if (s.includes('math') || s.includes('calc'))  return '∑';
  if (s.includes('phys'))                         return '⚛';
  if (s.includes('lit') || s.includes('english')) return 'A͟';
  if (s.includes('comp') || s.includes('prog'))   return '<>';
  return '📖';
}

function gradeColor(total: number) {
  if (total >= 70) return '#1DB584';
  if (total >= 50) return '#F59E0B';
  return '#EF4444';
}

function gradeLabel(total: number) {
  if (total >= 70) return 'A';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  return 'F';
}

/* ── TopBar ──────────────────────────────────────────────── */
function TopBar({ name }: { name?: string }) {
  const now  = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr  = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
      <div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 30, fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {greeting}{name ? `, ${name}` : ''}
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>{dateStr}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><polyline points="12 8 12 12 14 14"/>
          </svg>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, position: 'relative' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #F7F8FA' }} />
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7C4DFF, #1DB584)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
          {name?.charAt(0) ?? 'S'}
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Content ───────────────────────────────────── */
function DashboardContent() {
  const { profile, isLoading: profileLoading } = useStudentProfile();
  const { results, summary, isLoading: resultsLoading } = useStudentResults();

  const firstName = profile?.fullName?.split(' ')[0];
  const recentResults = results.slice(0, 3);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>

      {/* ── Main ────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 28px', minWidth: 0 }}>
        <TopBar name={profileLoading ? undefined : firstName} />

        {/* Sync banner */}
        {!resultsLoading && summary && (
          <div style={{
            background: '#F0FDF9',
            borderRadius: 14,
            padding: '20px 24px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1DB584', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#1DB584', textTransform: 'uppercase', marginBottom: 4 }}>SYSTEM SYNC COMPLETE</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>
                  Your results have been uploaded.
                </p>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
                  Here's your academic summary for the current semester.
                </p>
              </div>
            </div>
            <Link href="/results" style={{
              flexShrink: 0,
              padding: '10px 18px',
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: '#1A1A2E',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 4px rgba(26,26,46,0.06)',
            }}>View Details</Link>
          </div>
        )}

        {/* Stats row */}
        {!resultsLoading && summary && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            {/* Average score */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 4px 12px rgba(26,26,46,0.04)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>Average Score</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>
                  {summary.average.toFixed(1)}
                </span>
                <span style={{ fontSize: 16, color: '#9CA3AF', marginBottom: 4 }}>/ 100</span>
              </div>
              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 99, background: '#E5E7EB', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #006C4C, #1DB584)', width: `${summary.average}%` }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <svg width="14" height="14" fill="none" stroke="#1DB584" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <span style={{ fontSize: 12, color: '#1DB584', fontWeight: 600 }}>Trending up</span>
              </div>
            </div>

            {/* Top subject */}
            {results.length > 0 && (() => {
              const top = [...results].sort((a, b) => b.total - a.total)[0];
              return (
                <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 4px 12px rgba(26,26,46,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: '#9CA3AF', textTransform: 'uppercase' }}>Top Subject</p>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: '#F0FDF9', color: '#1DB584' }}>LEVEL A</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                      {subjectIcon(top.subject)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: '#1A1A2E' }}>{top.subject}</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF' }}>{top.total}/100 Total Score</p>
                    </div>
                  </div>
                  {/* Mini bar chart */}
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 28 }}>
                    {results.slice(0, 6).map((r, i) => (
                      <div key={i} style={{ flex: 1, background: r.id === top.id ? '#1DB584' : '#A7F3D0', borderRadius: 3, height: `${(r.total / 100) * 100}%` }} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Recent results preview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: '#1A1A2E' }}>Recent Results Preview</h2>
            <Link href="/results" style={{ fontSize: 13, color: '#1DB584', fontWeight: 600, textDecoration: 'none' }}>View All Activities</Link>
          </div>

          {resultsLoading ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF' }}>Loading results...</div>
          ) : recentResults.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>No results uploaded yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentResults.map((r) => (
                <div key={r.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(26,26,46,0.04)',
                  marginBottom: 6,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                    {subjectIcon(r.subject)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>{r.subject}</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'JetBrains Mono', monospace" }}>
                      {summary?.term ?? 'Current term'}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: 99,
                    background: gradeColor(r.total) + '18',
                    color: gradeColor(r.total),
                    fontSize: 13, fontWeight: 600,
                  }}>{r.total}/100</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 99,
                    background: '#F7F8FA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13, color: '#1A1A2E',
                  }}>{gradeLabel(r.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel: Intelligence Insights ──────────── */}
      {!resultsLoading && summary && (
        <div style={{
          width: 260,
          borderLeft: 'none',
          background: '#fff',
          padding: '32px 20px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#7C4DFF', textTransform: 'uppercase', marginBottom: 8 }}>Intelligence Insights</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>Performance Overview</h2>
          </div>

          {/* Score Ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <ScoreRing value={summary.average} />
            <p style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}>
              "Keep pushing — your scores are improving each term."
            </p>
          </div>

          {/* Score Breakdown */}
          <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 14, borderBottom: '1.5px solid #F7F8FA', paddingBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A2E', letterSpacing: '0.04em' }}>SCORE BREAKDOWN</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#1A1A2E' }}>Academic Momentum</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1DB584', fontFamily: "'JetBrains Mono', monospace" }}>+4.2%</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, background: '#E5E7EB' }}>
                  <div style={{ height: '100%', width: '74%', background: 'linear-gradient(90deg, #006C4C, #1DB584)', borderRadius: 99 }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#1A1A2E' }}>Cognitive Focus</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7C4DFF', fontFamily: "'JetBrains Mono', monospace" }}>Stable</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, background: '#E5E7EB' }}>
                  <div style={{ height: '100%', width: '60%', background: '#7C4DFF', borderRadius: 99 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 12 }}>Quick Actions</p>
            {[
              { label: 'Download Result PDF', icon: '📄' },
              { label: 'View Full Table',      icon: '📊' },
            ].map(({ label, icon }) => (
              <Link key={label} href="/results" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                background: '#F7F8FA',
                textDecoration: 'none',
                marginBottom: 8,
                transition: '200ms ease-out',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 500 }}>{label}</span>
                </div>
                <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
