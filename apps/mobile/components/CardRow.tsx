import { Text, View } from 'react-native';
import type { CardSummary } from '../../../packages/mock-data/src/types';

interface CardRowProps {
  card: CardSummary;
  balanceLabel: string;
}

export function CardRow({ card, balanceLabel }: CardRowProps) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl bg-black/20 p-4">
      <View>
        <Text className="text-sm font-medium text-white">{card.label}</Text>
        <Text className="text-xs text-zinc-500">**** {card.last4}</Text>
      </View>
      <View className="items-end">
        <Text className="text-[10px] uppercase tracking-[4px] text-zinc-500">Balance</Text>
        <Text className="text-sm font-semibold text-white">{balanceLabel}</Text>
      </View>
    </View>
  );
}
