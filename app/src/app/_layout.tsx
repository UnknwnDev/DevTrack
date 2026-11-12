import { Stack } from 'expo-router';
import "../../global.css";
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SessionProvider, useSession } from '@/features/auth/auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

function RootNavigator() {
  const { isSignedIn, hasHydrated } = useSession();
  if (!hasHydrated) {
    return null;
  }


  return (
    <>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name='(auth)' />
        </Stack.Protected>

        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name='(main)' />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('user-theme');

        if (savedTheme === 'light' || savedTheme === 'dark') {
          setColorScheme(savedTheme);
        } else {
          // Default to system setting if no preference was previously saved
          setColorScheme('system');
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
        setColorScheme('system');
      } finally {
        setIsReady(true);
      }
    }

    loadTheme();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View >
    );
  }
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
