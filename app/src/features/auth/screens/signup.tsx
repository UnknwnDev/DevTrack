import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router, Link } from "expo-router";

import { Screen } from "@/components/ui/screen";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/auth-session";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { useAppTheme } from "@/theme/theme";
import { loginUser, signInUser } from "../auth.service";
import { useApiClient } from "@/lib/api/api";

export default function SignupScreen() {
  const { theme } = useAppTheme();
  const { signIn } = useSession();
  const { email, name, password, setEmail, setName, setPassword } =
    useAuthForm("");
  const apiClient = useApiClient();

  const handleSignIn = async () => {
    if (!email || !name || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const sign_data = await signInUser(apiClient, { email, name, password });
      const login_data = await loginUser(apiClient, { email, password });

      console.log("Sign in successfully! Token:", login_data.access_token);

      signIn(login_data.refresh_token, login_data.access_token, sign_data.user);
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Sign up Failed", err.message);
    }
  };

  return (
    <Screen className="justify-between max-w-md mx-auto w-full">
      {/* Header */}
      <View className="items-center mt-6">
        <Text className="text-3xl font-extrabold text-text text-center mb-2">
          Create Account
        </Text>
        <Text className="text-text-muted text-center text-base">
          Sign up to get started with your new app experience.
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
            inputMode="email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <View className="gap-2">
          <Text className="text-text font-medium text-sm">name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={theme.textMuted}
            inputMode="text"
            autoCapitalize="none"
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <View className="gap-2">
          <Text className="text-text font-medium text-sm">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor={theme.textMuted}
            secureTextEntry
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <Button
          label="Create Account"
          onPress={handleSignIn}
          className="mt-2"
        />
      </View>

      {/* Footer / Login Link */}
      <View className="flex-row justify-center items-center gap-1 mb-6">
        <Text className="text-text-muted">Already have an account?</Text>
        <Link href="/login" asChild>
          <Pressable>
            <Text className="text-primary font-bold">Log in</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
