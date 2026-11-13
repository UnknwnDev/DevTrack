import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppTheme } from "@/theme/theme";
import { Tabs } from "expo-router";
import { CustomTabBar } from "@/components/ui/tab-bar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => {
            const { theme } = useAppTheme();
            return (
              <View className="w-14 h-14 rounded-full items-center justify-center bg-primary">
                <MaterialIcons
                  name="home"
                  size={size}
                  color={focused ? theme.bgLight : color}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
