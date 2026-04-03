import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { StudentProfile } from '@/types/student';

export function useStudentProfile() {
  const [profile, setProfile]   = useState<StudentProfile | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    api.get<{ data: { student: StudentProfile } }>('/students/me/profile')
      .then((res) => setProfile(res.data.data.student))
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  return { profile, isLoading, error };
}
