'use client';
import { useState } from 'react';
import { ProtectedRoute } from '@/lib/guards';
import { useTheme } from '@/hooks/useTheme';
import { useStudentResults } from '@/hooks/useStudentResults';
import { ResultsSummaryCard } from '@/components/results/ResultsSummaryCard';
import { ResultsTable } from '@/components/results/ResultsTable';

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <ResultsContent />
    </ProtectedRoute>
  );
}

function ResultsContent() {
  const { config } = useTheme();

  const terms = config?.layoutType === 'secondary'
    ? ['Semester 1', 'Semester 2']
    : ['First Term', 'Second Term', 'Third Term'];

  const [activeTerm, setActiveTerm] = useState(terms[0]);
  const { results, summary, isLoading } = useStudentResults(activeTerm);

  return (
    <div className="page-with-bottom-nav" style={{
      minHeight: '100vh',
      background: 'var(--surface-bg, #F7F8FA)',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <header style={{
        padding: '20px 20px 0',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(26,26,46,0.06)',
        boxShadow: '0 1px 4px rgba(26,26,46,0.04)',
      }}>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          color: '#1A1A2E',
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          My Results
        </h1>

        {/* ── Term Tabs ───────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 4 }}>
          {terms.map((term) => {
            const isActive = activeTerm === term;
            return (
              <button
                key={term}
                onClick={() => setActiveTerm(term)}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: 'Inter, sans-serif',
                  border: 'none',
                  borderRadius: 0,
                  borderBottom: isActive ? '2px solid var(--color-primary, #1DB584)' : '2px solid transparent',
                  background: 'transparent',
                  color: isActive ? 'var(--color-primary, #1DB584)' : '#9CA3AF',
                  cursor: 'pointer',
                  transition: '200ms ease-out',
                  whiteSpace: 'nowrap',
                  marginBottom: -1,
                }}
              >
                {term}
              </button>
            );
          })}
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px' }}>
        {summary && <ResultsSummaryCard summary={summary} />}
        <ResultsTable results={results} summary={summary} isLoading={isLoading} />
      </main>
    </div>
  );
}
