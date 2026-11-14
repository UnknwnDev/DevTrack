import { Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/ui/screen";
import { useSession } from "@/features/auth/auth-session";
import TrackerCard from "@/features/tracker/components/tracker-card";
import StatCard from "@/features/stats/components/stat-card";
import ActivityList from "@/features/activity/components/activity-list";

export default function HomeScreen() {
  const { user, signOut } = useSession();

  return (
    <Screen className="">
      {/* Header */}
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-text-muted text-xl">
            {new Date().toLocaleString("en-US", { weekday: "long" })}
          </Text>
          <Text className="text-text text-3xl font-semibold">
            Welcome {user !== null ? user.name : ""}!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          className="w-14 h-14 mt-2 bg-secondary rounded-full shadow-md"
        ></TouchableOpacity>
      </View>

      <TrackerCard
        title="Tracking - Project"
        time="1:25:59"
        goalTitle="Goal • started 9:12 "
      />

      <View className="flex-row justify-center gap-4">
        <StatCard time />

        <StatCard streak />
      </View>

      {/* <ActivityList date={new Date(Date.now() - 24 * 60 * 60 * 1000)} /> */}
      <ActivityList date={new Date()} />
    </Screen>
  );
}
