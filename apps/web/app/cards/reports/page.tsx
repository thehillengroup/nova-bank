import Link from 'next/link';

import { cards, recentTransactions } from '@repo/mock-data';
import { formatCurrency } from '../../../lib/currency';

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/transactions', label: 'Transactions' },
  { href: '/cards/reports', label: 'Reports' },
];

const mockMonthly = [
  { id: '2025-09', period: 'September 2025', spend: 6124.22, credits: 1840.5, net: 4283.72 },
  { id: '2025-08', period: 'August 2025', spend: 5388.1, credits: 1620.34, net: 3767.76 },
  { id: '2025-07', period: 'July 2025', spend: 5682.94, credits: 1955.1, net: 3727.84 },
];

export default function CardsReportsPage() {
  const totalSpend = recentTransactions
    .filter((tx) => tx.direction === 'debit')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const totalCredits = recentTransactions
    .filter((tx) => tx.direction === 'credit')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const averageTicket =
    recentTransactions.length === 0
      ? 0
      : recentTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0) / recentTransactions.length;

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Card management</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Reports & analytics</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Understand card program performance with spend trends, credit inflows, and month-over-month movement.
          </p>
          <nav aria-label="Card navigation" className="mt-6">
            <ul className="flex flex-wrap items-center gap-3 text-xs">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                      item.href === '/cards/reports' ? 'border border-primary/40 bg-primary/10 text-primary' : 'border border-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex gap-3">
          <Link
            href="/cards/issue"
            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80"
          >
            Issue virtual card
          </Link>
          <Link
            href="/cards/credentials"
            className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-primary/40"
          >
            Manage credentials
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Total spend (MTD)</p>
          <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(totalSpend)}</p>
          <p className="mt-2 text-xs text-zinc-500">Across {cards.length} active cards</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Credits received</p>
          <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(totalCredits)}</p>
          <p className="mt-2 text-xs text-zinc-500">Includes refunds and reimbursements</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Avg. transaction</p>
          <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(averageTicket)}</p>
          <p className="mt-2 text-xs text-zinc-500">Rolling 30-day average</p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h2 className="text-lg font-semibold text-white">Monthly rollup</h2>
          <p className="mt-2 text-sm text-zinc-500">Track spend, credits, and net movement at a glance.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
            <table className="min-w-full divide-y divide-white/5 text-sm text-zinc-300">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left">Period</th>
                  <th className="px-4 py-3 text-right">Spend</th>
                  <th className="px-4 py-3 text-right">Credits</th>
                  <th className="px-4 py-3 text-right">Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockMonthly.map((month) => (
                  <tr key={month.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white">{month.period}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(month.spend)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(month.credits)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(month.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h2 className="text-lg font-semibold text-white">Top cards by spend</h2>
          <p className="mt-2 text-sm text-zinc-500">Identify which cards are driving the most spend this month.</p>
          <div className="mt-4 space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
                <div>
                  <p className="font-medium text-white">{card.label}</p>
                  <p className="text-xs text-zinc-500">{card.brand.toUpperCase()} · **** {card.last4}</p>
                </div>
                <p className="text-base font-semibold text-white">{formatCurrency(Math.abs(card.balance))}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-white">Export center</h2>
          <div className="flex gap-2">
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
            >
              Download monthly rollup
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
            >
              Schedule delivery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
