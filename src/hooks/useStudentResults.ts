import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ResultsResponse } from '@/types/results';

export function useStudentResults(term?: string, session?: string) {
  const [data, setData]         = useState<ResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (term)    params.set('term', term);
    if (session) params.set('session', session);

    api.get(`/students/me/results?${params.toString()}`)
      .then((res) => setData(res.data.data))
      .catch(() => setError('Failed to load results.'))
      .finally(() => setIsLoading(false));
  }, [term, session]);

  return { results: data?.results ?? [], summary: data?.summary ?? null, isLoading, error };
}
