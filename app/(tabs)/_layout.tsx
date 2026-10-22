import { Tabs, useRouter } from "expo-router";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { CustomTabBarButton } from "../../components/CusomTabBarButton";
import { useThemeColors } from "../../constants/theme";

export default function TabLayout() {
  const router = useRouter();
  const theme = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: { backgroundColor: theme.bgDark },
        headerShadowVisible: false,
        headerShown: false,
        headerTintColor: theme.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="timer-outline" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/create-modal");
          },
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="bullseye" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="chart-arc" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
