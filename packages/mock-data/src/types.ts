export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  accountNumber: string;
}

export interface CardSummary {
  id: string;
  label: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  balance: number;
  creditLimit: number;
  accentColor: string;
}

export interface SpendingCategory {
  id: string;
  label: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down';
}

export interface Transaction {
  id: string;
  description: string;
  merchant: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  direction: 'debit' | 'credit';
}

export interface FinancialSnapshot {
  totalBalance: number;
  incomeThisMonth: number;
  spendingThisMonth: number;
  currency: string;
}

