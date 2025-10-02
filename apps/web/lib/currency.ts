const formatterCache = new Map<string, Intl.NumberFormat>();

type FormatCurrencyOptions = {
  currency?: string;
  locale?: string;
};

export function formatCurrency(value: number, options: FormatCurrencyOptions = {}): string {
  const { currency = 'USD', locale = 'en-US' } = options;
  const key = `${locale}-${currency}`;

  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });
    formatterCache.set(key, formatter);
  }

  return formatter.format(value);
}
