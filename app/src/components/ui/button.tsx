import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from "react-native";
import { Icon, type IconName } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import { useColorScheme } from "nativewind";

type ButtonProps = PressableProps & {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
  textClassName?: string;
};

export function Button({
  label = "",
  variant = "primary",
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  textClassName = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const { colorScheme } = useColorScheme();

  // Secondary now uses subtle brightness shifts to look darker/lighter on hover
  const variantStyles = {
    primary: "bg-primary border-primary",
    secondary: "bg-text border-border",
    outline: "bg-transparent border-border",
    ghost: "bg-transparent border-transparent",
  }[variant];

  const textStyles = {
    primary: "text-app-dark font-bold",
    secondary: "text-app-light font-semibold",
    outline: "text-text font-semibold",
    ghost: "text-text font-semibold",
  }[variant];

  const variantTextColors = {
    primary: "#fff", // app-dark
    secondary: colorScheme === "dark" ? "#000" : "#fff", // app-light
    outline: "#fff", // text
    ghost: "#fff", // text
  } as const;

  return (
    <Pressable
      disabled={isDisabled}
      className={twMerge(
        `
        flex-row items-center justify-center gap-2 py-1 px-4 rounded-xl border transition-colors
        ${fullWidth ? "w-full" : "self-start"}
        ${variantStyles}
        ${isDisabled ? "opacity-50" : ""}
      `,
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator className="w-full h-full" color="currentColor" />
      ) : (
        <>
          {icon ? (
            <Icon name={icon} size={25} color={variantTextColors[variant]} />
          ) : null}

          <Text className={twMerge(`text-base ${textStyles}`, textClassName)}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
