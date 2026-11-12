import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function WelcomeScreen() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Screen className="p-6 justify-between items-center web:py-16">

      {/* Top Header / Theme Toggle */}
      <ThemeToggle />

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
    </Screen>
  );
}
