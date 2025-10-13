import Link from 'next/link';

import type { ControlCenterProps } from './types';

export function ControlCenter({ controls }: ControlCenterProps) {
  return (
    <section className="rounded-3xl border border-white/5 bg-card p-6 shadow-innerGlow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Control center</h2>
        <Link href="#" className="text-sm text-primary" aria-label="Configure card defaults">
          Configure defaults
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-500">
        Apply controls instantly to any card or cardholder group. Templates keep teams compliant.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {controls.map((control) => (
          <article
            key={control.id}
            className="rounded-3xl border border-white/5 bg-white/5 p-4 text-sm text-zinc-300"
            aria-label={`${control.label} control`}
          >
            <h3 className="text-base font-semibold text-white">{control.label}</h3>
            <p className="mt-2 text-xs text-zinc-500">{control.description}</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-primary transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Adjust ${control.label.toLowerCase()} settings`}
            >
              Adjust
              <span aria-hidden="true">&rarr;</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
