import { ResultsSummary } from '@/types/results';

interface Props {
  summary: ResultsSummary;
}

export function ResultsSummaryCard({ summary }: Props) {
  return (
    <div style={{
      background: 'var(--color-primary)',
      color: '#fff',
      borderRadius: 12,
      padding: '20px',
      marginBottom: 24,
    }}>
      <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 4px' }}>
        {summary.term} · {summary.session}
      </p>
      <p style={{ fontSize: 36, fontWeight: 700, margin: '0 0 16px' }}>
        {summary.average.toFixed(1)}
        <span style={{ fontSize: 16, fontWeight: 400, opacity: 0.8 }}> avg</span>
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>Highest</p>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{summary.highest}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>Lowest</p>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{summary.lowest}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>Subjects</p>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{summary.totalSubjects}</p>
        </div>
      </div>
    </div>
  );
}
