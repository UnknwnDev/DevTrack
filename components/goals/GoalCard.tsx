import { Text, View } from 'react-native';
import { Target, CheckCircle2 } from 'lucide-react-native';

type GoalCardProps = {
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  color: string;
};

export function GoalCard({
  title,
  description,
  current,
  target,
  unit,
  color,
}: GoalCardProps) {
  const progress =
    target > 0 ? Math.min(current / target, 1) : 0;
  const percentage = Math.round(progress * 100);
  const completed = current >= target;

  return (
    <View className="mb-4 rounded-2xl border border-border bg-card p-5">
      <View className="flex-row items-center">
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {completed ? (
            <CheckCircle2 size={22} color={color} />
          ) : (
            <Target size={22} color={color} />
          )}
        </View>

        <View className="flex-1">
          <Text className="font-bold text-text">{title}</Text>
          <Text className="mt-1 text-xs text-text-muted">
            {description}
          </Text>
        </View>

        <Text className="text-lg font-bold" style={{ color }}>
          {percentage}%
        </Text>
      </View>

      <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-bg-light">
        <View
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </View>

      <View className="mt-3 flex-row justify-between">
        <Text className="text-xs text-text-muted">
          {current} / {target} {unit}
        </Text>
        <Text className="text-xs text-text-muted">
          {completed
            ? 'Goal completed!'
            : `${Math.max(target - current, 0)} ${unit} to go`}
        </Text>
      </View>
    </View>
  );
}
