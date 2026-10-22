import { Stack } from "expo-router";
import "../global.css";
import { useThemeColors } from "../constants/theme";

export default function RootLayout() {
  const theme = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bgDark,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.bgDark, // Keeps screen backgrounds matching your theme
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="create-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Create",
        }}
      />
    </Stack>
  );
}
