import Link from 'next/link';
import type { ReactNode } from 'react';

type Breadcrumb = {
  label: string;
  href?: string;
};

type DetailLayoutProps = {
  breadcrumbs: Breadcrumb[];
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  maxWidthClassName?: string;
};

export function DetailLayout({
  breadcrumbs,
  title,
  description,
  actions,
  children,
  maxWidthClassName = 'md:max-w-5xl',
}: DetailLayoutProps) {
  return (
    <main className={`mx-auto flex min-h-screen flex-col gap-10 px-6 pb-16 pt-20 ${maxWidthClassName}`}>
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="text-zinc-400 transition hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-zinc-500">{crumb.label}</span>
                )}
                {!isLast ? <span aria-hidden="true" className="text-zinc-700">›</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">{description}</p>
        </div>
        {actions}
      </header>

      {children}
    </main>
  );
}

export type { Breadcrumb };
