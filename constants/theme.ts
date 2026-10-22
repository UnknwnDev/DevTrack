
import { useColorScheme } from 'nativewind';

export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Backgrounds
    bgDark: isDark ? 'hsl(222 65% 5%)' : 'hsl(220 25% 98%)',
    bg: isDark ? 'hsl(220 62% 8%)' : 'hsl(0 0% 100%)',
    bgLight: isDark ? 'hsl(216 57% 12%)' : 'hsl(216 35% 96%)',

    // Text
    text: isDark ? 'hsl(210 40% 98%)' : 'hsl(222 47% 11%)',
    textMuted: isDark ? 'hsl(215 20% 68%)' : 'hsl(215 16% 42%)',

    // UI surfaces
    highlight: isDark ? 'hsl(215 50% 17%)' : 'hsl(230 100% 97%)',
    border: isDark ? 'hsl(215 35% 22%)' : 'hsl(220 20% 87%)',
    borderMuted: isDark ? 'hsl(218 40% 15%)' : 'hsl(220 20% 92%)',

    // Brand colors
    primary: isDark ? 'hsl(235 100% 65%)' : 'hsl(235 85% 58%)',
    secondary: isDark ? 'hsl(190 95% 50%)' : 'hsl(190 90% 38%)',

    // Status colors
    danger: isDark ? 'hsl(0 80% 65%)' : 'hsl(0 72% 50%)',
    warning: isDark ? 'hsl(42 95% 60%)' : 'hsl(35 90% 42%)',
    success: isDark ? 'hsl(158 65% 48%)' : 'hsl(158 70% 32%)',
    info: isDark ? 'hsl(205 95% 65%)' : 'hsl(205 85% 45%)',

    // DevTrack accents
    accent: isDark ? 'hsl(263 85% 70%)' : 'hsl(263 75% 55%)',
    cyan: isDark ? 'hsl(190 95% 50%)' : 'hsl(190 90% 38%)',
    indigo: isDark ? 'hsl(235 100% 65%)' : 'hsl(235 85% 58%)',
    purple: isDark ? 'hsl(263 85% 70%)' : 'hsl(263 75% 55%)',

    // Charts
    chart1: isDark ? 'hsl(235 100% 65%)' : 'hsl(235 85% 58%)',
    chart2: isDark ? 'hsl(190 95% 50%)' : 'hsl(190 90% 38%)',
    chart3: isDark ? 'hsl(263 85% 70%)' : 'hsl(263 75% 55%)',
    chart4: isDark ? 'hsl(158 65% 48%)' : 'hsl(158 70% 32%)',
    chart5: isDark ? 'hsl(42 95% 60%)' : 'hsl(35 90% 42%)',

    // Interactive elements
    tabBar: isDark ? 'hsl(220 58% 7%)' : 'hsl(0 0% 100%)',
    tabActive: isDark ? 'hsl(235 100% 65%)' : 'hsl(235 85% 58%)',
    tabInactive: isDark ? 'hsl(215 20% 60%)' : 'hsl(215 12% 52%)',
    overlay: isDark ? 'hsla(222, 65%, 3%, 0.75)' : 'hsla(222, 47%, 11%, 0.4)',

    // Gradients (use with a gradient component)
    gradientStart: isDark ? 'hsl(235 100% 65%)' : 'hsl(235 85% 58%)',
    gradientEnd: isDark ? 'hsl(263 85% 70%)' : 'hsl(263 75% 55%)',
  };
}
