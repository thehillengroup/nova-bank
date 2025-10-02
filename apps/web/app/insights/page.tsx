import Link from 'next/link';

import { accounts, primarySnapshot, recentTransactions, spendingByCategory } from '@repo/mock-data';
import { formatCurrency } from '../../lib/currency';

const formatPrimaryCurrency = (value: number) => formatCurrency(value, { currency: primarySnapshot.currency });

const goals = [
  {
    id: 'goal-001',
    label: 'Emergency fund',
    target: 15000,
    progress: 9600,
    cadence: 'Automatic transfers every Friday',
  },
  {
    id: 'goal-002',
    label: 'Sabbatical savings',
    target: 12000,
    progress: 4100,
    cadence: 'Monthly allocation on the 1st',
  },
];

const trends = [
  {
    id: 'trend-001',
    label: 'Net cash flow',
    value: primarySnapshot.incomeThisMonth - primarySnapshot.spendingThisMonth,
    descriptor: 'vs last month',
    change: 6.4,
    direction: 'up',
  },
  {
    id: 'trend-002',
    label: 'Recurring spend',
    value: 1875.2,
    descriptor: 'auto debits this month',
    change: 2.1,
    direction: 'down',
  },
  {
    id: 'trend-003',
    label: 'Discretionary',
    value: 1014.7,
    descriptor: 'compared to quarterly average',
    change: 4.7,
    direction: 'up',
  },
];

export default function InsightsPage() {
  const topTransactions = recentTransactions.slice(0, 4);
  const totalDeposits = accounts
    .filter((account) => account.type !== 'credit')
    .reduce((sum, account) => sum + account.balance, 0);

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Analytics</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Financial insights</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Momentum indicators, categorized spending, and goal tracking keep your finances proactive instead of
            reactive.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80">
            Export report
          </button>
          <button className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-primary/40">
            Share with advisor
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <FinancialPulse totalDeposits={totalDeposits} />
          <CategoryBreakdown />
        </div>
        <aside className="space-y-6">
          <GoalProgress />
          <TopActivity transactions={topTransactions} />
        </aside>
      </section>
    </main>
  );
}

function FinancialPulse({ totalDeposits }: { totalDeposits: number }) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Financial pulse</h2>
          <p className="text-sm text-zinc-500">A quick read on liquidity, cash flow, and discretionary headroom.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-cardMuted/40 px-5 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Liquid reserves</p>
          <p className="mt-1 text-2xl font-semibold text-white">{formatPrimaryCurrency(totalDeposits)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {trends.map((trend) => (
          <article
            key={trend.id}
            className="rounded-3xl border border-white/5 bg-cardMuted/60 p-4 text-sm text-zinc-300"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{trend.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatPrimaryCurrency(trend.value)}</p>
            <p className="mt-1 text-xs text-zinc-500">{trend.descriptor}</p>
            <p
              className={`${trend.direction === 'up' ? 'text-success' : 'text-red-400'} mt-4 text-xs uppercase tracking-[0.3em]`}
            >
              {trend.direction === 'up' ? '+' : '-'}{trend.change}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryBreakdown() {
  const totalSpend = spendingByCategory.reduce((sum, category) => sum + category.amount, 0);

  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Category breakdown</h2>
        <Link href="#" className="text-sm text-primary">
          Refine categories
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Spot trends by category, then set budgets or automation rules to match.</p>

      <div className="mt-6 space-y-4">
        {spendingByCategory.map((category) => {
          const share = Math.round((category.amount / totalSpend) * 100);
          return (
            <article key={category.id} className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-cardMuted/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{category.label}</p>
                  <p className="text-xs text-zinc-500">{category.percentage}% of monthly spending</p>
                </div>
                <p className="text-lg font-semibold text-white">{formatPrimaryCurrency(category.amount)}</p>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${category.trend === 'up' ? 'bg-primary' : 'bg-success/60'}`}
                  style={{ width: `${share}%` }}
                />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Trend {category.trend === 'up' ? 'Up' : 'Down'} | {share}% share
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function GoalProgress() {
  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-card p-6 shadow-glass">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Goals tracker</h2>
        <Link href="#" className="text-sm text-white/80 hover:text-white">
          Adjust cadence
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-300">Stay on target with adaptive recommendations as life and markets change.</p>

      <div className="mt-4 space-y-4">
        {goals.map((goal) => {
          const completion = Math.round((goal.progress / goal.target) * 100);
          return (
            <article key={goal.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{goal.label}</h3>
                <p className="text-xs text-zinc-400">{completion}% funded</p>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{goal.cadence}</p>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-success" style={{ width: `${completion}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-xs text-zinc-400">
                <span>{formatPrimaryCurrency(goal.progress)}</span>
                <span>{formatPrimaryCurrency(goal.target)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TopActivity({
  transactions,
}: {
  transactions: typeof recentTransactions;
}) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Signal boost</h2>
        <Link href="#" className="text-sm text-primary">
          View ledger
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Higher-impact transactions shaping this month&apos;s burn and lift.</p>

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
              {formatPrimaryCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
