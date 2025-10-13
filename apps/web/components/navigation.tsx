'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/payments', label: 'Payments' },
  { href: '/cards', label: 'Cards' },
  { href: '/insights', label: 'Insights' },
  { href: '/support', label: 'Support' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const buttonLabel = isOpen ? 'Close navigation menu' : 'Open navigation menu';

  return (
    <nav className="w-full text-sm md:w-auto" aria-label="Primary navigation">
      <div className="flex items-center justify-between gap-3 md:hidden">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Explore</span>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-pressed={isOpen}
          aria-label={buttonLabel}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>
      <div
        id="primary-navigation"
        className={`${isOpen ? 'mt-3 flex' : 'mt-3 hidden'} flex-col gap-1 md:mt-0 md:flex md:flex-row md:items-center md:gap-1`}
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          const baseClasses =
            'rounded-full px-3 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
          const stateClasses = isActive
            ? 'bg-white/10 text-white'
            : 'text-zinc-400 hover:bg-white/5 hover:text-white';

          return (
            <Link
              key={href}
              href={href}
              className={`${baseClasses} ${stateClasses}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
