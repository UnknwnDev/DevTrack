import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <View className="flex-1 bg-app p-6 justify-between items-center web:py-16">

      {/* Top Header / Theme Toggle */}
      <View className="w-full flex-row justify-end">
        <Pressable
          onPress={toggleColorScheme}
          className="bg-app-light border border-border px-4 py-2 rounded-full active:opacity-75"
        >
          <Text className="text-text font-semibold text-xs">
            {!isMounted
              ? 'Loading...'
              : colorScheme === 'dark'
                ? '☀️ Light Mode'
                : '🌙 Dark Mode'}
          </Text>
        </Pressable>
      </View>

      {/* Hero Content */}
      <View className="items-center max-w-md w-full">
        <Text className="text-4xl web:text-5xl font-extrabold text-text text-center mb-4">
          <Text className='text-primary'>D</Text>evTracks
        </Text>
        <Text className="text-text-muted text-center text-base mb-8">
          Track coding sessions, learning goals, completed projects,
          and weekly progress in a personal developer dashboard
        </Text>
      </View>

      {/* Action Buttons (Login & Sign Up) */}
      <View className="w-full max-w-sm gap-4 mb-8">
        <Link href="/login" asChild>
          <Button label="Log In" icon='arrowRight' />
        </Link>

        <Link href="/signup" asChild>
          <Button label='Create Account' icon='userPlus' variant='secondary' />
        </Link>
      </View>
    </View>
  );
}
