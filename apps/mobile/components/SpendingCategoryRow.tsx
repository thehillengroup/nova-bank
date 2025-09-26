import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { SpendingCategory } from '../../../packages/mock-data/src/types';

interface SpendingCategoryRowProps {
  category: SpendingCategory;
  formatAmount: (value: number) => string;
}

export function SpendingCategoryRow({ category, formatAmount }: SpendingCategoryRowProps) {
  const isUp = category.trend === 'up';

  return (
    <View className="flex-row items-center justify-between rounded-2xl bg-cardMuted/80 px-4 py-3">
      <View>
        <Text className="text-sm font-medium text-white">{category.label}</Text>
        <Text className="text-xs text-zinc-500">{formatAmount(category.amount)}</Text>
      </View>
      <View className="items-end">
        <View className="flex-row items-center gap-2">
          <Feather name={isUp ? 'arrow-up-right' : 'arrow-down-right'} size={14} color={isUp ? '#f59e0b' : '#22c55e'} />
          <Text className="text-xs text-zinc-400">{category.percentage}%</Text>
        </View>
      </View>
    </View>
  );
}
