import { useColorScheme } from 'nativewind';
import { themes } from '@/theme/colors';

export function useAppTheme() {
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  const theme = isDark ? themes.dark : themes.light;

  return {
    theme,
    isDark,
    colorScheme: isDark ? 'dark' : 'light',
  } as const;
}
