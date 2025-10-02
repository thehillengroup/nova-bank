import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { Navigation } from '../components/navigation';
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
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className="text-xs font-semibold uppercase tracking-[0.4em] text-white"
                >
                  Nova Bank
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-primary/40 hover:text-primary md:hidden"
                >
                  Get help
                </Link>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Navigation />
                <Link
                  href="/support"
                  className="hidden items-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-primary/40 hover:text-primary md:inline-flex"
                >
                  Get help
                </Link>
              </div>
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
