import { Link, router } from "expo-router";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { useSession } from "@/features/auth/auth-session";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { loginUser } from "@/features/auth/auth.service";
import { useAppTheme } from "@/theme/theme";
import { useApiClient } from "@/lib/api/api";

export default function LoginScreen() {
  const { theme } = useAppTheme();
  const { signIn } = useSession();
  const { email, password, setEmail, setPassword } = useAuthForm();
  const apiClient = useApiClient();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const data = await loginUser(apiClient, { email, password });

      console.log("Logged in successfully! Token:", data.access_token);

      signIn(data.refresh_token, data.access_token, data.user);
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <Screen className="justify-between max-w-md mx-auto w-full">
      {/* Header */}
      <View className="items-center mt-6">
        <Text className="text-3xl font-extrabold text-text text-center mb-2">
          Welcome Back
        </Text>
        <Text className="text-text-muted text-center text-base">
          Log in to your account to continue.
        </Text>
      </View>

      {/* Form Fields */}
      <View className="gap-4 my-auto w-full">
        <View className="gap-2">
          <Text className="text-text font-medium text-sm">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <View className="gap-2">
          <Text className="text-text font-medium text-sm">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={theme.textMuted}
            secureTextEntry
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <Button label="Log In" onPress={handleLogin} className="mt-2" />
      </View>

      {/* Footer / Signup Link */}
      <View className="flex-row justify-center items-center gap-1 mb-6">
        <Text className="text-text-muted">Don't have an account?</Text>
        <Link href="/signup" asChild>
          <Pressable>
            <Text className="text-primary font-bold">Sign up</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
