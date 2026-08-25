import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'Nobel Multiple College | Bardibas, Mahottari, Nepal',
  description: 'Leading Higher Secondary and Undergraduate Academic Institution in Bardibas, Mahottari, Madhesh Province, Nepal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
