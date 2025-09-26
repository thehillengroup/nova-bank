import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface StatPillProps {
  label: string;
  valueLabel: string;
  icon: keyof typeof Feather.glyphMap;
  tone: 'success' | 'warning';
}

export function StatPill({ label, valueLabel, icon, tone }: StatPillProps) {
  const toneColor = tone === 'success' ? '#22c55e' : '#f59e0b';

  return (
    <View className="items-center rounded-2xl bg-cardMuted/80 px-3 py-2">
      <View className="flex-row items-center gap-1">
        <Feather name={icon} size={14} color={toneColor} />
        <Text className="text-[10px] uppercase tracking-[3px] text-zinc-500">{label}</Text>
      </View>
      <Text className="mt-2 text-sm font-semibold text-white">{valueLabel}</Text>
    </View>
  );
}
