import { DetailLayout } from '../../../components/detail-layout';
import { BackPillLink } from '../../../components/back-pill-link';
import { formatCurrency } from '../../../lib/currency';

const goals = [
  {
    id: 'goal-001',
    label: 'Emergency fund',
    target: 15000,
    progress: 9600,
    cadence: 'Every Friday',
    nudges: ['Pause transfers while balance < $5k', 'Enable high-yield sweep'],
  },
  {
    id: 'goal-002',
    label: 'Sabbatical savings',
    target: 12000,
    progress: 4100,
    cadence: '1st of every month',
    nudges: ['Increase cadence to bi-weekly', 'Auto-invest overflow to brokerage'],
  },
];

export default function GoalsPage() {
  return (
    <DetailLayout
      breadcrumbs={[{ label: 'Analytics' }, { label: 'Financial insights', href: '/insights' }, { label: 'Goal cadence' }]}
      title="Adjust goal cadence"
      description="Nudge timelines, update contribution rules, and preview how changes impact downstream cash flow."
      actions={<BackPillLink href="/insights" label="Back to insights" />}
      maxWidthClassName="md:max-w-4xl"
    >
      <section className="space-y-5">
        {goals.map((goal) => {
          const completion = Math.round((goal.progress / goal.target) * 100);
          return (
            <article key={goal.id} className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{goal.label}</h2>
                  <p className="text-xs text-zinc-500">Cadence - {goal.cadence}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Progress</p>
                  <p className="text-2xl font-semibold text-white">{completion}%</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5">
                <div className="h-full rounded-full bg-success" style={{ width: `${completion}%` }} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Current balance</p>
                  <p className="mt-1 text-sm text-zinc-300">{formatCurrency(goal.progress)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Target</p>
                  <p className="mt-1 text-sm text-zinc-300">{formatCurrency(goal.target)}</p>
                </div>
                <div className="flex items-start justify-end">
                  <button className="inline-flex items-center rounded-full border border-primary/40 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10">
                    Adjust cadence
                  </button>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {goal.nudges.map((message, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-zinc-300">
                    {message}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </DetailLayout>
  );
}
