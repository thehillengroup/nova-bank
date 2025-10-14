import { notFound } from 'next/navigation';
import Link from 'next/link';

import { cards } from '@repo/mock-data';
import { BackPillLink } from '../../../../components/back-pill-link';
import { DetailLayout } from '../../../../components/detail-layout';
import { formatCurrency } from '../../../../lib/currency';

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/reports', label: 'Reports', disabled: true },
];

const controlSections = [
  {
    title: 'Card status',
    description: 'Toggle card availability instantly while keeping recurring debits unaffected.',
    options: [
      { id: 'freeze', label: 'Freeze card', helper: 'Stop point-of-sale and online authorizations.' },
      { id: 'travel', label: 'Add travel notice', helper: 'Add destinations to prevent decline during travel.' },
      { id: 'replace', label: 'Order replacement', helper: 'Dispatch a new card and keep virtual number active.' },
    ],
  },
  {
    title: 'Spending limits',
    description: 'Define per-merchant, per-channel, or time-boxed spend policies.',
    options: [
      { id: 'daily', label: 'Daily limit', helper: 'Currently $1,500. Tap to edit.' },
      { id: 'mcc', label: 'Merchant categories', helper: 'Dining & travel allowed · Gaming blocked.' },
      { id: 'online', label: 'Card-not-present', helper: 'Require 3DS for purchases over $250.' },
    ],
  },
  {
    title: 'Alerts & automation',
    description: 'Stay ahead of fraud and budget drift with real-time notifications.',
    options: [
      { id: 'push', label: 'Push notifications', helper: 'Large purchase and foreign currency alerts enabled.' },
      { id: 'email', label: 'Email digests', helper: 'Daily summary to finance@acme.co.' },
      { id: 'delegates', label: 'Delegate approvals', helper: 'Managers approve purchases over $500.' },
    ],
  },
];

export function generateStaticParams() {
  return cards.map((card) => ({ cardId: card.id }));
}

export default function CardControlsPage({ params }: { params: { cardId: string } }) {
  const card = cards.find((candidate) => candidate.id === params.cardId);

  if (!card) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Card management', href: '/cards' },
    { label: card.label },
    { label: 'Controls' },
  ];

  return (
    <DetailLayout
      breadcrumbs={breadcrumbs}
      title={`${card.label} controls`}
      description="Configure limits, security, and alerting for this card without leaving the command center."
      actions={<BackPillLink href="/cards" label="Back to portfolio" />}
      maxWidthClassName="md:max-w-5xl"
    >
      <nav aria-label="Card navigation" className="text-xs text-zinc-500">
        <ul className="flex flex-wrap items-center gap-2">
          {secondaryNav.map((item) => (
            <li key={item.href}>
              {item.disabled ? (
                <span className="inline-flex items-center rounded-full border border-white/5 px-3 py-2 text-white/30">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                    item.href === '/cards' ? 'border border-white/10' : 'border border-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{card.brand}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{card.label}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Limit {formatCurrency(card.creditLimit)} · Current balance {formatCurrency(card.balance)}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/cards/${card.id}/issue`}
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
            >
              Issue virtual card
            </Link>
            <Link
              href={`/cards/${card.id}/credentials`}
              className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
            >
              Manage credentials
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {controlSections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <p className="text-sm text-zinc-500">{section.description}</p>
              </div>
              <button className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white hover:border-primary/40">
                Manage
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {section.options.map((option) => (
                <div
                  key={option.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-zinc-300"
                >
                  <p className="font-medium text-white">{option.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{option.helper}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </DetailLayout>
  );
}
