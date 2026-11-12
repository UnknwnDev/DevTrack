import { useAppTheme } from '@/theme/theme';
import { Stack } from 'expo-router/stack';


export default function MainLayout() {
  const { theme } = useAppTheme();
  return <Stack screenOptions={{
    headerBackButtonDisplayMode: 'minimal',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerStyle: { backgroundColor: theme.bg },
    headerTintColor: theme.text,
    headerTitle: "",
    contentStyle: { backgroundColor: theme.bg }
  }}>
    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
  </Stack>
}
