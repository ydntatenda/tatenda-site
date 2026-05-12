import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://tatenda.com'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Tatenda Ncube-Muchandibaya',
    template: '%s | Tatenda Ncube-Muchandibaya'
  },
  description:
    'CEO and co-founder of Lattanye. Building AI-native agentic infrastructure across Africa.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
