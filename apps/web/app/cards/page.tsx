import Link from 'next/link';

import { cards, recentTransactions } from '@repo/mock-data';

import {
  ActiveCards,
  ControlCenter,
  RecentCardActivity,
  SpendOverview,
  type ControlDefinition,
  type SpendInsight,
} from '../../components/cards';

const controls = [
  {
    id: 'freeze',
    label: 'Freeze card',
    description: 'Temporarily disable purchases while keeping recurring payments active.',
  },
  {
    id: 'controls',
    label: 'Real-time controls',
    description: 'Set merchant category limits, travel windows, and geofence rules.',
  },
  {
    id: 'alerts',
    label: 'Spend alerts',
    description: 'Push notifications when transactions exceed thresholds you define.',
  },
] satisfies ControlDefinition[];

const spendInsights = [
  {
    id: 'week',
    label: 'This week',
    amount: 486.42,
    change: 8.2,
    direction: 'down',
  },
  {
    id: 'month',
    label: 'This month',
    amount: 2140.33,
    change: 12.5,
    direction: 'up',
  },
  {
    id: 'quarter',
    label: 'Rolling 90d',
    amount: 6124.88,
    change: 3.1,
    direction: 'up',
  },
] satisfies SpendInsight[];

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/transactions', label: 'Transactions' },
  { href: '/cards/reports', label: 'Reports' },
];

export default function CardsPage() {
  const lastFiveTransactions = recentTransactions.slice(0, 5);

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Card management</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Card portfolio</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Administer every physical and virtual card, review spend at a glance, and apply advanced controls without calling support.
          </p>
          <nav aria-label="Card navigation" className="mt-6">
            <ul className="flex flex-wrap items-center gap-3 text-xs">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                      item.href === '/cards' ? 'border border-primary/40 bg-primary/10 text-primary' : 'border border-white/10'
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

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <ActiveCards cards={cards} />
          <ControlCenter controls={controls} />
        </div>
        <aside className="space-y-6">
          <SpendOverview insights={spendInsights} />
          <RecentCardActivity transactions={lastFiveTransactions} />
        </aside>
      </section>
    </main>
  );
}
