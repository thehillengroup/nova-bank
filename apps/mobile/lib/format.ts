type CurrencyCode = string;

export const createCurrencyFormatter = (currency: CurrencyCode) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

export const formatCurrency = (value: number, formatter: Intl.NumberFormat) =>
  formatter.format(value);

export const formatDirectionalAmount = (
  value: number,
  formatter: Intl.NumberFormat,
  direction: 'credit' | 'debit',
) => {
  const absolute = formatter.format(Math.abs(value));
  if (value === 0) {
    return absolute;
  }
  return direction === 'credit' ? `+${absolute}` : `-${absolute}`;
};
