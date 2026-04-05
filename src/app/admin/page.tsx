'use client';
import Link from 'next/link';

interface ActionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
}

function ActionCard({ href, icon, title, description, accentColor, accentBg }: ActionCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 14,
          padding: '24px',
          boxShadow: '0 4px 16px -2px rgba(26,26,46,0.08)',
          border: '1px solid rgba(26,26,46,0.06)',
          cursor: 'pointer',
          transition: '200ms ease-out',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px -4px rgba(26,26,46,0.14)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px -2px rgba(26,26,46,0.08)';
        }}
      >
        <div style={{
          width: 44, height: 44,
          borderRadius: 12,
          background: accentBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
          color: accentColor,
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 16, fontWeight: 700, color: '#1A1A2E',
          marginBottom: 6, letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
          {description}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          marginTop: 16, color: accentColor,
          fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif',
        }}>
          Get started
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function AdminOverviewPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 24, fontWeight: 800, color: '#1A1A2E',
          letterSpacing: '-0.02em', marginBottom: 4,
        }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
          Manage your school's students and academic records from here.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <ActionCard
          href="/admin/students"
          accentColor="#1DB584"
          accentBg="#F0FDF9"
          title="Add Student"
          description="Enroll a new student into this school with their credentials and class assignment."
          icon={
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          }
        />
        <ActionCard
          href="/admin/results"
          accentColor="#7C4DFF"
          accentBg="#EFECFF"
          title="Upload Results"
          description="Record final term scores and exam results for any student in your school."
          icon={
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}
