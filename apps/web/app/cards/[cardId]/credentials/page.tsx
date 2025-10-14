import Link from 'next/link';

import { cards } from '@repo/mock-data';
import { BackPillLink } from '../../../../components/back-pill-link';
import { DetailLayout } from '../../../../components/detail-layout';
import { formatCurrency } from '../../../../lib/currency';

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/transactions', label: 'Transactions' },
  { href: '/cards/reports', label: 'Reports' },
];

const contactChannels = [
  { id: 'email', label: 'Email alerts', helper: 'Statements, spend digests, risk events' },
  { id: 'sms', label: 'SMS', helper: 'Real-time fraud checks and approvals' },
  { id: 'push', label: 'Push notifications', helper: 'Mobile prompts for in-app confirmation' },
];

export function generateStaticParams() {
  return cards.map((card) => ({ cardId: card.id }));
}

export default function CardCredentialsPage({ params }: { params: { cardId: string } }) {
  const card = cards.find((candidate) => candidate.id === params.cardId);

  if (!card) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Card management', href: '/cards' },
    { label: card.label, href: `/cards/${card.id}/controls` },
    { label: 'Credentials' },
  ];

  return (
    <DetailLayout
      breadcrumbs={breadcrumbs}
      title={`${card.label} credentials`}
      description="Update primary cardholder info, reissue physical media, and manage secure delivery preferences."
      actions={<BackPillLink href={`/cards/${card.id}/controls`} label="Back to controls" />}
      maxWidthClassName="md:max-w-5xl"
    >
      <nav aria-label="Card navigation" className="text-xs text-zinc-500">
        <ul className="flex flex-wrap items-center gap-2">
          {secondaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                  item.href === '/cards/credentials' ? 'border border-primary/40 bg-primary/10 text-primary' : 'border border-white/10'
                }`}
              >
                {item.label}
              </Link>
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
              Active balance {formatCurrency(card.balance)} · Card ending in ****{card.last4}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
            >
              Reissue physical card
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
            >
              Share credentials securely
            </Link>
          </div>
        </div>
      </section>

      <form className="space-y-6">
        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h3 className="text-lg font-semibold text-white">Primary cardholder</h3>
          <p className="mt-2 text-sm text-zinc-500">Edit name, contact, and role details for the responsible cardholder.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Full name
              <input
                type="text"
                placeholder="Avery Chen"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email
              <input
                type="email"
                placeholder="avery.chen@acme.co"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Phone
              <input
                type="tel"
                placeholder="(555) 214-8876"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Role / Department
              <input
                type="text"
                placeholder="Director of Product"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h3 className="text-lg font-semibold text-white">Delivery preferences</h3>
          <p className="mt-2 text-sm text-zinc-500">Control how new cards or replacements are shipped and activated.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Shipping address
              <textarea
                rows={3}
                placeholder="110 Market Street
San Francisco, CA 94105"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Activation workflow
              <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50">
                <option>Require in-app activation</option>
                <option>Allow SMS activation</option>
                <option>Auto-activate upon shipping</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h3 className="text-lg font-semibold text-white">Notification channels</h3>
          <p className="mt-2 text-sm text-zinc-500">Choose how the cardholder receives sensitive credential updates.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {contactChannels.map((channel) => (
              <label
                key={channel.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{channel.label}</p>
                    <p className="mt-1 text-xs text-zinc-500">{channel.helper}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-end gap-3">
          <BackPillLink href={`/cards/${card.id}/controls`} label="Cancel" />
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80"
          >
            Save updates
          </button>
        </section>
      </form>
    </DetailLayout>
  );
}
