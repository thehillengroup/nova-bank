'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Download } from 'lucide-react';

import { DetailLayout } from '../../../components/detail-layout';
import { BackPillLink } from '../../../components/back-pill-link';
import { recentTransactions } from '@repo/mock-data';
import { formatCurrency } from '../../../lib/currency';

const PAGE_SIZE = 12;

const ledgerRows = recentTransactions.map((transaction) => ({
  ...transaction,
  dateValue: new Date(transaction.date).getTime(),
}));

type SortKey = 'description' | 'date' | 'category' | 'amount';
type SortDirection = 'asc' | 'desc';

const defaultDirection: Record<SortKey, SortDirection> = {
  description: 'asc',
  category: 'asc',
  date: 'desc',
  amount: 'desc',
};

export default function LedgerPage() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  const collator = useMemo(() => new Intl.Collator('en', { sensitivity: 'base' }), []);

  const sortedRows = useMemo(() => {
    const rows = [...ledgerRows];
    const comparators: Record<SortKey, (a: typeof ledgerRows[number], b: typeof ledgerRows[number]) => number> = {
      description: (a, b) => collator.compare(a.description, b.description),
      category: (a, b) => collator.compare(a.category, b.category),
      date: (a, b) => a.dateValue - b.dateValue,
      amount: (a, b) => a.amount - b.amount,
    };

    rows.sort((a, b) => {
      const comparison = comparators[sortKey](a, b);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return rows;
  }, [collator, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [sortKey, sortDirection]);

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
      setSortDirection(defaultDirection[key]);
    }
  };

  const handleExport = () => {
    const header = ['Description', 'Date', 'Category', 'Direction', 'Amount'];
    const rows = sortedRows.map((row) => [
      row.description,
      new Date(row.date).toLocaleDateString(),
      row.category,
      row.direction,
      formatCurrency(row.amount),
    ]);

    const csvContent = [header, ...rows]
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction-ledger.csv';
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

  const rangeStart = Math.min((page - 1) * PAGE_SIZE + 1, sortedRows.length);
  const rangeEnd = Math.min(page * PAGE_SIZE, sortedRows.length);

  return (
    <DetailLayout
      breadcrumbs={[
        { label: 'Analytics' },
        { label: 'Financial insights', href: '/insights' },
        { label: 'Transaction ledger' },
      ]}
      title="Full transaction ledger"
      description="Drill into the detailed activity that powers your signal boost highlights. Use this space to reconcile, annotate, or export the raw records."
      actions={<BackPillLink href="/insights" label="Back to insights" />}
    >
      <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-white">Transactions</h2>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
          >
            <Download size={14} /> Export CSV
          </button>
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
                  <button type="button" onClick={() => handleSort('date')} className="flex items-center gap-2">
                    Date {renderSortIcon('date')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => handleSort('category')} className="flex items-center gap-2">
                    Category {renderSortIcon('category')}
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
                  <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{transaction.category}</td>
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
                  <td className="px-4 py-6 text-center text-xs text-zinc-500" colSpan={4}>
                    No transactions match the current view.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <footer className="mt-4 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 md:flex-row">
          <span>
            Showing {rangeStart} - {rangeEnd} of {sortedRows.length} transactions
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
    </DetailLayout>
  );
}
