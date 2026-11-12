export const themes = {
  light: {
    bgDark: 'hsl(203, 22%, 90%)',
    bg: 'hsl(203, 45%, 95%)',
    bgLight: 'hsl(203, 100%, 100%)',

    text: 'hsl(204, 66%, 4%)',
    textMuted: 'hsl(202, 14%, 28%)',

    highlight: 'hsl(203, 100%, 100%)',

    border: 'hsl(202, 8%, 50%)',
    borderMuted: 'hsl(203, 11%, 62%)',

    primary: 'hsl(196, 100%, 18%)',
    secondary: 'hsl(29, 99%, 22%)',

    danger: 'hsl(9, 21%, 41%)',
    warning: 'hsl(52, 23%, 34%)',
    success: 'hsl(147, 19%, 36%)',
    info: 'hsl(217, 22%, 41%)',
  },

  dark: {
    bgDark: 'hsl(206, 53%, 1%)',
    bg: 'hsl(203, 34%, 4%)',
    bgLight: 'hsl(202, 19%, 9%)',

    text: 'hsl(203, 89%, 95%)',
    textMuted: 'hsl(203, 14%, 69%)',

    highlight: 'hsl(202, 10%, 39%)',

    border: 'hsl(202, 14%, 28%)',
    borderMuted: 'hsl(202, 20%, 18%)',

    primary: 'hsl(201, 72%, 67%)',
    secondary: 'hsl(24, 67%, 67%)',

    danger: 'hsl(9, 26%, 64%)',
    warning: 'hsl(52, 19%, 57%)',
    success: 'hsl(146, 17%, 59%)',
    info: 'hsl(217, 28%, 65%)',
  },
} as const;

export type Theme = typeof themes.light;
export type ThemeMode = keyof typeof themes;
