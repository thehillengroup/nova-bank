import { Account, CardSummary, FinancialSnapshot, SpendingCategory, Transaction } from './types';

export const primarySnapshot: FinancialSnapshot = {
  totalBalance: 12460.54,
  incomeThisMonth: 8420.12,
  spendingThisMonth: 3260.34,
  currency: 'USD'
};

export const accounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Everyday Checking',
    type: 'checking',
    balance: 6280.18,
    currency: 'USD',
    accountNumber: '***8123'
  },
  {
    id: 'acc-002',
    name: 'High-Yield Savings',
    type: 'savings',
    balance: 4200.11,
    currency: 'USD',
    accountNumber: '***0042'
  },
  {
    id: 'acc-003',
    name: 'Cashback Credit',
    type: 'credit',
    balance: -640.75,
    currency: 'USD',
    accountNumber: '***7721'
  }
];

export const cards: CardSummary[] = [
  {
    id: 'card-001',
    label: 'All Access Platinum',
    brand: 'visa',
    last4: '8123',
    balance: 1240.54,
    creditLimit: 5000,
    accentColor: '#4f46e5'
  },
  {
    id: 'card-002',
    label: 'Travel Rewards',
    brand: 'amex',
    last4: '9910',
    balance: 824.21,
    creditLimit: 8000,
    accentColor: '#ec4899'
  }
];

export const spendingByCategory: SpendingCategory[] = [
  {
    id: 'cat-001',
    label: 'Essentials',
    amount: 1244.02,
    percentage: 42,
    trend: 'down'
  },
  {
    id: 'cat-002',
    label: 'Leisure',
    amount: 686.11,
    percentage: 23,
    trend: 'up'
  },
  {
    id: 'cat-003',
    label: 'Transfers',
    amount: 412.09,
    percentage: 14,
    trend: 'down'
  },
  {
    id: 'cat-004',
    label: 'Investments',
    amount: 290.12,
    percentage: 10,
    trend: 'up'
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: 'tx-001',
    description: 'Whole Foods Market',
    merchant: 'Whole Foods',
    category: 'Groceries',
    amount: -86.42,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'debit'
  },
  {
    id: 'tx-002',
    description: 'Midtown Coffee',
    merchant: 'Midtown Coffee',
    category: 'Dining',
    amount: -6.85,
    currency: 'USD',
    date: '2025-09-17',
    direction: 'debit'
  },
  {
    id: 'tx-003',
    description: 'Paycheck - Acme Corp',
    merchant: 'Acme Corp',
    category: 'Income',
    amount: 3250.0,
    currency: 'USD',
    date: '2025-09-15',
    direction: 'credit'
  },
  {
    id: 'tx-004',
    description: 'Lyft Ride',
    merchant: 'Lyft',
    category: 'Transport',
    amount: -18.33,
    currency: 'USD',
    date: '2025-09-14',
    direction: 'debit'
  }
];

