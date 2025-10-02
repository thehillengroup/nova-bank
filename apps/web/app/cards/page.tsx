import Link from 'next/link';

import { cards, recentTransactions } from '@repo/mock-data';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
];

const spendInsights = [
  {
    id: 'week',
    label: 'This week',
    amount: 486.42,
    change: 8.2,
    direction: 'down' as const,
  },
  {
    id: 'month',
    label: 'This month',
    amount: 2140.33,
    change: 12.5,
    direction: 'up' as const,
  },
  {
    id: 'quarter',
    label: 'Rolling 90d',
    amount: 6124.88,
    change: 3.1,
    direction: 'up' as const,
  },
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
            Administer every physical and virtual card, review spend at a glance, and apply advanced controls without
            calling support.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80">
            Issue virtual card
          </button>
          <button className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-primary/40">
            Replace physical card
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <ActiveCards />
          <ControlCenter />
        </div>
        <aside className="space-y-6">
          <SpendOverview insights={spendInsights} />
          <RecentCardActivity transactions={lastFiveTransactions} />
        </aside>
      </section>
    </main>
  );
}

function ActiveCards() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Active cards</h2>
        <Link href="#" className="text-sm text-primary">
          Manage credentials
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">
        Manage spend limits, cardholder details, and statement preferences across your portfolio.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.id}
            className="rounded-3xl border border-white/5 bg-cardMuted/60 p-5 shadow-innerGlow transition hover:border-primary/40 hover:shadow-glass"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-zinc-500">
              <span>{card.brand}</span>
              <span>{card.last4}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{card.label}</h3>
            <p className="mt-2 text-sm text-zinc-500">Limit {currency.format(card.creditLimit)}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{currency.format(card.balance)}</p>
            <div className="mt-4 flex gap-2">
              <button className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white hover:border-primary/40">
                View controls
              </button>
              <button className="inline-flex flex-1 items-center justify-center rounded-full bg-primary/80 px-3 py-2 text-xs font-medium text-white hover:bg-primary">
                Statements
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ControlCenter() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Control center</h2>
        <Link href="#" className="text-sm text-primary">
          Configure defaults
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">
        Apply controls instantly to any card or cardholder group. Templates keep teams compliant.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {controls.map((control) => (
          <article
            key={control.id}
            className="rounded-3xl border border-white/5 bg-white/5 p-4 text-sm text-zinc-300"
          >
            <h3 className="text-base font-semibold text-white">{control.label}</h3>
            <p className="mt-2 text-xs text-zinc-500">{control.description}</p>
            <button className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Adjust
              <span aria-hidden="true">&rarr;</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function SpendOverview({
  insights,
}: {
  insights: {
    id: string;
    label: string;
    amount: number;
    change: number;
    direction: 'up' | 'down';
  }[];
}) {
  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-card p-6 shadow-glass">
      <h2 className="text-lg font-semibold text-white">Spend insights</h2>
      <p className="mt-2 text-sm text-zinc-400">Monitor directional changes and anticipate when to dial limits up or down.</p>

      <div className="mt-5 space-y-4">
        {insights.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{currency.format(item.amount)}</p>
            </div>
            <p
              className={`${item.direction === 'up' ? 'text-success' : 'text-red-400'} text-xs uppercase tracking-[0.3em]`}
            >
              {item.direction === 'up' ? '+' : '-'}{item.change}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentCardActivity({
  transactions,
}: {
  transactions: typeof recentTransactions;
}) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent card activity</h2>
        <Link href="#" className="text-sm text-primary">
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-300"
          >
            <div>
              <p className="font-medium text-white">{transaction.description}</p>
              <p className="text-xs text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <p
              className={`${transaction.direction === 'credit' ? 'text-success' : 'text-red-400'} text-base font-semibold`}
            >
              {currency.format(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
