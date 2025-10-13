'use client';

import { X, ArrowRightLeft, Calendar, Clock, CreditCard, Search, Mail, Phone, UserPlus, Users } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
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
type ManagedPayee = {
  id: string;
  name: string;
  category: string;
  fundingAccount: string;
  cadence: string;
  status: 'Autopay' | 'Scheduled' | 'Draft';
};
const PAYEES_STORAGE_KEY = 'payments.managePayees';
const initialManagedPayees: ManagedPayee[] = [
  {
    id: 'payee-001',
    name: 'City Utilities',
    category: 'Utilities',
    fundingAccount: 'Checking ****8123',
    cadence: 'Monthly on the 25th',
    status: 'Autopay',
  },
  {
    id: 'payee-002',
    name: 'Premier Mortgage',
    category: 'Loans',
    fundingAccount: 'Checking ****8123',
    cadence: 'Monthly on the 28th',
    status: 'Scheduled',
  },
  {
    id: 'payee-003',
    name: 'Northside Fitness',
    category: 'Wellness',
    fundingAccount: 'Credit ****7721',
    cadence: 'Monthly on the 2nd',
    status: 'Autopay',
  },
  {
    id: 'payee-004',
    name: 'Riverwalk Cowork',
    category: 'Workspace',
    fundingAccount: 'Treasury ****2150',
    cadence: 'Quarterly on the 1st',
    status: 'Draft',
  },
];

const directoryContacts = [
  {
    id: 'contact-001',
    name: 'Avery Chen',
    handle: '@averychen',
    email: 'avery.chen@example.com',
    phone: '+1 (415) 555-0134',
    notes: 'Operations - weekly reimbursements',
  },
  {
    id: 'contact-002',
    name: 'Jordan Bell',
    handle: '@jordanb',
    email: 'jordan.bell@example.com',
    phone: '+1 (646) 555-0191',
    notes: 'Real estate - monthly rent splits',
  },
  {
    id: 'contact-003',
    name: 'Samira Patel',
    handle: '@samira',
    email: 'samira.patel@example.com',
    phone: '+1 (206) 555-0178',
    notes: 'Product - ad hoc project expenses',
  },
  {
    id: 'contact-004',
    name: 'Leon Rivers',
    handle: '@leon',
    email: 'leon.rivers@example.com',
    phone: '+1 (512) 555-0112',
    notes: 'Vendors - annual retainers',
  },
  {
    id: 'contact-005',
    name: 'Nina Alvarez',
    handle: '@nina',
    email: 'nina.alvarez@example.com',
    phone: '+1 (213) 555-0145',
    notes: 'Finance - quarterly vendor audits',
  },
  {
    id: 'contact-006',
    name: 'Elliot Ford',
    handle: '@elliot',
    email: 'elliot.ford@example.com',
    phone: '+1 (303) 555-0189',
    notes: 'Marketing - campaign reimbursements',
  },
  {
    id: 'contact-007',
    name: 'Priya Nayar',
    handle: '@priya',
    email: 'priya.nayar@example.com',
    phone: '+1 (617) 555-0153',
    notes: 'Legal - retainer settlements',
  },
  {
    id: 'contact-008',
    name: 'Marcus Green',
    handle: '@marcus',
    email: 'marcus.green@example.com',
    phone: '+1 (305) 555-0199',
    notes: 'Field ops - travel advances',
  },
];


export default function PaymentsPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: 'success' | 'error' } | null>(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [isPayeesModalOpen, setPayeesModalOpen] = useState(false);
  const [isAddPayeeModalOpen, setAddPayeeModalOpen] = useState(false);
  const [payees, setPayees] = useState<ManagedPayee[]>(initialManagedPayees);
  const [isDirectoryModalOpen, setDirectoryModalOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(PAYEES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPayees(parsed as ManagedPayee[]);
        }
      }
    } catch (error) {
      console.error('Failed to load payees', error);
      setFeedback({ message: 'Unable to load saved payees.', tone: "error" });
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(PAYEES_STORAGE_KEY, JSON.stringify(payees));
    } catch (error) {
      console.error('Failed to persist payees', error);
      setFeedback({ message: 'Unable to save payees.', tone: "error" });
    }
  }, [isHydrated, payees]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  return (
    <>
      {feedback ? (
        <div
          role="status"
          className={`mb-4 rounded-3xl border px-4 py-3 text-sm font-medium shadow-glass ${feedback.tone === "success" ? "border-green-400/40 bg-green-500/10 text-green-200" : "border-red-400/40 bg-red-500/10 text-red-200"}`}
        >
          {feedback.message}
        </div>
      ) : null}
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
            <UpcomingPayments onManagePayees={() => setPayeesModalOpen(true)} />
            <TransfersPanel onCreateTransfer={() => setTransferModalOpen(true)} />
          </div>
          <aside className="space-y-6">
            <PeopleShortcuts onViewDirectory={() => setDirectoryModalOpen(true)} />
            <PaymentGuidance />
          </aside>
        </section>
      </main>

      <PaymentModal open={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
      <ManagePayeesModal
        open={isPayeesModalOpen}
        onClose={() => setPayeesModalOpen(false)}
        payees={payees}
        onRequestAdd={() => setAddPayeeModalOpen(true)}
      />
      <AddPayeeModal
        open={isAddPayeeModalOpen}
        onClose={() => setAddPayeeModalOpen(false)}
        onSubmit={(newPayee) => {
          setPayees((previous) => [newPayee, ...previous]);
          setAddPayeeModalOpen(false);
          setPayeesModalOpen(true);
          setFeedback({ message: `${newPayee.name} was added to payees.`, tone: "success" });
        }}
      />
      <TransferModal open={isTransferModalOpen} onClose={() => setTransferModalOpen(false)} />
      <DirectoryModal open={isDirectoryModalOpen} onClose={() => setDirectoryModalOpen(false)} />
    </>
  );
}

