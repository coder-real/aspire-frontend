'use client';
import React from 'react';
import { Result, ResultsSummary } from '@/types/results';

interface ResultsTableProps {
  results: Result[];
  summary: ResultsSummary | null;
  isLoading: boolean;
}

function gradeColor(total: number): string {
  if (total >= 70) return '#059669';
  if (total >= 50) return '#D97706';
  return '#DC2626';
}

function gradeBadgeStyle(total: number): React.CSSProperties {
  const color = gradeColor(total);
  const bgMap: Record<string, string> = {
    '#059669': '#ECFDF5',
    '#D97706': '#FFFBEB',
    '#DC2626': '#FEF2F2',
  };
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color,
    background: bgMap[color],
  };
}

export function ResultsTable({ results, summary, isLoading }: ResultsTableProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            height: 48,
            borderRadius: 8,
            background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        ))}
        <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 24px',
        color: '#9CA3AF',
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📂</div>
        <p style={{ fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>No results yet</p>
        <p style={{ fontSize: 13 }}>No results have been uploaded for this term.</p>
      </div>
    );
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    borderBottom: '1px solid #F3F4F6',
    fontFamily: 'Inter, sans-serif',
  };

  const tdStyle: React.CSSProperties = {
    padding: '14px 12px',
    fontSize: 14,
    color: '#1A1A2E',
    borderBottom: '1px solid #F9FAFB',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(26,26,46,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 380 }}>
        <thead style={{ background: '#FAFAFA' }}>
          <tr>
            <th style={thStyle}>Subject</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>CA</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Exam</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Total</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{r.subject}</td>
              <td style={{ ...tdStyle, textAlign: 'center', color: '#6B7280' }}>{r.ca}</td>
              <td style={{ ...tdStyle, textAlign: 'center', color: '#6B7280' }}>{r.exam}</td>
              <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 700, color: gradeColor(r.total) }}>{r.total}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <span style={gradeBadgeStyle(r.total)}>{r.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
        {summary && (
          <tfoot>
            <tr style={{ background: '#F7F8FA', borderTop: '2px solid #E5E7EB' }}>
              <td style={{ ...tdStyle, fontWeight: 700, color: '#6B7280', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Average
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }} />
              <td style={{ ...tdStyle, textAlign: 'center' }} />
              <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 800, fontSize: 16, color: 'var(--color-primary, #1DB584)' }}>
                {summary.average}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }} />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
