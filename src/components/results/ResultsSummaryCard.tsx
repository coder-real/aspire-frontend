import React from 'react';
import { ResultsSummary } from '@/types/results';

interface StatProps {
  label: string;
  value: number | string;
  accent?: boolean;
}

function Stat({ label, value, accent }: StatProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: '16px',
      background: accent ? 'linear-gradient(135deg, var(--color-primary-dark, #006C4C) 0%, var(--color-primary, #1DB584) 100%)' : '#F7F8FA',
      borderRadius: 10,
    }}>
      <p style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: accent ? 'rgba(255,255,255,0.75)' : '#9CA3AF',
        fontFamily: 'Inter, sans-serif',
      }}>
        {label}
      </p>
      <p style={{
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: accent ? '#FFFFFF' : '#1A1A2E',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.1,
      }}>
        {value}
      </p>
    </div>
  );
}

export function ResultsSummaryCard({ summary }: { summary: ResultsSummary }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 14,
      boxShadow: '0 4px 16px -2px rgba(26,26,46,0.08)',
      border: '1px solid rgba(26,26,46,0.06)',
      padding: 16,
      marginBottom: 16,
    }}>
      <p style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        fontFamily: 'Inter, sans-serif',
        marginBottom: 12,
      }}>
        Performance Summary
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Stat label="Average" value={summary.average} accent />
        <Stat label="Subjects" value={summary.totalSubjects} />
        <Stat label="Highest" value={summary.highest} />
        <Stat label="Lowest" value={summary.lowest} />
      </div>
    </div>
  );
}