function UpcomingPayments({ onManagePayees }: { onManagePayees: () => void }) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Upcoming bills</h2>
          <p className="text-sm text-zinc-500">Autopay, drafts, and scheduled disbursements for the next 30 days.</p>
        </div>
        <button
          type="button"
          onClick={onManagePayees}
          className="text-sm text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Manage payees
        </button>
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

function PeopleShortcuts({ onViewDirectory }: { onViewDirectory: () => void }) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">People shortcuts</h2>
        <button
          type="button"
          onClick={onViewDirectory}
          className="text-sm text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View directory
        </button>
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
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[#121221] p-6 text-zinc-200 shadow-2xl max-h-[90vh] overflow-hidden"
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

        <div className="mt-6 max-h-[70vh] overflow-y-auto pr-1">{children}</div>
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
        </div>\r\n\r\n
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


function ManagePayeesModal({ open, onClose, payees, onRequestAdd }: ModalControllerProps & { payees: ManagedPayee[]; onRequestAdd: () => void }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 4;

  const filteredPayees = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return payees;
    }

    return payees.filter((payee) => {
      const haystack = `${payee.name} ${payee.category} ${payee.fundingAccount} ${payee.cadence} ${payee.status}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [query, payees]);

  const autopayCount = filteredPayees.filter((payee) => payee.status === 'Autopay').length;
  const scheduledCount = filteredPayees.filter((payee) => payee.status === 'Scheduled').length;
  const draftCount = filteredPayees.filter((payee) => payee.status === 'Draft').length;

  const totalPages = Math.max(1, Math.ceil(filteredPayees.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredPayees.length);
  const visiblePayees = filteredPayees.slice(startIndex, endIndex);
  const hasResults = filteredPayees.length > 0;

  useEffect(() => {
    setPage(0);
  }, [query]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setPage(0);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const handlePrev = () => {
    setPage((value) => Math.max(0, value - 1));
  };

  const handleNext = () => {
    setPage((value) => Math.min(totalPages - 1, value + 1));
  };

  const showingLabel = hasResults ? `${startIndex + 1}-${endIndex} of ${filteredPayees.length}` : '0 of 0';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage payees"
      description="Review vendor profiles, adjust funding accounts, and tune autopay cadences."
    >
      <div className="space-y-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-cardMuted/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Autopay</p>
            <p className="mt-1 text-2xl font-semibold text-white">{autopayCount}</p>
            <p className="text-xs text-zinc-500">Active recurring payments</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-cardMuted/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Scheduled</p>
            <p className="mt-1 text-2xl font-semibold text-white">{scheduledCount}</p>
            <p className="text-xs text-zinc-500">Awaiting confirmation</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-cardMuted/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Drafts</p>
            <p className="mt-1 text-2xl font-semibold text-white">{draftCount}</p>
            <p className="text-xs text-zinc-500">Need review before sending</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-zinc-400 md:max-w-md">
            <Search size={16} className="text-primary" />
            <input
              type="search"
              name="payee-search"
              placeholder="Search payees"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </label>
          <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-center sm:text-right">Showing {showingLabel}</span>
            <button
              type="button"
              onClick={onRequestAdd}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <UserPlus size={16} />
              Add payee
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {hasResults ? (
            visiblePayees.map((payee) => (
              <div key={payee.id} className="rounded-2xl border border-white/10 bg-cardMuted/60 p-4 text-sm text-zinc-300">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{payee.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{payee.category}</p>
                  </div>
                  <span className="inline-flex self-start rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                    {payee.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
                  <p>{payee.fundingAccount}</p>
                  <p>{payee.cadence}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary"
                  >
                    <CreditCard size={14} className="text-primary" />
                    Funding
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary"
                  >
                    <Calendar size={14} className="text-primary" />
                    Schedule
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-cardMuted/40 p-6 text-center text-sm text-zinc-400">
              No payees match your filters yet. Try another name or add a new partner.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0 || !hasResults}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1 || !hasResults}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}
function AddPayeeModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (payee: ManagedPayee) => void }) {
  const [formError, setFormError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      nameRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get('payee-name') as string | null)?.trim() ?? '';
    const category = (formData.get('payee-category') as string | null)?.trim() ?? '';
    const fundingAccount = (formData.get('payee-account') as string | null)?.trim() ?? '';
    const cadence = (formData.get('payee-cadence') as string | null)?.trim() ?? '';
    const status = (formData.get('payee-status') as ManagedPayee['status'] | null) ?? 'Scheduled';

    if (!name || !category || !fundingAccount || !cadence) {
      setFormError("All fields are required.");
      return;
    }

    const newPayee: ManagedPayee = {
      id: `payee-${Date.now()}`,
      name,
      category,
      fundingAccount,
      cadence,
      status,
    };

    try {
      onSubmit(newPayee);
      setFormError(null);
      event.currentTarget.reset();
      onClose();
    } catch (error) {
      console.error('Failed to add payee', error);
      setFormError('Unable to add payee. Try again.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add payee"
      description="Create a new vendor profile with routing defaults before scheduling payments."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <UserPlus size={14} className="text-primary" /> Payee name
            </span>
            <input
              ref={nameRef}
              name="payee-name"
              placeholder="Brightline Services"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Users size={14} className="text-primary" /> Category
            </span>
            <input
              name="payee-category"
              placeholder="Vendors"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <CreditCard size={14} className="text-primary" /> Funding account
            </span>
            <select
              name="payee-account"
              defaultValue=""
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="" disabled>
                Choose account
              </option>
              <option value="Everyday Checking ****8123">Everyday Checking ****8123</option>
              <option value="High-Yield Savings ****0042">High-Yield Savings ****0042</option>
              <option value="Global Treasury Checking ****2150">Global Treasury Checking ****2150</option>
              <option value="Cashback Credit ****7721">Cashback Credit ****7721</option>
            </select>
          </label>
          <label className="text-sm text-zinc-400">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Calendar size={14} className="text-primary" /> Cadence
            </span>
            <input
              name="payee-cadence"
              placeholder="Monthly on the 15th"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
        </div>

        <label className="text-sm text-zinc-400">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <Clock size={14} className="text-primary" /> Status
          </span>
          <select
            name="payee-status"
            defaultValue="Scheduled"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="Autopay">Autopay</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>
        </label>

        {formError ? (
          <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {formError}
          </div>
        ) : null}

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
            Save payee
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DirectoryModal({ open, onClose }: ModalControllerProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const filteredContacts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return directoryContacts;
    }

    return directoryContacts.filter((person) => {
      const haystack = `${person.name} ${person.handle} ${person.email} ${person.phone} ${person.notes}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredContacts.length);
  const visibleContacts = filteredContacts.slice(startIndex, endIndex);
  const hasResults = filteredContacts.length > 0;

  useEffect(() => {
    setPage(0);
  }, [query]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setPage(0);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const handlePrev = () => {
    setPage((value) => Math.max(0, value - 1));
  };

  const handleNext = () => {
    setPage((value) => Math.min(totalPages - 1, value + 1));
  };

  const showingLabel = hasResults ? `${startIndex + 1}-${endIndex} of ${filteredContacts.length}` : '0 of 0';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="People directory"
      description="Browse saved recipients, confirm handles, and initiate secure invites."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-cardMuted/60 px-4 py-3 text-sm text-zinc-400 md:max-w-md">
            <Search size={16} className="text-primary" />
            <input
              type="search"
              name="directory-search"
              placeholder="Search people or handles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </label>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            <UserPlus size={16} />
            Invite person
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-cardMuted/40 p-4 text-sm text-zinc-300">
          <div>
            <p className="text-sm font-semibold text-white">Team directory</p>
            <p className="text-xs text-zinc-500">Trusted and verified recipients</p>
          </div>
          <div className="flex items-center gap-3 text-primary">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span className="text-lg font-semibold">{filteredContacts.length}</span>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Showing {showingLabel}</span>
          </div>
        </div>

        <div className="space-y-3">
          {hasResults ? (
            visibleContacts.map((person) => (
              <div key={person.id} className="rounded-2xl border border-white/10 bg-cardMuted/60 p-4 text-sm text-zinc-300">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{person.name}</p>
                    <p className="text-xs text-primary">{person.handle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Mail size={14} className="text-primary" />
                    <span>{person.email}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-2 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <span>{person.phone}</span>
                  </div>
                  <p>{person.notes}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-cardMuted/40 p-6 text-center text-sm text-zinc-400">
              No people match your filters yet. Try another name or invite a new recipient.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0 || !hasResults}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1 || !hasResults}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}function TransferModal({ open, onClose }: ModalControllerProps) {
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

























































