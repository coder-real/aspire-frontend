import React from 'react';
import { School } from '@/types/school';

function getAvatarColor(name: string): string {
  const colors = [
    '#1DB584', '#7C4DFF', '#F59E0B', '#EF4444',
    '#3B82F6', '#EC4899', '#10B981', '#8B5CF6',
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

interface SchoolCardProps {
  school: School;
  onClick?: () => void;
  isSelected?: boolean;
}

export function SchoolCard({ school, onClick, isSelected }: SchoolCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const avatarColor = getAvatarColor(school.name);

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        border: isSelected ? '1.5px solid var(--color-primary, #1DB584)' : '1.5px solid transparent',
        borderRadius: 12,
        background: isSelected ? '#F0FDF9' : hovered ? '#F0FDF9' : '#F7F8FA',
        cursor: 'pointer',
        transition: '200ms ease-out',
        textAlign: 'left',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: avatarColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: 'hidden',
      }}>
        {school.logoUrl ? (
          <img src={school.logoUrl} alt={school.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          school.name.charAt(0)
        )}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E', lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
          {school.name}
        </p>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>
          {school.code}
        </p>
      </div>
      <div style={{ color: isSelected ? 'var(--color-primary, #1DB584)' : '#D1D5DB' }}>
        {isSelected ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        )}
      </div>
    </button>
  );
}
