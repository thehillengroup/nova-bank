import Link from 'next/link';

const openCases = [
  {
    id: 'case-001',
    subject: 'Wire limit increase',
    lastUpdate: '2025-09-18T14:32:00Z',
    status: 'Awaiting documents',
    owner: 'Danielle (Support)',
  },
  {
    id: 'case-002',
    subject: 'Dispute Lyft charge',
    lastUpdate: '2025-09-16T09:15:00Z',
    status: 'Investigation ongoing',
    owner: 'Miguel (Risk)',
  },
];

const faqTopics = [
  {
    id: 'faq-001',
    question: 'How do I verify a new device?',
    answer:
      'Use the mobile app to approve the login push or confirm with the recovery codes generated in your profile.',
  },
  {
    id: 'faq-002',
    question: 'What limits apply to same-day wires?',
    answer:
      'Consumer accounts support up to $75,000 USD per day. Reach out if you need a temporary increase.',
  },
  {
    id: 'faq-003',
    question: 'Can I download transaction history as CSV?',
    answer: 'Yes. From any account detail page, select Export and choose CSV or OFX.',
  },
];

const statusChecks = [
  {
    id: 'status-001',
    service: 'Core banking',
    state: 'Operational',
    detail: 'Processing ACH and card authorizations normally.',
  },
  {
    id: 'status-002',
    service: 'Card network',
    state: 'Degraded',
    detail: 'Some contactless transactions are retrying. Auto failover engaged.',
  },
  {
    id: 'status-003',
    service: 'Mobile app',
    state: 'Operational',
    detail: 'No incidents reported in the last 72 hours.',
  },
];

const quickActions = [
  {
    id: 'qa-001',
    label: 'Message a specialist',
    description: 'Start a secure conversation with the right team in under a minute.',
  },
  {
    id: 'qa-002',
    label: 'Schedule a call',
    description: 'Book a 15 minute consult around your availability.',
  },
  {
    id: 'qa-003',
    label: 'Report card issue',
    description: 'Freeze, reissue, or grant temporary permissions while we investigate.',
  },
];

export default function SupportPage() {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Care team</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Support command</h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Reach your specialists, monitor incident updates, and self-serve the essentials without leaving the app.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-glass transition hover:bg-primary/80">
            New secure message
          </button>
          <button className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-primary/40">
            View knowledge base
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <ActiveCases />
          <FAQ />
        </div>
        <aside className="space-y-6">
          <QuickHelp />
          <ServiceStatus />
        </aside>
      </section>
    </main>
  );
}

function ActiveCases() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Open conversations</h2>
        <Link href="#" className="text-sm text-primary">
          View all cases
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Handshake with the teams already working on your requests.</p>

      <div className="mt-5 space-y-4">
        {openCases.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-white/5 bg-cardMuted/60 p-4 text-sm text-zinc-300"
          >
            <p className="text-base font-semibold text-white">{item.subject}</p>
            <p className="mt-1 text-xs text-zinc-500">{item.owner}</p>
            <p className="mt-3 text-xs text-zinc-400">Updated {new Date(item.lastUpdate).toLocaleString()}</p>
            <span className="mt-3 inline-flex w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
              {item.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Guides and answers</h2>
        <Link href="#" className="text-sm text-primary">
          Browse topics
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Straightforward runbooks to keep your operations unblocked.</p>

      <div className="mt-5 space-y-4">
        {faqTopics.map((topic) => (
          <article key={topic.id} className="rounded-3xl border border-white/5 bg-cardMuted/60 p-4">
            <h3 className="text-base font-semibold text-white">{topic.question}</h3>
            <p className="mt-2 text-sm text-zinc-400">{topic.answer}</p>
            <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open article
              <span aria-hidden="true">&rarr;</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickHelp() {
  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-card p-6 shadow-glass">
      <h2 className="text-lg font-semibold text-white">Quick help</h2>
      <p className="mt-2 text-sm text-zinc-300">Route yourself to the right playbook or human in seconds.</p>

      <div className="mt-4 space-y-3">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-white">{action.label}</p>
              <p className="text-xs text-zinc-400">{action.description}</p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white hover:border-primary/40">
              Start
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceStatus() {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Service status</h2>
        <Link href="#" className="text-sm text-primary">
          Subscribe to alerts
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">Real-time visibility into incidents that could impact your workflows.</p>

      <div className="mt-4 space-y-3">
        {statusChecks.map((status) => (
          <article
            key={status.id}
            className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-300"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{status.service}</p>
              <span
                className={`text-xs uppercase tracking-[0.3em] ${
                  status.state === 'Operational' ? 'text-success' : 'text-warning'
                }`}
              >
                {status.state}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">{status.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
