import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'Aspire — Cognitive Sanctuary',
  description: 'Track your school results, view your academic profile, and stay on top of your performance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>
        <ThemeProvider>
          <AuthProvider>
            {/* Desktop sidebar — renders only on student routes (hides on /login, /admin, /school-select) */}
            <Sidebar />
            {/* Page content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {children}
            </div>
            {/* Mobile bottom nav — renders only on student routes */}
            <BottomNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
