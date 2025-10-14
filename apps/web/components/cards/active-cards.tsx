import Link from 'next/link';

import { formatCurrency } from '../../lib/currency';
import type { ActiveCardsProps } from './types';

export function ActiveCards({ cards }: ActiveCardsProps) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Active cards</h2>
        <Link href="/cards/credentials" className="text-sm text-primary" aria-label="Manage card credentials hub">
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
            aria-label={`${card.label} card summary`}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-zinc-500">
              <span>{card.brand}</span>
              <span aria-label={`Card ending in ${card.last4}`}>**** {card.last4}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{card.label}</h3>
            <p className="mt-2 text-sm text-zinc-500">Limit {formatCurrency(card.creditLimit)}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{formatCurrency(card.balance)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/cards/${card.id}/controls`}
                className="inline-flex flex-1 min-w-[140px] items-center justify-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`View controls for ${card.label}`}
              >
                View controls
              </Link>
              <Link
                href={`/cards/${card.id}/statements`}
                className="inline-flex flex-1 min-w-[140px] items-center justify-center rounded-full bg-primary/80 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`View statements for ${card.label}`}
              >
                Statements
              </Link>
              <Link
                href={`/cards/${card.id}/issue`}
                className="inline-flex flex-1 min-w-[140px] items-center justify-center rounded-full border border-primary/40 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Issue virtual card for ${card.label}`}
              >
                Issue virtual card
              </Link>
              <Link
                href={`/cards/${card.id}/credentials`}
                className="inline-flex flex-1 min-w-[140px] items-center justify-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Manage credentials for ${card.label}`}
              >
                Manage credentials
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
