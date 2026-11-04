import { Pressable, Text, ActivityIndicator, type PressableProps } from 'react-native';
import { Icon, type IconName } from '@/components/ui/icon';

type ButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  icon,
  loading = false,
  fullWidth = true,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  // Secondary now uses subtle brightness shifts to look darker/lighter on hover
  const variantStyles = {
    primary: 'bg-primary border-primary hover:bg-secondary hover:border-secondary active:opacity-80',
    secondary: 'bg-text border-border hover:bg-text-muted active:opacity-75',
    outline: 'bg-transparent border-border hover:bg-secondary hover:border-secondary active:opacity-75',
    ghost: 'bg-transparent border-transparent hover:bg-secondary/15 active:opacity-75',
  }[variant];

  const textStyles = {
    primary: 'text-app-dark font-bold hover:text-app-dark',
    secondary: 'text-app-light font-semibold',
    outline: 'text-text font-semibold hover:text-app-dark',
    ghost: 'text-text font-semibold hover:text-secondary',
  }[variant];

  return (
    <Pressable
      disabled={isDisabled}
      className={`
        flex-row items-center justify-center gap-2 py-4 px-6 rounded-xl border transition-colors
        ${fullWidth ? 'w-full' : 'self-start'}
        ${variantStyles}
        ${isDisabled ? 'opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="currentColor" />
      ) : (
        <>
          {icon ? <Icon name={icon} size={18} /> : null}
          <Text className={`text-base ${textStyles}`}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
