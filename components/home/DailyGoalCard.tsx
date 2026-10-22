import { Text, View } from 'react-native';
import { Target } from 'lucide-react-native';

type DailyGoalCardProps = {
  completedHours?: number;
  targetHours?: number;
};

export function DailyGoalCard({
  completedHours = 1.5,
  targetHours = 2,
}: DailyGoalCardProps) {
  const progress =
    targetHours > 0
      ? Math.min(completedHours / targetHours, 1)
      : 0;

  const percentage = Math.round(progress * 100);
  const remaining = Math.max(targetHours - completedHours, 0);

  return (
    <View className="mt-5 rounded-3xl border border-border bg-card p-5">
      <View className="flex-row items-center">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
          <Target size={23} color="#B794F6" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-text">
            Daily coding goal
          </Text>

          <Text className="mt-1 text-xs text-text-muted">
            Small steps add up
          </Text>
        </View>

        <Text className="text-lg font-bold text-accent">
          {percentage}%
        </Text>
      </View>

      <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-bg-light">
        <View
          className="h-full rounded-full bg-accent"
          style={{ width: `${percentage}%` }}
        />
      </View>

      <View className="mt-3 flex-row justify-between">
        <Text className="text-xs text-text-muted">
          {completedHours}h completed
        </Text>

        <Text className="text-xs text-text-muted">
          {targetHours}h goal
        </Text>
      </View>

      <Text className="mt-4 text-sm text-text-muted">
        {remaining === 0
          ? 'Goal completed! Great work today 🎉'
          : `${remaining.toFixed(1)}h left to reach your daily goal.`}
      </Text>
    </View>
  );
}
