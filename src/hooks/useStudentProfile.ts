import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { StudentProfile } from '@/types/student';

export function useStudentProfile() {
  const [profile, setProfile]   = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    api.get('/students/me/profile')
      .then((res) => setProfile(res.data.data.student))
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setIsLoading(false));
  }, []);

  return { profile, isLoading, error };
}
