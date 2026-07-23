import './globals.css';
import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-garamond'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ydntatenda.com'),
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
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
