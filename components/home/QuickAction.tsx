import { Pressable, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';

type QuickActionProps = {
  onPress?: () => void;
};

export function QuickAction({ onPress }: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-5 flex-row items-center rounded-2xl bg-primary p-4"
    >
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-white/15">
        <Plus size={25} color="#FFFFFF" strokeWidth={2.5} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-white">
          Log a coding session
        </Text>
        <Text className="mt-1 text-xs text-white/80">
          Record what you worked on today
        </Text>
      </View>

      <Plus size={21} color="#FFFFFF" />
    </Pressable>
  );
}
