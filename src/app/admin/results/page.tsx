'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { getErrorMessage } from '@/lib/errors';
import { useTheme } from '@/hooks/useTheme';
import api from '@/lib/api';

interface StudentResult { id: string; fullName: string; regNumber: string; class: string; }
interface ResultRow { subject: string; ca: string; exam: string; }

export default function UploadResultsPage() {
  const { config } = useTheme();
  const termOptions = config?.layoutType === 'secondary'
    ? ['Semester 1', 'Semester 2']
    : ['First Term', 'Second Term', 'Third Term'];

  // Stage 1
  const [searchReg, setSearchReg] = useState('');
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Stage 2
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [term, setTerm] = useState(termOptions[0]);
  const [session, setSession] = useState('2024/2025');
  const [rows, setRows] = useState<ResultRow[]>([{ subject: '', ca: '', exam: '' }]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ── Stage 1: Search ──────────────────────────────────────
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchError('');
    setStudents([]);
    try {
      const res = await api.get(`/admin/students?search=${encodeURIComponent(searchReg)}&limit=5`);
      const list: StudentResult[] = res.data.data?.students ?? res.data.data ?? [];
      setStudents(list);
      if (list.length === 0) setSearchError('No students found with that registration number.');
    } catch {
      setSearchError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // ── Stage 2: Upload ──────────────────────────────────────
  const updateRow = (i: number, field: keyof ResultRow, value: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  };

  const removeRow = (i: number) => {
    if (rows.length > 1) setRows(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    const parsed = rows.map(r => ({
      subject: r.subject.trim(),
      ca: Number(r.ca),
      exam: Number(r.exam),
    }));

    if (parsed.some(r => !r.subject)) return setUploadError('Every row must have a subject name.');
    if (parsed.some(r => r.ca < 0 || r.ca > 40)) return setUploadError('CA must be between 0 and 40.');
    if (parsed.some(r => r.exam < 0 || r.exam > 60)) return setUploadError('Exam must be between 0 and 60.');

    setIsUploading(true);
    try {
      await api.post('/admin/results', {
        studentId: selectedStudent!.id,
        term, session,
        results: parsed,
      });
      setSuccessMsg(`Results uploaded for ${selectedStudent!.fullName}. ${parsed.length} subject${parsed.length > 1 ? 's' : ''} saved.`);
    } catch (err: any) {
      const code = err.response?.data?.error?.code || 'INTERNAL_ERROR';
      setUploadError(getErrorMessage(code));
    } finally {
      setIsUploading(false);
    }
  };

  const resetAll = () => {
    setSuccessMsg('');
    setSelectedStudent(null);
    setStudents([]);
    setSearchReg('');
    setRows([{ subject: '', ca: '', exam: '' }]);
    setUploadError('');
  };

  const card: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: 14,
    boxShadow: '0 4px 16px -2px rgba(26,26,46,0.08)',
    border: '1px solid rgba(26,26,46,0.06)',
    padding: '28px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.07em',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Inter, sans-serif',
  };

  // ── SUCCESS STATE ────────────────────────────────────────
  if (successMsg) return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Upload Results
        </h1>
      </div>
      <div style={{ ...card, maxWidth: 480, textAlign: 'center', padding: '40px 28px' }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: '#F0FDF9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="30" height="30" fill="none" stroke="#1DB584" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>
          Upload Successful
        </h3>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>{successMsg}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button onClick={() => { setSuccessMsg(''); setRows([{ subject: '', ca: '', exam: '' }]); setUploadError(''); }}>
            Upload more for {selectedStudent?.fullName.split(' ')[0]}
          </Button>
          <Button variant="ghost" onClick={resetAll}>Find another student</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Upload Results
        </h1>
        <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
          {!selectedStudent ? 'Search for a student by registration number to begin.' : 'Enter the term scores for each subject below.'}
        </p>
      </div>

      {/* ── STAGE 1: Student Search ────────────────────────── */}
      {!selectedStudent ? (
        <div style={{ ...card, maxWidth: 480 }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Registration Number"
                required
                placeholder="e.g. UNI/2024/001"
                value={searchReg}
                onChange={(e) => setSearchReg(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <Button type="submit" isLoading={isSearching} size="sm" style={{ width: 'auto', padding: '12px 20px' }}>
                {!isSearching && (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
                Search
              </Button>
            </div>
          </form>

          {searchError && (
            <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: 13, color: '#EF4444', marginBottom: 16 }}>
              {searchError}
            </div>
          )}

          {students.length > 0 && (
            <div>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Select a student</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px',
                      border: '1.5px solid transparent',
                      borderRadius: 10,
                      background: '#F7F8FA',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: '200ms ease-out',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#F0FDF9';
                      (e.currentTarget as HTMLButtonElement).style.border = '1.5px solid rgba(29,181,132,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#F7F8FA';
                      (e.currentTarget as HTMLButtonElement).style.border = '1.5px solid transparent';
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: 'linear-gradient(135deg, #006C4C, #1DB584)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 14,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      flexShrink: 0,
                    }}>
                      {s.fullName.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E', lineHeight: 1.3 }}>{s.fullName}</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{s.regNumber} &bull; {s.class}</p>
                    </div>
                    <svg width="14" height="14" fill="none" stroke="#D1D5DB" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── STAGE 2: Enter Results ──────────────────────── */
        <form onSubmit={handleUpload}>
          {/* Selected student chip */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#F0FDF9',
            border: '1.5px solid rgba(29,181,132,0.3)',
            borderRadius: 10,
            padding: '14px 16px',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'linear-gradient(135deg, #006C4C, #1DB584)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                {selectedStudent.fullName.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{selectedStudent.fullName}</p>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 1 }}>{selectedStudent.regNumber} &bull; {selectedStudent.class}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: 'var(--color-primary, #1DB584)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Change
            </button>
          </div>

          <div style={{ ...card, marginBottom: 16 }}>
            {/* Term + Session row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={labelStyle}>Term</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: 14,
                    border: 'none', borderBottom: '1.5px solid #E5E7EB',
                    borderRadius: 0, outline: 'none', background: 'transparent',
                    color: '#1A1A2E', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                  }}
                >
                  {termOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <Input label="Session" value={session} onChange={(e) => setSession(e.target.value)} required />
            </div>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 36px', gap: 10, marginBottom: 10 }}>
              <p style={labelStyle}>Subject</p>
              <p style={{ ...labelStyle, textAlign: 'center' }}>CA /40</p>
              <p style={{ ...labelStyle, textAlign: 'center' }}>Exam /60</p>
              <div />
            </div>

            {/* Result rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {rows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 36px', gap: 10, alignItems: 'center' }}>
                  <input
                    value={row.subject}
                    onChange={(e) => updateRow(i, 'subject', e.target.value)}
                    placeholder="e.g. Mathematics"
                    required
                    style={{
                      width: '100%', padding: '10px 12px', fontSize: 13,
                      border: '1.5px solid #E5E7EB', borderRadius: 8,
                      outline: 'none', background: '#FAFAFA',
                      color: '#1A1A2E', fontFamily: 'Inter, sans-serif',
                      transition: '200ms ease-out',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary, #1DB584)')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                  <input
                    type="number" min={0} max={40} value={row.ca}
                    onChange={(e) => updateRow(i, 'ca', e.target.value)}
                    placeholder="0"
                    required
                    style={{
                      width: '100%', padding: '10px 8px', fontSize: 13,
                      border: '1.5px solid #E5E7EB', borderRadius: 8,
                      outline: 'none', background: '#FAFAFA',
                      color: '#1A1A2E', fontFamily: 'Inter, sans-serif',
                      textAlign: 'center', transition: '200ms ease-out',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary, #1DB584)')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                  <input
                    type="number" min={0} max={60} value={row.exam}
                    onChange={(e) => updateRow(i, 'exam', e.target.value)}
                    placeholder="0"
                    required
                    style={{
                      width: '100%', padding: '10px 8px', fontSize: 13,
                      border: '1.5px solid #E5E7EB', borderRadius: 8,
                      outline: 'none', background: '#FAFAFA',
                      color: '#1A1A2E', fontFamily: 'Inter, sans-serif',
                      textAlign: 'center', transition: '200ms ease-out',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary, #1DB584)')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    disabled={rows.length === 1}
                    style={{
                      width: 32, height: 32, borderRadius: 6,
                      border: '1px solid #E5E7EB',
                      background: '#FAFAFA',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: rows.length === 1 ? 'not-allowed' : 'pointer',
                      color: rows.length === 1 ? '#D1D5DB' : '#9CA3AF',
                      transition: '200ms ease-out',
                    }}
                    onMouseEnter={(e) => { if (rows.length > 1) (e.currentTarget as HTMLButtonElement).style.color = '#EF4444'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = rows.length === 1 ? '#D1D5DB' : '#9CA3AF'; }}
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setRows(prev => [...prev, { subject: '', ca: '', exam: '' }])}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none',
                fontSize: 13, fontWeight: 600, color: 'var(--color-primary, #1DB584)',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0,
              }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add subject
            </button>
          </div>

          {uploadError && (
            <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: 13, color: '#EF4444', marginBottom: 16 }}>
              {uploadError}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: 200 }}>
              <Button type="submit" isLoading={isUploading}>
                {!isUploading && (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                  </svg>
                )}
                Upload Results
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
