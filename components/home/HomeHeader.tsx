import { Pressable, Text, View } from 'react-native';
import { Bell, Code2, UserRound } from 'lucide-react-native';

type HomeHeaderProps = {
  name?: string;
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
};

export function HomeHeader({
  name = 'Developer',
  onProfilePress,
  onNotificationsPress,
}: HomeHeaderProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View className="flex-1">
        <View className="mb-2 flex-row items-center">
          <View className="mr-2 h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Code2 size={21} color="#FFFFFF" strokeWidth={2.5} />
          </View>

          <Text className="text-lg font-bold text-text">
            Dev<Text className="text-primary">Track</Text>
          </Text>
        </View>

        <Text className="text-sm text-text-muted">
          Welcome back,
        </Text>
        <Text className="mt-0.5 text-2xl font-bold text-text">
          {name} 👋
        </Text>
        <Text className="mt-1 text-sm text-text-muted">
          Ready to make progress today?
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Pressable
          accessibilityLabel="Notifications"
          onPress={onNotificationsPress}
          className="h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
        >
          <Bell size={20} color="#CBD5E1" />
        </Pressable>

        <Pressable
          accessibilityLabel="Profile"
          onPress={onProfilePress}
          className="h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
        >
          <UserRound size={21} color="#CBD5E1" />
        </Pressable>
      </View>
    </View>
  );
}
