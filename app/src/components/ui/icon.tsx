import { Platform } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

const iconMap = {
  add: { ios: 'plus', android: 'add', web: 'add' },
  alert: { ios: 'exclamationmark.triangle', android: 'warning', web: 'warning' },
  arrowRight: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  checkCircle: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  home: { ios: 'house', android: 'home', web: 'home' },
  userPlus: { ios: 'person.badge.plus', android: 'person_add', web: 'person_add' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  trash: { ios: 'trash', android: 'delete', web: 'delete' },
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = Omit<SymbolViewProps, 'name' | 'tintColor'> & {
  name: IconName;
  color?: string;
  size?: number;
};

export function Icon({ name, color, size = 20, resizeMode = 'scaleAspectFit', ...props }: IconProps) {
  const iconName = Platform.select({
    ios: iconMap[name]?.ios,
    android: iconMap[name]?.android,
    web: iconMap[name]?.web,
    default: iconMap[name]?.web,
  });

  if (!iconName) return null;

  return (
    <SymbolView
      name={iconName as SymbolViewProps['name']}
      tintColor={color}
      resizeMode={resizeMode}
      size={size}
      {...props}
    />
  );
}
