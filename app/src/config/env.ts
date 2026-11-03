import Constants from 'expo-constants';

export type AppEnvironment = 'development' | 'staging' | 'production';

const extra = Constants.expoConfig?.extra as Record<string, unknown> | undefined;

export const env = {
  appEnvironment: (extra?.appEnvironment as AppEnvironment | undefined) ?? 'development',
  apiBaseUrl: (extra?.apiBaseUrl as string | undefined) ?? 'https://api.example.com',
  analyticsEnabled: (extra?.analyticsEnabled as boolean | undefined) ?? false,
  notificationsEnabled: (extra?.notificationsEnabled as boolean | undefined) ?? false,
} as const;
