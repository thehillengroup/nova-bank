import Link from 'next/link';

type BackPillLinkProps = {
  href: string;
  label: string;
};

export function BackPillLink({ href, label }: BackPillLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-primary/40"
    >
      <span aria-hidden="true" className="mr-2">&larr;</span>
      {label}
    </Link>
  );
}
