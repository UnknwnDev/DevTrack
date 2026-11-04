import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <View className="flex-1 bg-app justify-center items-center p-6 web:p-12">
      {/* Empty State / Error Content */}
      <View className="items-center max-w-md w-full mb-8 text-center">
        <Text className="text-3xl web:text-4xl font-extrabold text-text mb-3 text-center">
          Page not found
        </Text>
        <Text className="text-text-muted text-base text-center">
          This route does not exist. Head back home and keep building.
        </Text>
      </View>

      {/* Action Button */}
      <View className="w-full max-w-xs">
        <Link href="/" asChild>
          <Button label="Go home" icon="home" />
        </Link>
      </View>
    </View>
  );
}
