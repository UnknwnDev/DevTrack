import { Stack } from 'expo-router';
import "../../global.css";
import { StatusBar } from 'react-native';
import { SessionProvider, useSession } from '@/features/auth/auth-session';

function RootNavigator() {
  const { _isSignedIn, hasHydrated } = useSession();
  const isSignedIn = false;
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
          <Stack.Screen name='(app)' />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
