import clsx from 'clsx';

import { formatCurrency } from '../../lib/currency';
import type { SpendOverviewProps } from './types';

export function SpendOverview({ insights }: SpendOverviewProps) {
  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-card p-6 shadow-glass">
      <h2 className="text-lg font-semibold text-white">Spend insights</h2>
      <p className="mt-2 text-sm text-zinc-400">Monitor directional changes and anticipate when to dial limits up or down.</p>

      <div className="mt-5 space-y-4" role="list" aria-label="Spend trend summaries">
        {insights.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm" role="listitem">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{formatCurrency(item.amount)}</p>
            </div>
            <p
              className={clsx(
                'text-xs uppercase tracking-[0.3em]',
                item.direction === 'up' ? 'text-success' : 'text-red-400'
              )}
              aria-label={`${item.change}% ${item.direction === 'up' ? 'increase' : 'decrease'}`}
            >
              {item.direction === 'up' ? '+' : '-'}{item.change}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
