import { View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppTheme } from "@/theme/theme";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          position: "absolute",
          left: 25,
          right: 25,
          bottom: 20,
          height: 50,
          paddingTop: 4,
          paddingBottom: 3,
          borderRadius: 10,
          backgroundColor: theme.bgLight,
          borderWidth: 1,
          borderColor: theme.borderMuted,
          elevation: 0,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarBackground: () => (
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFillObject, {}]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? theme.primary : "transparent",
              }}
            >
              <MaterialIcons
                name="home"
                size={21}
                color={focused ? theme.bgLight : color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
