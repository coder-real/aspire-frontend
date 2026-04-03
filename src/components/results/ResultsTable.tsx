import { Result } from '@/types/results';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface Props {
  results: Result[];
  isLoading: boolean;
}

function gradeColor(total: number): string {
  if (total >= 70) return '#16a34a';
  if (total >= 50) return '#d97706';
  return '#dc2626';
}

export function ResultsTable({ results, isLoading }: Props) {
  if (isLoading) return <LoadingSpinner />;

  if (results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
        <p>No results have been uploaded yet.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            {['Subject', 'CA', 'Exam', 'Total', 'Grade'].map((h) => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>{r.subject}</td>
              <td style={{ padding: '12px', color: '#6b7280' }}>{r.ca}</td>
              <td style={{ padding: '12px', color: '#6b7280' }}>{r.exam}</td>
              <td style={{ padding: '12px', fontWeight: 600, color: gradeColor(r.total) }}>{r.total}</td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  background: gradeColor(r.total) + '20',
                  color: gradeColor(r.total),
                }}>
                  {r.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #e5e7eb', background: '#f9fafb' }}>
            <td style={{ padding: '10px 12px', fontWeight: 600 }}>Average</td>
            <td colSpan={2} />
            <td style={{ padding: '10px 12px', fontWeight: 700 }}>
              {(results.reduce((a, b) => a + b.total, 0) / results.length).toFixed(1)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
