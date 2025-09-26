import clsx from 'clsx';
import {
  accounts,
  cards,
  primarySnapshot,
  recentTransactions,
  spendingByCategory,
} from '@repo/mock-data';
import { ArrowDownRight, ArrowUpRight, ChevronRight, Send, Wallet } from 'lucide-react';

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

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-24 md:max-w-6xl">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Nova Bank</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
            Control your money with confidence.
          </h1>
          <p className="mt-4 max-w-xl text-base text-zinc-400">
            Track balances across accounts, monitor spending, and keep your cards safe - all in a sleek, unified
            experience.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card/70 text-zinc-300">
            <Wallet size={20} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total balance</p>
            <p className="text-xl font-semibold text-white">{formatAmount(primarySnapshot.totalBalance)}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#181831] via-[#1c1c3c] to-[#101020] p-8 shadow-glass">
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Primary card</p>
                  <p className="mt-4 text-5xl font-semibold text-white">{formatAmount(cards[0]?.balance ?? 0)}</p>
                </div>
                <div className="text-right text-sm text-zinc-400">
                  <p className="font-medium text-white">{cards[0]?.label}</p>
                  <p className="mt-1 text-xs">**** {cards[0]?.last4}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-zinc-500">Available credit</p>
                  <p className="mt-1 text-base font-medium text-white">
                    {formatAmount((cards[0]?.creditLimit ?? 0) - Math.abs(cards[0]?.balance ?? 0))}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between text-xs text-zinc-400">
                <span>Updated just now</span>
                <button className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 font-medium text-white backdrop-blur">
                  Quick transfer <Send size={16} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {accounts.map((account) => (
                <article
                  key={account.id}
                  className="rounded-3xl border border-white/5 bg-card p-5 shadow-innerGlow transition hover:border-primary/40 hover:shadow-glass"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{account.type}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{account.name}</h3>
                  <p className="mt-6 text-3xl font-semibold text-white">{formatAmount(account.balance)}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
                    <span>Account {account.accountNumber}</span>
                    <span>See details</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent transactions</h2>
                <button className="flex items-center gap-2 text-sm text-primary">
                  View all <ChevronRight size={16} />
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-300"
                  >
                    <div>
                      <p className="font-medium text-white">{transaction.description}</p>
                      <p className="text-xs text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <p
                      className={clsx('text-base font-semibold', {
                        'text-success': transaction.direction === 'credit',
                        'text-red-400': transaction.direction === 'debit',
                      })}
                    >
                      {formatDirectionalAmount(transaction.amount, transaction.direction)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <h2 className="text-lg font-semibold text-white">This month</h2>
              <div className="mt-4 grid gap-4">
                <StatBlock
                  label="Income"
                  value={primarySnapshot.incomeThisMonth}
                  variant="positive"
                  description="Salary, bonuses and transfers"
                />
                <StatBlock
                  label="Spending"
                  value={primarySnapshot.spendingThisMonth}
                  variant="neutral"
                  description="Cards, cash, and bill payments"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <h2 className="text-lg font-semibold text-white">Spending breakdown</h2>
              <div className="mt-4 space-y-4">
                {spendingByCategory.map((category) => (
                  <div key={category.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                      <div
                        className="absolute inset-0 rounded-full border border-white/5"
                        style={{
                          background: `conic-gradient(#6366f1 ${category.percentage * 3.6}deg, rgba(99,102,241,0.15) 0deg)`
                        }}
                      />
                      <div className="absolute inset-2 rounded-full bg-cardMuted/80" />
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
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
            </div>

            <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-primary/30 via-primary/10 to-card p-6 shadow-glass">
              <h2 className="text-lg font-semibold text-white">Your cards</h2>
              <div className="mt-5 space-y-4">
                {cards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between rounded-2xl bg-black/20 p-4 text-sm text-zinc-300">
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
            </div>
          </aside>
        </div>
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
