import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

const iconMap = {
  add: "add",
  alert: "warning",
  arrowRight: "arrow_forward",
  bell: "notifications",
  check: "check",
  checkCircle: "check_circle",
  chevronRight: "chevron_right",
  close: "close",
  home: "home",
  userPlus: "person_add",
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
