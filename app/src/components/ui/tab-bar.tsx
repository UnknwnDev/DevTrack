import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/theme/theme";

export function CustomTabBar({ state, descriptors, navigation }) {
  const { theme, isDark } = useAppTheme();

  return (
    <View style={styles.container}>
      <BlurView
        intensity={95}
        tint={isDark ? "dark" : "light"}
        style={[
          styles.pillContainer,
          {
            borderColor: theme.borderMuted,
            backgroundColor: theme.bgLight,
            opacity: 0.9,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused && navigation) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabItem}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: theme.textMuted,
                    size: 21,
                  })
                : null}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pillContainer: {
    flexDirection: "row",
    height: 60,
    width: "75%",
    borderRadius: 30,
    borderWidth: 1.2,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
