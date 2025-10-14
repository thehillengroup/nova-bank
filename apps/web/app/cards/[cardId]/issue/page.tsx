import { notFound } from 'next/navigation';
import { cards } from '@repo/mock-data';
import { BackPillLink } from '../../../../components/back-pill-link';
import { DetailLayout } from '../../../../components/detail-layout';

const fundingSources = [
  { id: 'acct-001', label: 'Everyday Checking · ****8123' },
  { id: 'acct-002', label: 'High-Yield Savings · ****0042' },
  { id: 'acct-003', label: 'Operating Account · ****1890' },
];

const spendProfiles = [
  { id: 'profile-travel', label: 'Travel & Lodging', helper: 'Airfare, hotels, ride sharing' },
  { id: 'profile-pro', label: 'Procurement', helper: 'Vendors, SaaS, hardware' },
  { id: 'profile-limited', label: 'Limited Use', helper: 'One-time purchase with auto-turn off' },
];

export function generateStaticParams() {
  return cards.map((card) => ({ cardId: card.id }));
}

export default function IssueVirtualCardPage({ params }: { params: { cardId: string } }) {
  const card = cards.find((candidate) => candidate.id === params.cardId);

  if (!card) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Card management', href: '/cards' },
    { label: card.label, href: `/cards/${card.id}/controls` },
    { label: 'Issue virtual card' },
  ];

  return (
    <DetailLayout
      breadcrumbs={breadcrumbs}
      title={`Issue virtual card for ${card.label}`}
      description="Spin up single-use or persistent numbers with tailored controls and automated expiry."
      actions={<BackPillLink href={`/cards/${card.id}/controls`} label="Back to controls" />}
      maxWidthClassName="md:max-w-4xl"
    >
      <form className="space-y-6">
        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h2 className="text-lg font-semibold text-white">Card details</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Configure the new virtual card with a name, optional delegate, and expiration rules.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Card name
              <input
                type="text"
                placeholder="Product launch travel"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Delegate (optional)
              <input
                type="email"
                placeholder="alex@acme.co"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Monthly cap
              <input
                type="number"
                placeholder="2000"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Expiration (days)
              <input
                type="number"
                placeholder="90"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-primary/50"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h2 className="text-lg font-semibold text-white">Funding source</h2>
          <p className="mt-2 text-sm text-zinc-500">Pick the account that will settle transactions for this virtual card.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {fundingSources.map((source) => (
              <label
                key={source.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:border-primary/40"
              >
                <span>{source.label}</span>
                <input type="radio" name="funding" value={source.id} className="h-4 w-4" />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
          <h2 className="text-lg font-semibold text-white">Spend profile</h2>
          <p className="mt-2 text-sm text-zinc-500">Apply a preset to jumpstart limits and alerts appropriate for the use case.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {spendProfiles.map((profile) => (
              <label
                key={profile.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{profile.label}</p>
                    <p className="mt-1 text-xs text-zinc-500">{profile.helper}</p>
                  </div>
                  <input type="radio" name="profile" value={profile.id} className="h-4 w-4" />
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
            Issue virtual card
          </button>
        </section>
      </form>
    </DetailLayout>
  );
}

