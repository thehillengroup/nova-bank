import clsx from 'clsx';
import Link from 'next/link';
import {
  accounts,
  cards,
  primarySnapshot,
  recentTransactions,
  spendingByCategory,
} from '@repo/mock-data';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: primarySnapshot.currency,
});

const formatAmount = (value: number) =>
  `${value < 0 ? '-' : ''}${currency.format(Math.abs(value)).replace('-', '')}`;

const formatDirectionalAmount = (
  value: number,
  direction: 'credit' | 'debit',
) => {
  const base = currency.format(Math.abs(value)).replace('-', '');
  if (value === 0) return base;
  return direction === 'credit' ? `+${base}` : `-${base}`;
};

const quickLinks = [
  {
    href: '/accounts',
    label: 'Accounts hub',
    helper: 'Balances, transfers, and history',
  },
  {
    href: '/cards',
    label: 'Cards portfolio',
    helper: 'Controls, statements, virtual cards',
  },
  {
    href: '/insights',
    label: 'Financial insights',
    helper: 'Analytics, breakdowns, goals',
  },
];

export default function Page() {
  const heroCard = cards[0];
  const availableCredit = (heroCard?.creditLimit ?? 0) - Math.abs(heroCard?.balance ?? 0);

  return (
    <main className="mx-auto flex flex-col gap-12 px-6 pb-16 pt-16 md:max-w-6xl">
      <section className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#161632] via-[#1d1d3c] to-[#0d0d1c] p-8 shadow-glass">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Nova Bank</p>
                <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
                  Control your money with confidence
                </h1>
                <p className="mt-3 max-w-xl text-sm text-zinc-400">
                  Track balances, monitor spending, and manage cards in one clean command center.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-4 text-right shadow-inner">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total balance</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatAmount(primarySnapshot.totalBalance)}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/40"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-primary">{link.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{link.helper}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Primary card</p>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="text-3xl font-semibold text-white">{formatAmount(heroCard?.balance ?? 0)}</p>
                  <p className="mt-2 text-xs text-zinc-500">{heroCard?.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">**** {heroCard?.last4}</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-primary/40">
                  Transfer workspace <ArrowRight size={14} />
                </button>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Limit</p>
                  <p className="mt-1 text-white">{formatAmount(heroCard?.creditLimit ?? 0)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Available credit</p>
                  <p className="mt-1 text-success">{formatAmount(availableCredit)}</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">This month</p>
              <div className="mt-4 grid gap-4">
                <StatBlock
                  label="Income"
                  value={primarySnapshot.incomeThisMonth}
                  variant="positive"
                  description="Salary, bonuses, and transfers"
                />
                <StatBlock
                  label="Spending"
                  value={primarySnapshot.spendingThisMonth}
                  variant="neutral"
                  description="Cards, cash, and bill payments"
                />
              </div>
            </article>
          </div>

          <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent transactions</h2>
              <Link href="/cards/transactions" className="flex items-center gap-2 text-sm text-primary">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-300"
                >
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p
                    className={`text-base font-semibold ${
                      transaction.direction === 'credit' ? 'text-success' : 'text-red-400'
                    }`}
                  >
                    {formatDirectionalAmount(transaction.amount, transaction.direction)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
            <h2 className="text-lg font-semibold text-white">Accounts snapshot</h2>
            <div className="mt-4 grid gap-3">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-white">{account.name}</p>
                    <p className="text-xs text-zinc-500">{account.type}</p>
                  </div>
                  <p className="text-base font-semibold text-white">{formatAmount(account.balance)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
            <h2 className="text-lg font-semibold text-white">Spending breakdown</h2>
            <div className="mt-4 space-y-4">
              {spendingByCategory.map((category) => (
                <div key={category.id} className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <div
                      className="absolute inset-0 rounded-full border border-white/5"
                      style={{
                        background: `conic-gradient(#6366f1 ${category.percentage * 3.6}deg, rgba(99,102,241,0.12) 0deg)`,
                      }}
                    />
                    <div className="absolute inset-[6px] rounded-full bg-cardMuted/80" />
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{category.label}</p>
                    <p className="text-xs text-zinc-500">{formatAmount(category.amount)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {category.trend === 'up' ? (
                      <ArrowUpRight size={16} className="text-warning" />
                    ) : (
                      <ArrowDownRight size={16} className="text-success" />
                    )}
                    <span className="text-zinc-400">{category.trend === 'up' ? 'Rise' : 'Drop'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-primary/30 via-primary/10 to-card p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-white">Cards snapshot</h2>
            <div className="mt-4 space-y-3">
              {cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3 text-sm text-zinc-300">
                  <div>
                    <p className="text-base font-semibold text-white">{card.label}</p>
                    <p className="text-xs text-zinc-500">**** {card.last4}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Balance</p>
                    <p className="text-base font-semibold text-white">{formatAmount(card.balance)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function StatBlock({
  label,
  value,
  variant = 'neutral',
  description,
}: {
  label: string;
  value: number;
  variant?: 'positive' | 'neutral';
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-cardMuted/80 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className={clsx('mt-3 text-3xl font-semibold', variant === 'positive' ? 'text-success' : 'text-white')}>
        {formatAmount(value)}
      </p>
      <p className="mt-2 text-xs text-zinc-500">{description}</p>
    </div>
  );
}
