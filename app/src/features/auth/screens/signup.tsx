import { View, Text, TextInput, Pressable } from 'react-native';
import { router, Link } from 'expo-router';

import { Screen } from '@/components/ui/screen';
import { Button } from '@/components/ui/button';
import { useSession } from '@/features/auth/auth-session';
import { useAuthForm } from '@/features/auth/hooks/use-auth-form';

export default function SignupScreen() {
  const { signIn } = useSession();
  const { email, password, setEmail, setPassword, isValid } = useAuthForm('');

  function handleSubmit() {
    if (!isValid) return;
    signIn(email);
    router.replace('/');
  }

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
            placeholderTextColor="var(--text-muted)"
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
            placeholder="Create a password"
            placeholderTextColor="var(--text-muted)"
            secureTextEntry
            className="bg-app-light border border-border text-text px-4 py-3.5 rounded-xl text-base"
          />
        </View>

        <Button
          label="Create Account"
          onPress={handleSubmit}
          disabled={!isValid}
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
