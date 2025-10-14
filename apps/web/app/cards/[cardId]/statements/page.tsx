import { notFound } from 'next/navigation';
import Link from 'next/link';

import { cards } from '@repo/mock-data';
import { BackPillLink } from '../../../../components/back-pill-link';
import { DetailLayout } from '../../../../components/detail-layout';
import { formatCurrency } from '../../../../lib/currency';

const mockStatements = [
  {
    id: 'stmt-2025-09',
    period: 'September 2025',
    closingDate: '2025-09-25',
    dueDate: '2025-10-17',
    newBalance: 1724.32,
    minimumDue: 86.21,
    paymentReceived: 650,
    endingBalance: 1074.32,
  },
  {
    id: 'stmt-2025-08',
    period: 'August 2025',
    closingDate: '2025-08-25',
    dueDate: '2025-09-17',
    newBalance: 1388.9,
    minimumDue: 69.45,
    paymentReceived: 1388.9,
    endingBalance: 0,
  },
  {
    id: 'stmt-2025-07',
    period: 'July 2025',
    closingDate: '2025-07-25',
    dueDate: '2025-08-17',
    newBalance: 2014.61,
    minimumDue: 100.73,
    paymentReceived: 800,
    endingBalance: 1214.61,
  },
];

export function generateStaticParams() {
  return cards.map((card) => ({ cardId: card.id }));
}

export default function CardStatementsPage({ params }: { params: { cardId: string } }) {
  const card = cards.find((candidate) => candidate.id === params.cardId);

  if (!card) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Card management', href: '/cards' },
    { label: card.label },
    { label: 'Statements' },
  ];

  return (
    <DetailLayout
      breadcrumbs={breadcrumbs}
      title={`${card.label} statements`}
      description="Review monthly statements, see payments, and download PDFs for your records."
      actions={<BackPillLink href="/cards" label="Back to portfolio" />}
      maxWidthClassName="md:max-w-5xl"
    >
      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{card.brand}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{card.label}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Current balance {formatCurrency(card.balance)} · Limit {formatCurrency(card.creditLimit)}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
            >
              Download most recent
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
            >
              Enroll in eStatements
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm text-zinc-300">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">Billing period</th>
                <th className="px-4 py-3 text-left">Closing date</th>
                <th className="px-4 py-3 text-left">Due date</th>
                <th className="px-4 py-3 text-right">New balance</th>
                <th className="px-4 py-3 text-right">Minimum due</th>
                <th className="px-4 py-3 text-right">Payments received</th>
                <th className="px-4 py-3 text-right">Ending balance</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockStatements.map((statement) => (
                <tr key={statement.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{statement.period}</td>
                  <td className="px-4 py-3">{new Date(statement.closingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(statement.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(statement.newBalance)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(statement.minimumDue)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(statement.paymentReceived)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(statement.endingBalance)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href="#" className="text-xs text-primary hover:underline">
                      View PDF
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DetailLayout>
  );
}

