import { Text, View } from 'react-native';
import { Flame, TrendingUp } from 'lucide-react-native';

type TrackerCardProps = {
  hours?: string;
  changePercent?: number;
  streakDays?: number;
};

export function TrackerCard({
  hours = '12.5',
  changePercent = 42,
  streakDays = 5,
}: TrackerCardProps) {
  return (
    <View className="rounded-3xl border border-tracker-ring bg-tracker-card p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-text-muted">
          This Week
        </Text>

        <View className="rounded-full bg-primary/15 px-3 py-1">
          <Text className="text-xs font-semibold text-primary">
            Your activity
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-4xl font-bold tracking-tight text-text">
            {hours}h
          </Text>

          <Text className="mt-1 text-sm text-text-muted">
            Coding time
          </Text>

          <View className="mt-3 flex-row items-center">
            <TrendingUp
              size={15}
              color="#2DD4BF"
              strokeWidth={2.5}
            />
            <Text className="ml-1 text-xs font-semibold text-success">
              {changePercent}% vs. last week
            </Text>
          </View>
        </View>

        <View className="mr-3 h-[68px] w-[68px] items-center justify-center rounded-full border-[5px] border-tracker-ring bg-bg-light">
          <Flame
            size={30}
            color="#FF914D"
            fill="#FF914D"
            strokeWidth={2}
          />
        </View>

        <View>
          <Text className="text-lg font-bold text-text">
            {streakDays} days
          </Text>
          <Text className="mt-1 text-xs leading-4 text-text-muted">
            Current
            {'\n'}
            streak
          </Text>
        </View>
      </View>
    </View>
  );
}
