"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Download } from 'lucide-react';

import { cards, recentTransactions } from '@repo/mock-data';
import { formatCurrency } from '../../../lib/currency';

const secondaryNav = [
  { href: '/cards', label: 'Overview' },
  { href: '/cards/credentials', label: 'Credentials' },
  { href: '/cards/transactions', label: 'Transactions' },
  { href: '/cards/reports', label: 'Reports' },
];

const PAGE_SIZE = 10;

const cardMap = new Map(cards.map((card) => [card.id, card]));

const tableRows = recentTransactions.map((transaction) => {
  const cardMeta = transaction.cardId ? cardMap.get(transaction.cardId) : undefined;
  return {
    ...transaction,
    dateValue: new Date(transaction.date).getTime(),
    cardLabel: cardMeta?.label ?? 'Other accounts',
  };
});

const cardCounts = tableRows.reduce((acc, row) => {
  if (row.cardId) {
    acc.set(row.cardId, (acc.get(row.cardId) ?? 0) + 1);
  } else {
    acc.set('__other', (acc.get('__other') ?? 0) + 1);
  }
  return acc;
}, new Map<string, number>());

const cardFilterOptions = [
  { value: 'all', label: `All cards (${tableRows.length})` },
  ...cards.map((card) => ({
    value: card.id,
    label: `${card.label} (${cardCounts.get(card.id) ?? 0})`,
  })),
  ...(cardCounts.get('__other')
    ? [{ value: '__other', label: `Other accounts (${cardCounts.get('__other') ?? 0})` }]
    : []),
];

const typeCounts = tableRows.reduce(
  (acc, row) => {
    acc[row.direction] = (acc[row.direction] ?? 0) + 1;
    return acc;
  },
  { debit: 0, credit: 0 } as Record<'debit' | 'credit', number>,
);

const typeFilterOptions = [
  { value: 'all', label: `All transactions (${tableRows.length})` },
  { value: 'debit', label: `Debits (${typeCounts.debit})` },
  { value: 'credit', label: `Credits (${typeCounts.credit})` },
];

type SortKey = 'description' | 'card' | 'category' | 'date' | 'amount';

type SortDirection = 'asc' | 'desc';

export default function CardsTransactionsPage() {
  const [cardFilter, setCardFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'debit' | 'credit'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  const collator = useMemo(() => new Intl.Collator('en', { sensitivity: 'base' }), []);

  const filteredRows = useMemo(() => {
    return tableRows.filter((row) => {
      const matchesCard =
        cardFilter === 'all'
          ? true
          : cardFilter === '__other'
          ? !row.cardId
          : row.cardId === cardFilter;
      const matchesType = typeFilter === 'all' ? true : row.direction === typeFilter;
      return matchesCard && matchesType;
    });
  }, [cardFilter, typeFilter]);

  const sortedRows = useMemo(() => {
    const comparators: Record<SortKey, (a: typeof tableRows[number], b: typeof tableRows[number]) => number> = {
      description: (a, b) => collator.compare(a.description, b.description),
      card: (a, b) => collator.compare(a.cardLabel, b.cardLabel),
      category: (a, b) => collator.compare(a.category, b.category),
      date: (a, b) => a.dateValue - b.dateValue,
      amount: (a, b) => a.amount - b.amount,
    };

    const rows = [...filteredRows];
    const comparator = comparators[sortKey];
    rows.sort((a, b) => {
      const compareResult = comparator(a, b);
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });

    return rows;
  }, [filteredRows, sortKey, sortDirection, collator]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [cardFilter, typeFilter, sortKey, sortDirection]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedRows.slice(start, start + PAGE_SIZE);
  }, [sortedRows, page]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    const header = ['Description', 'Card', 'Category', 'Date', 'Direction', 'Amount'];
    const rows = sortedRows.map((row) => [
      row.description,
      row.cardLabel,
      row.category,
      new Date(row.date).toLocaleDateString(),
      row.direction,
      formatCurrency(row.amount),
    ]);

    const csvContent = [header, ...rows]
      .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'card-transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown size={14} className="text-zinc-500" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="text-primary" />
    ) : (
      <ArrowDown size={14} className="text-primary" />
    );
  };

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Card management</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Recent transactions</h1>
          <p className="mt-4 max-w-3xl text-sm text-zinc-400">
            Inspect the latest card activity across your portfolio. Filter by card, type, or export the data for downstream reconciliation.
          </p>
          <nav aria-label="Card navigation" className="mt-6">
            <ul className="flex flex-wrap items-center gap-3 text-xs">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-full px-3 py-2 text-white/70 transition hover:text-primary ${
                      item.href === '/cards/transactions' ? 'border border-primary/40 bg-primary/10 text-primary' : 'border border-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-primary/40"
        >
          <Download size={16} /> Export CSV
        </button>
      </header>

      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <label className="group flex items-center gap-3 rounded-full border border-white/10 bg-cardMuted/40 px-4 py-2 text-white/70 transition hover:border-primary/30 focus-within:border-primary/40">
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">Card</span>
              <div className="relative">
                <select
                  className="dropdown-filter appearance-none rounded-full bg-cardMuted/70 px-3 py-1 pr-9 text-sm font-medium text-white/90 outline-none transition focus:bg-cardMuted/80 focus:text-white focus:ring-2 focus:ring-primary/40"
                  value={cardFilter}
                  onChange={(event) => setCardFilter(event.target.value)}
                >
                  {cardFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition group-focus-within:text-primary"
                />
              </div>
            </label>
            <label className="group flex items-center gap-3 rounded-full border border-white/10 bg-cardMuted/40 px-4 py-2 text-white/70 transition hover:border-primary/30 focus-within:border-primary/40">
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">Type</span>
              <div className="relative">
                <select
                  className="dropdown-filter appearance-none rounded-full bg-cardMuted/70 px-3 py-1 pr-9 text-sm font-medium text-white/90 outline-none transition focus:bg-cardMuted/80 focus:text-white focus:ring-2 focus:ring-primary/40"
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value as 'all' | 'debit' | 'credit')}
                >
                  {typeFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition group-focus-within:text-primary"
                />
              </div>
            </label>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm text-zinc-300">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => handleSort('description')} className="flex items-center gap-2">
                    Description {renderSortIcon('description')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => handleSort('card')} className="flex items-center gap-2">
                    Card {renderSortIcon('card')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => handleSort('category')} className="flex items-center gap-2">
                    Category {renderSortIcon('category')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => handleSort('date')} className="flex items-center gap-2">
                    Date {renderSortIcon('date')}
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button type="button" onClick={() => handleSort('amount')} className="ml-auto flex items-center gap-2">
                    Amount {renderSortIcon('amount')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pagedRows.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{transaction.description}</td>
                  <td className="px-4 py-3">{transaction.cardLabel}</td>
                  <td className="px-4 py-3">{transaction.category}</td>
                  <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td
                    className={`px-4 py-3 text-right text-base font-semibold ${
                      transaction.direction === 'credit' ? 'text-success' : 'text-red-400'
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
              {pagedRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-xs text-zinc-500" colSpan={5}>
                    No transactions match the selected filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <footer className="mt-4 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 md:flex-row">
          <span>
            Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, sortedRows.length)} of {sortedRows.length}{' '}
            transactions
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-white transition enabled:hover:border-primary/40 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/30"
            >
              Previous
            </button>
            <span>
              Page {page} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              disabled={page === pageCount}
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-white transition enabled:hover:border-primary/40 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/30"
            >
              Next
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
