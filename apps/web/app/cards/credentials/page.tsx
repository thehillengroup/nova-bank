import Link from 'next/link';

import { cards } from '@repo/mock-data';
import { formatCurrency } from '../../../lib/currency';

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/transactions', label: 'Transactions' },
  { href: '/cards/reports', label: 'Reports' },
];

export default function CardsCredentialsHub() {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-5xl">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Card management</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Manage credentials</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">
            Update cardholder info, shipping addresses, and delivery preferences across every active card.
          </p>
          <nav aria-label="Card navigation" className="mt-6">
            <ul className="flex flex-wrap items-center gap-3 text-xs">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                      item.href === '/cards/credentials'
                        ? 'border border-primary/40 bg-primary/10 text-primary'
                        : 'border border-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm text-zinc-300">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">Card</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Last four</th>
                <th className="px-4 py-3 text-right">Limit</th>
                <th className="px-4 py-3 text-right">Balance</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cards.map((card) => (
                <tr key={card.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{card.label}</td>
                  <td className="px-4 py-3">{card.brand}</td>
                  <td className="px-4 py-3">**** {card.last4}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(card.creditLimit)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(card.balance)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/cards/${card.id}/credentials`} className="text-xs text-primary hover:underline">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
