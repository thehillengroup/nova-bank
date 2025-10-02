import Link from 'next/link';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Money movement</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Payments hub</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Track every scheduled bill, keep transfers organized, and quickly reimburse the people you trust�all from a
            single command center.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80">
            New payment
          </button>
          <button className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-primary/40">
            Create transfer
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <UpcomingPayments />
          <TransfersPanel />
        </div>
        <aside className="space-y-6">
          <PeopleShortcuts />
          <PaymentGuidance />
        </aside>
      </section>
    </main>
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
              <p className="text-lg font-semibold text-white">{currency.format(payment.amount)}</p>
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

function TransfersPanel() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Transfers workspace</h2>
          <p className="text-sm text-zinc-500">
            Move funds instantly or schedule future-dated transfers between accounts and partners.
          </p>
        </div>
        <button className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10">
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
            <p className="mt-4 text-2xl font-semibold text-white">{currency.format(transfer.amount)}</p>
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
