import { Text, View } from 'react-native';
import type { Transaction } from '../../../packages/mock-data/src/types';

interface TransactionRowProps {
  transaction: Transaction;
  amountLabel: string;
}

export function TransactionRow({ transaction, amountLabel }: TransactionRowProps) {
  const amountColor = transaction.direction === 'credit' ? '#22c55e' : '#f87171';

  return (
    <View className="flex-row items-center justify-between rounded-2xl bg-cardMuted/80 px-4 py-3">
      <View>
        <Text className="text-sm font-medium text-white">{transaction.description}</Text>
        <Text className="text-[11px] text-zinc-500">{new Date(transaction.date).toLocaleDateString()}</Text>
      </View>
      <Text className="text-sm font-semibold" style={{ color: amountColor }}>
        {amountLabel}
      </Text>
    </View>
  );
}
