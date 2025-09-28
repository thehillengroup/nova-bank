import Link from 'next/link';

import {
  accounts,
  primarySnapshot,
  recentTransactions,
} from '@repo/mock-data';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: primarySnapshot.currency,
});

const accountTypes = ['checking', 'savings', 'credit'] as const;

type AccountType = (typeof accountTypes)[number];

const typeLabels: Record<AccountType, string> = {
  checking: 'Checking Accounts',
  savings: 'Savings Accounts',
  credit: 'Credit & Charge Accounts',
};

const typeDescriptions: Record<AccountType, string> = {
  checking: 'Everyday spend, direct deposits, and bill payments.',
  savings: 'High-yield deposits and vaults built for growth.',
  credit: 'Cards with real-time controls, rewards, and protection.',
};

const formatAmount = (value: number) =>
  `${value < 0 ? '-' : ''}${currency.format(Math.abs(value)).replace('-', '')}`;

export default function AccountsPage() {
  const primaryAccount = accounts.find((candidate) => candidate.id === 'acc-001') ?? accounts[0];
  const grouped = accountTypes.map((type) => ({
    type,
    accounts: accounts.filter((account) => account.type === type),
  }));

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Portfolio</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Accounts hub</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Monitor balances across every checking, savings, and credit relationship. Drill into recent activity,
            transfers, and health metrics from one unified command center.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <div className="rounded-3xl border border-white/5 bg-card px-5 py-4 text-left shadow-innerGlow">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total liquid balance</p>
            <p className="mt-1 text-2xl font-semibold text-white">{formatAmount(primarySnapshot.totalBalance)}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {grouped.map(({ type, accounts: bucket }) => (
            <AccountBucket key={type} type={type} items={bucket} />
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Latest activity</h2>
              <Link href="/" className="text-sm text-primary">
                Back to overview
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-300"
                >
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p
                    className={`${transaction.direction === 'credit' ? 'text-success' : 'text-red-400'} text-base font-semibold`}
                  >
                    {formatAmount(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {primaryAccount && (
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/30 via-primary/10 to-card p-6 shadow-glass">
              <h2 className="text-lg font-semibold text-white">Need to move money?</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Schedule transfers, pay bills, or wire funds without bouncing between apps.
              </p>
              <Link
                href={`/accounts/${primaryAccount.id}`}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                Open transfer workspace
              </Link>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function AccountBucket({
  type,
  items,
}: {
  type: AccountType;
  items: typeof accounts;
}) {
  if (items.length === 0) {
    return null;
  }

  const totalBalance = items.reduce((sum, account) => sum + account.balance, 0);

  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{typeLabels[type]}</h2>
          <p className="text-sm text-zinc-500">{typeDescriptions[type]}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total</p>
          <p className="text-xl font-semibold text-white">{formatAmount(totalBalance)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((account) => (
          <article
            key={account.id}
            className="rounded-3xl border border-white/5 bg-cardMuted/60 p-4 shadow-innerGlow transition hover:border-primary/40 hover:shadow-glass"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>{account.type}</span>
              <span>{account.accountNumber}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{account.name}</h3>
            <p className="mt-4 text-3xl font-semibold text-white">{formatAmount(account.balance)}</p>
            <Link href={`/accounts/${account.id}`} className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
              Manage account
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

