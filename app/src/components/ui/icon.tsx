import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

const iconMap = {
  add: "add",
  alert: "warning",
  arrowRight: "arrow-forward",
  bell: "notifications",
  check: "check",
  checkCircle: "check-circle",
  chevronRight: "chevron-right",
  close: "close",
  home: "home",
  userPlus: "person-add",
  search: "search",
  settings: "settings",
  trash: "delete",
  pause: "pause",
  play: "play-arrow",
  stop: "stop",
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = Omit<ComponentProps<typeof MaterialIcons>, "name"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return <MaterialIcons name={iconMap[name]} {...props} />;
}
