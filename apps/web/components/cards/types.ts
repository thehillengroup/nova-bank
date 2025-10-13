import type { CardSummary, Transaction } from '@repo/mock-data';

export type ControlDefinition = {
  id: string;
  label: string;
  description: string;
};

export type SpendInsight = {
  id: string;
  label: string;
  amount: number;
  change: number;
  direction: 'up' | 'down';
};

export type ActiveCardsProps = {
  cards: CardSummary[];
};

export type ControlCenterProps = {
  controls: ControlDefinition[];
};

export type SpendOverviewProps = {
  insights: SpendInsight[];
};

export type RecentCardActivityProps = {
  transactions: Transaction[];
};
