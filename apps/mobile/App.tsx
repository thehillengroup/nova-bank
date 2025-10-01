import './styles/nativewind';

import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import {
  accounts,
  cards,
  primarySnapshot,
  recentTransactions,
  spendingByCategory,
} from '@repo/mock-data';
import { createCurrencyFormatter, formatCurrency, formatDirectionalAmount } from './lib/format';
import { GradientCard } from './components/GradientCard';
import { AccountCard } from './components/AccountCard';
import { StatPill } from './components/StatPill';
import { SpendingCategoryRow } from './components/SpendingCategoryRow';
import { TransactionRow } from './components/TransactionRow';
import { CardRow } from './components/CardRow';

export default function App() {
  return (
    <SafeAreaProvider>
      <InnerApp />
    </SafeAreaProvider>
  );
}

function InnerApp() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const currencyFormatter = useMemo(
    () => createCurrencyFormatter(primarySnapshot.currency),
    [primarySnapshot.currency],
  );

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#6366f1" size="large" />
      </View>
    );
  }

  const formatAmount = (value: number) => formatCurrency(value, currencyFormatter);

  return (
    <LinearGradient colors={['#0b0b1d', '#05050f']} className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} className="flex-1 px-6 pt-6">
          <Text className="text-xs uppercase tracking-[6px] text-zinc-400">Nova Bank</Text>
          <Text className="mt-2 text-3xl font-semibold text-white">A clearer view of every account.</Text>
          <Text className="mt-3 text-sm text-zinc-400">
            Quick insights, real-time balances, and spending highlights in a single elegant dashboard.
          </Text>

          <View className="mt-8 space-y-6">
            <GradientCard>
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="text-xs uppercase tracking-[4px] text-zinc-400">Primary balance</Text>
                  <Text className="mt-3 text-4xl font-semibold text-white">{formatAmount(cards[0]?.balance ?? 0)}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-medium text-white">{cards[0]?.label}</Text>
                  <Text className="mt-1 text-xs text-zinc-400">**** {cards[0]?.last4}</Text>
                </View>
              </View>
              <View className="mt-8 flex-row items-center justify-between">
                <View>
                  <Text className="text-xs uppercase tracking-[4px] text-zinc-500">Available credit</Text>
                  <Text className="mt-2 text-base font-medium text-white">
                    {formatAmount((cards[0]?.creditLimit ?? 0) - Math.abs(cards[0]?.balance ?? 0))}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Feather name="send" size={16} color="white" />
                  <Text className="text-sm font-medium text-white">Quick transfer</Text>
                </View>
              </View>
            </GradientCard>

            <View className="space-y-3">
              {accounts.map((account) => (
                <AccountCard key={account.id} account={account} formatAmount={formatAmount} />
              ))}
            </View>

            <View className="rounded-3xl border border-white/5 bg-card p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">This month</Text>
                <View className="flex-row gap-4">
                  <StatPill
                    label="Income"
                    valueLabel={formatAmount(primarySnapshot.incomeThisMonth)}
                    icon="arrow-down-right"
                    tone="success"
                  />
                  <StatPill
                    label="Spending"
                    valueLabel={formatAmount(primarySnapshot.spendingThisMonth)}
                    icon="arrow-up-right"
                    tone="warning"
                  />
                </View>
              </View>

              <View className="mt-5 space-y-3">
                {spendingByCategory.map((category) => (
                  <SpendingCategoryRow key={category.id} category={category} formatAmount={formatAmount} />
                ))}
              </View>
            </View>

            <View className="rounded-3xl border border-white/5 bg-card p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">Recent transactions</Text>
                <Text className="text-xs text-primary">View all</Text>
              </View>
              <View className="mt-4 space-y-3">
                {recentTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    amountLabel={formatDirectionalAmount(
                      transaction.amount,
                      currencyFormatter,
                      transaction.direction,
                    )}
                  />
                ))}
              </View>
            </View>

            <View className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/30 to-transparent p-5">
              <Text className="text-base font-semibold text-white">Cards</Text>
              <View className="mt-4 space-y-3">
                {cards.map((card) => (
                  <CardRow key={card.id} card={card} balanceLabel={formatAmount(card.balance)} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

