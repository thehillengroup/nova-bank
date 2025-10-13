import { Account, CardSummary, FinancialSnapshot, SpendingCategory, Transaction } from './types';

export const primarySnapshot: FinancialSnapshot = {
  totalBalance: 49880.33,
  incomeThisMonth: 18240.58,
  spendingThisMonth: 9680.41,
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
  },
  {
    id: 'acc-004',
    name: 'Global Treasury Checking',
    type: 'checking',
    balance: 24150.67,
    currency: 'USD',
    accountNumber: '***2150'
  },
  {
    id: 'acc-005',
    name: 'Venture Reserve Savings',
    type: 'savings',
    balance: 15890.12,
    currency: 'USD',
    accountNumber: '***8891'
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
  },
  {
    id: 'card-003',
    label: 'Corporate Purchasing',
    brand: 'mastercard',
    last4: '4431',
    balance: 1458.11,
    creditLimit: 12000,
    accentColor: '#22d3ee'
  },
  {
    id: 'card-004',
    label: 'Field Operations Debit',
    brand: 'visa',
    last4: '0074',
    balance: 248.94,
    creditLimit: 2500,
    accentColor: '#f97316'
  },
  {
    id: 'card-005',
    label: 'Supplier Rewards',
    brand: 'discover',
    last4: '5520',
    balance: 678.42,
    creditLimit: 6000,
    accentColor: '#10b981'
  }
];

export const spendingByCategory: SpendingCategory[] = [
  {
    id: 'cat-001',
    label: 'Essentials',
    amount: 1344.82,
    percentage: 34,
    trend: 'down'
  },
  {
    id: 'cat-002',
    label: 'Leisure',
    amount: 918.66,
    percentage: 21,
    trend: 'up'
  },
  {
    id: 'cat-003',
    label: 'Transfers',
    amount: 512.09,
    percentage: 16,
    trend: 'down'
  },
  {
    id: 'cat-004',
    label: 'Investments',
    amount: 410.12,
    percentage: 11,
    trend: 'up'
  },
  {
    id: 'cat-005',
    label: 'Operations',
    amount: 351.87,
    percentage: 10,
    trend: 'up'
  },
  {
    id: 'cat-006',
    label: 'Travel & Events',
    amount: 268.44,
    percentage: 8,
    trend: 'up'
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: 'tx-010',
    description: 'Stripe Settlement',
    merchant: 'Stripe',
    category: 'Incoming payments',
    amount: 4100.72,
    currency: 'USD',
    date: '2025-09-21',
    direction: 'credit'
  },
  {
    id: 'tx-009',
    description: 'Boulder Workspace Rent',
    merchant: 'Flatiron Properties',
    category: 'Facilities',
    amount: -2650,
    currency: 'USD',
    date: '2025-09-20',
    direction: 'debit'
  },
  {
    id: 'tx-008',
    description: 'Team Offsite Deposit',
    merchant: 'Aspen Lodge',
    category: 'Travel',
    amount: -1023.5,
    currency: 'USD',
    date: '2025-09-19',
    direction: 'debit'
  },
  {
    id: 'tx-007',
    description: 'Figma Subscription',
    merchant: 'Figma',
    category: 'Software',
    amount: -54,
    currency: 'USD',
    date: '2025-09-19',
    direction: 'debit'
  },
  {
    id: 'tx-006',
    description: 'Expense Reimbursement - Product Team',
    merchant: 'Nova Bank',
    category: 'Reimbursements',
    amount: 214.22,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'credit'
  },
  {
    id: 'tx-005',
    description: 'AWS Marketplace',
    merchant: 'Amazon Web Services',
    category: 'Cloud infrastructure',
    amount: -482.9,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'debit'
  },
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
    amount: 3250,
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
