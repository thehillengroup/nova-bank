import { DetailLayout } from '../../../components/detail-layout';
import { BackPillLink } from '../../../components/back-pill-link';
import { spendingByCategory } from '@repo/mock-data';
import { formatCurrency } from '../../../lib/currency';

export default function CategoriesPage() {
  const total = spendingByCategory.reduce((sum, category) => sum + category.amount, 0);

  return (
    <DetailLayout
      breadcrumbs={[{ label: 'Analytics' }, { label: 'Financial insights', href: '/insights' }, { label: 'Refine categories' }]}
      title="Refine spending categories"
      description="Tune the buckets driving your dashboards. Edit allocations, rename categories, and toggle whether a category contributes to targets and alerts."
      actions={<BackPillLink href="/insights" label="Back to insights" />}
    >
      <section className="space-y-4">
        {spendingByCategory.map((category) => {
          const share = Math.round((category.amount / total) * 100);
          return (
            <article
              key={category.id}
              className="rounded-3xl border border-white/5 bg-card p-5 shadow-innerGlow transition hover:border-primary/30"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{category.label}</h2>
                  <p className="text-xs text-zinc-500">{category.percentage}% of monthly spend - {share}% share</p>
                </div>
                <p className="text-2xl font-semibold text-white">{formatCurrency(category.amount)}</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Alerts</p>
                  <p className="mt-1 text-sm text-zinc-300">Enabled - Notify at 20% variance</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Automation</p>
                  <p className="mt-1 text-sm text-zinc-300">Auto-move overflow to savings vault</p>
                </div>
                <div>
                  <button className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white hover:border-primary/40">
                    Edit category
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </DetailLayout>
  );
}
