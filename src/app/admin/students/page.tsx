'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { getErrorMessage } from '@/lib/errors';
import api from '@/lib/api';

const EMPTY_FORM = { fullName: '', regNumber: '', class: '', email: '', password: '' };

export default function AddStudentPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const set = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await api.post('/admin/students', form);
      setSuccessMsg(`Student ${form.fullName} added successfully.`);
      setForm(EMPTY_FORM);
    } catch (err: any) {
      const code = err.response?.data?.error?.code || 'INTERNAL_ERROR';
      setError(getErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 24, fontWeight: 800, color: '#1A1A2E',
          letterSpacing: '-0.02em', marginBottom: 4,
        }}>
          Add New Student
        </h1>
        <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
          Fill in the details below to enrol a student into this school.
        </p>
      </div>

      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        boxShadow: '0 4px 16px -2px rgba(26,26,46,0.08)',
        border: '1px solid rgba(26,26,46,0.06)',
        padding: '28px 28px',
        maxWidth: 480,
      }}>
        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#F0FDF9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="28" height="28" fill="none" stroke="#1DB584" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17, fontWeight: 700, color: '#1A1A2E', marginBottom: 6,
            }}>
              Student Added
            </h3>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24, lineHeight: 1.5 }}>
              {successMsg}
            </p>
            <Button onClick={() => setSuccessMsg('')}>Add another student</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input label="Full Name" required value={form.fullName} onChange={set('fullName')} placeholder="e.g. Amaka Okonkwo" />
            <Input label="Registration Number" required value={form.regNumber} onChange={set('regNumber')} placeholder="e.g. UNI/2024/001" />
            <Input label="Class" required value={form.class} onChange={set('class')} placeholder="e.g. SS3A or 200 Level" />
            <Input label="Email Address" type="email" required value={form.email} onChange={set('email')} placeholder="student@school.edu" />
            <Input label="Password" type="password" required minLength={8} value={form.password} onChange={set('password')} placeholder="Min. 8 characters" />

            {error && (
              <div style={{
                padding: '10px 14px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 8,
                fontSize: 13,
                color: '#EF4444',
                marginBottom: 18,
                fontFamily: 'Inter, sans-serif',
              }}>
                {error}
              </div>
            )}

            <Button type="submit" isLoading={isLoading}>
              {!isLoading && (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  Add Student
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
