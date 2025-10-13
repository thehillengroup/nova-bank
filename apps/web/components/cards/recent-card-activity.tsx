import Link from 'next/link';

import { formatCurrency } from '../../lib/currency';
import type { RecentCardActivityProps } from './types';

export function RecentCardActivity({ transactions }: RecentCardActivityProps) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent card activity</h2>
        <Link href="#" className="text-sm text-primary" aria-label="View all card activity entries">
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3" role="list" aria-label="Latest card transactions">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-300"
            role="listitem"
          >
            <div>
              <p className="font-medium text-white">{transaction.description}</p>
              <p className="text-xs text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <p
              className={`${transaction.direction === 'credit' ? 'text-success' : 'text-red-400'} text-base font-semibold`}
              aria-label={`${transaction.direction === 'credit' ? 'Credit' : 'Debit'} transaction amount ${formatCurrency(transaction.amount)}`}
            >
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
