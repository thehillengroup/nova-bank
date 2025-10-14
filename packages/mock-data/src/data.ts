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
    id: 'tx-046',
    description: 'Soho Bistro Dinner',
    merchant: 'Soho Bistro',
    category: 'Dining',
    amount: -142.67,
    currency: 'USD',
    date: '2025-09-24',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-047',
    description: 'Equinox Membership',
    merchant: 'Equinox',
    category: 'Health & wellness',
    amount: -275.00,
    currency: 'USD',
    date: '2025-09-23',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-048',
    description: 'Best Buy Electronics',
    merchant: 'Best Buy',
    category: 'Electronics',
    amount: -485.39,
    currency: 'USD',
    date: '2025-09-22',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-049',
    description: 'Uber Black Ride',
    merchant: 'Uber',
    category: 'Transport',
    amount: -36.48,
    currency: 'USD',
    date: '2025-09-21',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-050',
    description: 'Blue Bottle Coffee Reload',
    merchant: 'Blue Bottle',
    category: 'Dining',
    amount: -25.00,
    currency: 'USD',
    date: '2025-09-20',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-051',
    description: 'Apple Music Subscription',
    merchant: 'Apple',
    category: 'Subscriptions',
    amount: -14.99,
    currency: 'USD',
    date: '2025-09-19',
    direction: 'debit',
    cardId: 'card-001'
  },
  {
    id: 'tx-011',
    description: 'Delta Airlines Seat Upgrade',
    merchant: 'Delta Airlines',
    category: 'Travel',
    amount: -645.33,
    currency: 'USD',
    date: '2025-09-24',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-012',
    description: 'Marriott Downtown Stay',
    merchant: 'Marriott Hotels',
    category: 'Lodging',
    amount: -512.45,
    currency: 'USD',
    date: '2025-09-23',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-013',
    description: 'Uber Business Ride',
    merchant: 'Uber Business',
    category: 'Transport',
    amount: -48.12,
    currency: 'USD',
    date: '2025-09-23',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-014',
    description: 'Global Summit Registration',
    merchant: 'Summit Events',
    category: 'Professional services',
    amount: -899,
    currency: 'USD',
    date: '2025-09-22',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-015',
    description: 'Office Depot Supplies',
    merchant: 'Office Depot',
    category: 'Operations',
    amount: -284.77,
    currency: 'USD',
    date: '2025-09-22',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-016',
    description: 'Adobe Creative Cloud Seats',
    merchant: 'Adobe',
    category: 'Software',
    amount: -129.99,
    currency: 'USD',
    date: '2025-09-22',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-017',
    description: 'Circuit Board Vendor',
    merchant: 'Electro Components Co.',
    category: 'Manufacturing',
    amount: -1420.5,
    currency: 'USD',
    date: '2025-09-21',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-018',
    description: 'Shell Fleet Fuel',
    merchant: 'Shell Fleet',
    category: 'Fuel',
    amount: -236.18,
    currency: 'USD',
    date: '2025-09-21',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-019',
    description: 'Field Meals Per Diem',
    merchant: 'Field Dining',
    category: 'Meals',
    amount: -186.4,
    currency: 'USD',
    date: '2025-09-21',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-020',
    description: 'Site Supplies Pickup',
    merchant: 'Builders Supply',
    category: 'Operations',
    amount: -94.28,
    currency: 'USD',
    date: '2025-09-20',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-021',
    description: 'Vendor Payout - Horizon',
    merchant: 'Horizon Components',
    category: 'Vendor payments',
    amount: 3200,
    currency: 'USD',
    date: '2025-09-20',
    direction: 'credit',
    cardId: 'card-005'
  },
  {
    id: 'tx-022',
    description: 'DHL Freight Imports',
    merchant: 'DHL Express',
    category: 'Logistics',
    amount: -612.9,
    currency: 'USD',
    date: '2025-09-19',
    direction: 'debit',
    cardId: 'card-005'
  },
  {
    id: 'tx-023',
    description: 'Packaging Materials',
    merchant: 'PackRight',
    category: 'Supplies',
    amount: -351.22,
    currency: 'USD',
    date: '2025-09-19',
    direction: 'debit',
    cardId: 'card-005'
  },
  {
    id: 'tx-024',
    description: 'International Roaming Bundle',
    merchant: 'GlobalTel',
    category: 'Mobile',
    amount: -74.6,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-025',
    description: 'Delta Sky Club Passes',
    merchant: 'Delta Airlines',
    category: 'Travel',
    amount: -118,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-026',
    description: 'Safety Equipment Order',
    merchant: 'SecureWorks',
    category: 'Operations',
    amount: -462.75,
    currency: 'USD',
    date: '2025-09-18',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-027',
    description: 'Regional Hotel - Field Ops',
    merchant: 'Holiday Inn Express',
    category: 'Lodging',
    amount: -289.44,
    currency: 'USD',
    date: '2025-09-17',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-028',
    description: 'On-Site Catering',
    merchant: 'Field Bites Catering',
    category: 'Meals',
    amount: -412.35,
    currency: 'USD',
    date: '2025-09-17',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-029',
    description: 'Supplier Rebate - Midwest Steel',
    merchant: 'Midwest Steel',
    category: 'Rebates',
    amount: 540,
    currency: 'USD',
    date: '2025-09-17',
    direction: 'credit',
    cardId: 'card-005'
  },
  {
    id: 'tx-030',
    description: 'Marketing Print Run',
    merchant: 'Print Studio',
    category: 'Marketing',
    amount: -327.88,
    currency: 'USD',
    date: '2025-09-16',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-031',
    description: 'Analytics Pro Renewal',
    merchant: 'Analytics Pro',
    category: 'Software',
    amount: -699,
    currency: 'USD',
    date: '2025-09-16',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-032',
    description: 'Lyft Business Ride',
    merchant: 'Lyft Business',
    category: 'Transport',
    amount: -22.75,
    currency: 'USD',
    date: '2025-09-16',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-033',
    description: 'Airport Parking',
    merchant: 'Park N Fly',
    category: 'Travel',
    amount: -68.5,
    currency: 'USD',
    date: '2025-09-15',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-034',
    description: 'Dry Ice Delivery',
    merchant: 'Polar Logistics',
    category: 'Operations',
    amount: -54.6,
    currency: 'USD',
    date: '2025-09-15',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-035',
    description: 'Customs Processing Fee',
    merchant: 'Global Brokerage',
    category: 'Logistics',
    amount: -312.2,
    currency: 'USD',
    date: '2025-09-15',
    direction: 'debit',
    cardId: 'card-005'
  },
  {
    id: 'tx-036',
    description: 'Local Courier Service',
    merchant: 'Metro Courier',
    category: 'Logistics',
    amount: -97.8,
    currency: 'USD',
    date: '2025-09-14',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-037',
    description: 'Software Seat Expansion',
    merchant: 'CollabSuite',
    category: 'Software',
    amount: -210,
    currency: 'USD',
    date: '2025-09-14',
    direction: 'debit',
    cardId: 'card-003'
  },
  {
    id: 'tx-038',
    description: 'Training Seminar Registration',
    merchant: 'SkillWorks',
    category: 'Professional services',
    amount: -485,
    currency: 'USD',
    date: '2025-09-14',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-039',
    description: 'Emergency Parts Purchase',
    merchant: 'RapidParts',
    category: 'Operations',
    amount: -268.9,
    currency: 'USD',
    date: '2025-09-14',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-040',
    description: 'Vendor Refund - Travel Desk',
    merchant: 'Corporate Travel Desk',
    category: 'Refunds',
    amount: 185.6,
    currency: 'USD',
    date: '2025-09-13',
    direction: 'credit',
    cardId: 'card-002'
  },
  {
    id: 'tx-041',
    description: 'Warehouse Lighting Upgrade',
    merchant: 'BrightLight Supply',
    category: 'Facilities',
    amount: -742.85,
    currency: 'USD',
    date: '2025-09-13',
    direction: 'debit',
    cardId: 'card-005'
  },
  {
    id: 'tx-042',
    description: 'Catering Supplies',
    merchant: 'ChefSource',
    category: 'Operations',
    amount: -198.45,
    currency: 'USD',
    date: '2025-09-12',
    direction: 'debit',
    cardId: 'card-005'
  },
  {
    id: 'tx-043',
    description: 'Team Dinner Reimbursement',
    merchant: 'City Steakhouse',
    category: 'Meals',
    amount: -164.3,
    currency: 'USD',
    date: '2025-09-12',
    direction: 'debit',
    cardId: 'card-004'
  },
  {
    id: 'tx-044',
    description: 'RideShare Voucher Top-up',
    merchant: 'Uber Business',
    category: 'Transport',
    amount: -120,
    currency: 'USD',
    date: '2025-09-12',
    direction: 'debit',
    cardId: 'card-002'
  },
  {
    id: 'tx-045',
    description: 'Conference Swag Vendor',
    merchant: 'PromoWorks',
    category: 'Marketing',
    amount: -382.5,
    currency: 'USD',
    date: '2025-09-12',
    direction: 'debit',
    cardId: 'card-003'
  },
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
