import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Nova Mobile Banking',
  description:
    'A concept banking interface showcasing account insights, cards, and spending analytics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-transparent text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
