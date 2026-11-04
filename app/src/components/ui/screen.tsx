import { ScrollView, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
};

export function Screen({ children, className = '', scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();

  const safeAreaInsetsStyle: ViewStyle = {
    paddingTop: Math.max(insets.top + 12, 24),
    paddingBottom: Math.max(insets.bottom + 24, 32),
  };

  return (
    <View className="flex-1 bg-app">
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={[{ flexGrow: 1 }, safeAreaInsetsStyle]}
        >
          <View className={`flex-1 px-6 gap-6 ${className}`}>
            {children}
          </View>
        </ScrollView>
      ) : (
        <View style={safeAreaInsetsStyle} className={`flex-1 px-6 gap-6 ${className}`}>
          {children}
        </View>
      )}
    </View>
  );
}
