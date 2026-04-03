import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Result, ResultsSummary } from '@/types/results';

export function useStudentResults(term?: string, session?: string) {
  const [results, setResults]   = useState<Result[]>([]);
  const [summary, setSummary]   = useState<ResultsSummary | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (term)    params.append('term', term);
    if (session) params.append('session', session);

    const query = params.toString() ? `?${params.toString()}` : '';

    api.get<{ data: { results: Result[]; summary: ResultsSummary } }>(`/students/me/results${query}`)
      .then((res) => {
        setResults(res.data.data.results);
        setSummary(res.data.data.summary);
      })
      .catch(() => setError('Failed to load results.'))
      .finally(() => setLoading(false));
  }, [term, session]);

  return { results, summary, isLoading, error };
}
