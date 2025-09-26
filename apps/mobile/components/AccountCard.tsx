import { Text, View } from 'react-native';
import type { Account } from '../../../packages/mock-data/src/types';

interface AccountCardProps {
  account: Account;
  formatAmount: (value: number) => string;
}

export function AccountCard({ account, formatAmount }: AccountCardProps) {
  return (
    <View className="rounded-3xl border border-white/5 bg-card p-5">
      <Text className="text-[10px] uppercase tracking-[4px] text-zinc-500">{account.type}</Text>
      <Text className="mt-2 text-base font-medium text-white">{account.name}</Text>
      <Text className="mt-5 text-3xl font-semibold text-white">{formatAmount(account.balance)}</Text>
      <Text className="mt-4 text-xs text-zinc-500">Account {account.accountNumber}</Text>
    </View>
  );
}
