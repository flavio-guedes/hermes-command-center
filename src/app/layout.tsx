import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hermes Command Center',
  description: 'Observability and real-time execution interface for Hermes agent architecture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-command-bg text-command-text antialiased">
        {children}
      </body>
    </html>
  );
}
