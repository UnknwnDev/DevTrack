import { Text, View } from 'react-native';

const activity = [
  { day: 'M', hours: 1.5 },
  { day: 'T', hours: 2.5 },
  { day: 'W', hours: 1.8 },
  { day: 'T', hours: 3.5 },
  { day: 'F', hours: 2.2 },
  { day: 'S', hours: 4 },
  { day: 'S', hours: 1 },
];

type WeeklyActivityProps = {
  totalHours?: string;
};

export function WeeklyActivity({
  totalHours = '16.5',
}: WeeklyActivityProps) {
  const maxHours = 4;

  return (
    <View className="mt-5 rounded-3xl border border-border bg-card p-5">
      <View className="mb-5 flex-row items-center justify-between">
        <View>
          <Text className="text-base font-bold text-text">
            Weekly activity
          </Text>
          <Text className="mt-1 text-xs text-text-muted">
            Your coding hours this week
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xl font-bold text-text">
            {totalHours}h
          </Text>
          <Text className="text-xs text-text-muted">
            Total logged
          </Text>
        </View>
      </View>

      <View className="h-36 flex-row items-end justify-between">
        {activity.map((item, index) => {
          const barHeight = (item.hours / maxHours) * 100;
          const isToday = index === 5;

          return (
            <View
              key={`${item.day}-${index}`}
              className="flex-1 items-center"
            >
              <View className="h-[104px] w-6 justify-end overflow-hidden rounded-full bg-bg-light">
                <View
                  className={`w-full rounded-full ${
                    isToday ? 'bg-secondary' : 'bg-primary'
                  }`}
                  style={{ height: `${barHeight}%` }}
                />
              </View>

              <Text
                className={`mt-3 text-xs ${
                  isToday
                    ? 'font-bold text-secondary'
                    : 'text-text-muted'
                }`}
              >
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center">
        <View className="mr-2 h-2 w-2 rounded-full bg-primary" />
        <Text className="text-xs text-text-muted">
          Coding sessions
        </Text>
        <View className="ml-4 mr-2 h-2 w-2 rounded-full bg-secondary" />
        <Text className="text-xs text-text-muted">
          Most active day
        </Text>
      </View>
    </View>
  );
}
