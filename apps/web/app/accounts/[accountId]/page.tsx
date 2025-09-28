import { notFound } from 'next/navigation';
import Link from 'next/link';

import { accounts, recentTransactions } from '@repo/mock-data';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

type AccountIdParam = {
  accountId: string;
};

export function generateStaticParams(): AccountIdParam[] {
  return accounts.map((account) => ({ accountId: account.id }));
}

export default function AccountDetailPage({ params }: { params: AccountIdParam }) {
  const { accountId } = params;
  const account = accounts.find((item) => item.id === accountId);
  if (!account) {
    notFound();
    return null;
  }

  const currentAccount = account;
  const accountKeyword = currentAccount.name.split(' ')[0]?.toLowerCase() ?? '';
  const transactions = recentTransactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(accountKeyword),
  );

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-4xl">
      <Link href="/accounts" className="inline-flex items-center gap-2 text-sm text-primary">
        <span aria-hidden="true">&larr;</span> Back to accounts
      </Link>

      <header className="rounded-3xl border border-white/5 bg-card p-6 shadow-glass">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{currentAccount.type}</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">{currentAccount.name}</h1>
        <p className="mt-3 text-sm text-zinc-400">Account {currentAccount.accountNumber}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <StatCard label="Available balance" value={currency.format(currentAccount.balance)} />
          <StatCard label="Credit limit" value={currency.format(Math.abs(currentAccount.balance) + 5000)} />
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Recent activity</h2>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-sm text-zinc-500">No transactions matched this account yet.</p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-card px-4 py-3 text-sm text-zinc-300"
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
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-cardMuted/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
