'use client';

import Link from 'next/link';
import { X, ArrowRightLeft, Calendar, Clock, CreditCard } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import { formatCurrency } from '../../lib/currency';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

type ModalControllerProps = {
  open: boolean;
  onClose: () => void;
};

const upcomingPayments = [
  {
    id: 'pay-001',
    payee: 'City Utilities',
    amount: 182.64,
    dueDate: '2025-09-25',
    status: 'Scheduled',
    method: 'Checking / ***8123',
  },
  {
    id: 'pay-002',
    payee: 'Premier Mortgage',
    amount: 2140.0,
    dueDate: '2025-09-28',
    status: 'Draft',
    method: 'Checking / ***8123',
  },
  {
    id: 'pay-003',
    payee: 'Northside Fitness',
    amount: 86.99,
    dueDate: '2025-10-02',
    status: 'Autopay',
    method: 'Cashback Credit / ***7721',
  },
];

const recentTransfers = [
  {
    id: 'transfer-001',
    description: 'Vault top up',
    amount: 500,
    date: '2025-09-18',
    source: 'Everyday Checking',
    destination: 'Rainy Day Savings',
  },
  {
    id: 'transfer-002',
    description: 'Brokerage funding',
    amount: 750,
    date: '2025-09-15',
    source: 'High-Yield Savings',
    destination: 'Investments',
  },
];

const peopleShortcuts = [
  {
    id: 'person-001',
    name: 'Avery Chen',
    handle: '@averychen',
    cadence: 'Weekly split',
  },
  {
    id: 'person-002',
    name: 'Jordan Bell',
    handle: '@jordanb',
    cadence: 'Monthly rent',
  },
  {
    id: 'person-003',
    name: 'Samira Patel',
    handle: '@samira',
    cadence: 'Last sent 4 days ago',
  },
];

export default function PaymentsPage() {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  return (
    <>
      <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Money movement</p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Payments hub</h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-400">
              Track every scheduled bill, keep transfers organized, and quickly reimburse the people you trust - all from a
              single command center.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaymentModalOpen(true)}
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80"
            >
              New payment
            </button>
            <button
              type="button"
              onClick={() => setTransferModalOpen(true)}
              className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-primary/40"
            >
              Create transfer
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <UpcomingPayments />
            <TransfersPanel onCreateTransfer={() => setTransferModalOpen(true)} />
          </div>
          <aside className="space-y-6">
            <PeopleShortcuts />
            <PaymentGuidance />
          </aside>
        </section>
      </main>

      <PaymentModal open={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
      <TransferModal open={isTransferModalOpen} onClose={() => setTransferModalOpen(false)} />
    </>
  );
}

function UpcomingPayments() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Upcoming bills</h2>
          <p className="text-sm text-zinc-500">Autopay, drafts, and scheduled disbursements for the next 30 days.</p>
        </div>
        <Link href="#" className="text-sm text-primary">
          Manage payees
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {upcomingPayments.map((payment) => (
          <article
            key={payment.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/5 bg-cardMuted/60 px-5 py-4 text-sm text-zinc-300"
          >
            <div>
              <p className="text-base font-semibold text-white">{payment.payee}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{payment.method}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">Due {new Date(payment.dueDate).toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(payment.amount)}</p>
            </div>
            <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
              {payment.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function TransfersPanel({ onCreateTransfer }: { onCreateTransfer: () => void }) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Transfers workspace</h2>
          <p className="text-sm text-zinc-500">
            Move funds instantly or schedule future-dated transfers between accounts and partners.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateTransfer}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          <ArrowRightLeft size={16} />
          Launch flow
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {recentTransfers.map((transfer) => (
          <article
            key={transfer.id}
            className="rounded-3xl border border-white/5 bg-cardMuted/60 p-4 shadow-innerGlow"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{transfer.date}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{transfer.description}</h3>
            <p className="mt-1 text-sm text-zinc-500">
              {transfer.source} <span aria-hidden="true">&rarr;</span> {transfer.destination}
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(transfer.amount)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PeopleShortcuts() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">People shortcuts</h2>
        <Link href="#" className="text-sm text-primary">
          View directory
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Trusted recipients and typical cadences to keep reimbursements effortless.</p>

      <div className="mt-4 space-y-3">
        {peopleShortcuts.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-white">{person.name}</p>
              <p className="text-xs text-zinc-500">{person.handle}</p>
            </div>
            <p className="text-xs text-zinc-400">{person.cadence}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PaymentGuidance() {
  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-card p-6 shadow-glass">
      <h2 className="text-lg font-semibold text-white">Optimize autopay</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Align your due dates with payroll, pause subscriptions with one tap, and get proactive alerts before balances
        dip too low for an upcoming debit.
      </p>
      <button className="mt-4 inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
        Review recommendations
      </button>
    </section>
  );
}

function Modal({ open, onClose, title, description, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = description ? `${titleId}-description` : undefined;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const focusableElement = panelRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusableElement ?? panelRef.current)?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[#121221] p-6 text-zinc-200 shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-2xl font-semibold text-white">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-2 text-sm text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-primary/40 hover:text-primary"
          >
            <X size={18} />
          </button>
        </header>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

function PaymentModal({ open, onClose }: ModalControllerProps) {
  const payeeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      payeeRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule new payment"
      description="Send funds to vendors or partners, choose the funding account, and lock in the timing before confirming."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <CreditCard size={14} className="text-primary" /> Payee name
            </span>
            <input
              ref={payeeRef}
              name="payee"
              placeholder="Acme Services"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <CreditCard size={14} className="text-primary" /> Funding account
            </span>
            <select
              name="funding-account"
              required
              defaultValue=""
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="" disabled>
                Choose an account
              </option>
              <option value="checking">Everyday Checking ****8123</option>
              <option value="savings">High-Yield Savings ****0042</option>
              <option value="credit">Cashback Credit ****7721</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Calendar size={14} className="text-primary" /> Payment date
            </span>
            <input
              type="date"
              name="payment-date"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <CreditCard size={14} className="text-primary" /> Amount
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              name="amount"
              placeholder="0.00"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
        </div>

        <label className="block text-sm text-zinc-400">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <Clock size={14} className="text-primary" /> Memo (optional)
          </span>
          <textarea
            name="memo"
            rows={3}
            placeholder="Add internal notes or payment instructions"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-cardMuted/40 p-4 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-sm text-white">
            <Clock size={16} className="text-primary" />
            Confirmation happens on the next step.
          </p>
          <p>We will route you through a final review screen before funds leave your account.</p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-glass transition hover:bg-primary/80"
          >
            Schedule payment
          </button>
        </div>
      </form>
    </Modal>
  );
}

function TransferModal({ open, onClose }: ModalControllerProps) {
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      amountRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create transfer"
      description="Rebalance funds between internal accounts or trusted partners and choose the delivery speed."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <ArrowRightLeft size={14} className="text-primary" /> From account
            </span>
            <select
              name="from-account"
              defaultValue=""
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="" disabled>
                Select source
              </option>
              <option value="checking">Everyday Checking ****8123</option>
              <option value="savings">High-Yield Savings ****0042</option>
              <option value="treasury">Global Treasury Checking ****2150</option>
            </select>
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <ArrowRightLeft size={14} className="text-primary" /> To account
            </span>
            <select
              name="to-account"
              defaultValue=""
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="" disabled>
                Select destination
              </option>
              <option value="savings">Venture Reserve Savings ****8891</option>
              <option value="operations">Operations Checking ****6124</option>
              <option value="investment">Brokerage Partner ****4010</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <CreditCard size={14} className="text-primary" /> Amount
            </span>
            <input
              ref={amountRef}
              type="number"
              min="0"
              step="0.01"
              name="transfer-amount"
              placeholder="0.00"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Clock size={14} className="text-primary" /> Delivery
            </span>
            <div className="mt-2 flex gap-2">
              <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-cardMuted/50 px-3 py-2 text-sm text-zinc-300 transition hover:border-primary/40">
                <input type="radio" name="delivery" value="standard" defaultChecked className="accent-primary" />
                Standard (1-2 business days)
              </label>
              <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-cardMuted/50 px-3 py-2 text-sm text-zinc-300 transition hover:border-primary/40">
                <input type="radio" name="delivery" value="instant" className="accent-primary" />
                Instant (fees apply)
              </label>
            </div>
          </label>
        </div>

        <label className="block text-sm text-zinc-400">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <Calendar size={14} className="text-primary" /> Schedule (optional)
          </span>
          <input
            type="date"
            name="transfer-date"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="block text-sm text-zinc-400">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <CreditCard size={14} className="text-primary" /> Memo (optional)
          </span>
          <textarea
            name="transfer-memo"
            rows={3}
            placeholder="Explain why you're moving funds"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-cardMuted/40 p-4 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-sm text-white">
            <ArrowRightLeft size={16} className="text-primary" />
            Transfers are verified before release.
          </p>
          <p>We will double-check receiving details and give you a chance to adjust fees and timing.</p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-glass transition hover:bg-primary/80"
          >
            Initiate transfer
          </button>
        </div>
      </form>
    </Modal>
  );
}


