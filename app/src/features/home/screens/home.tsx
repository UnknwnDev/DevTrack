import { Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/ui/screen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/auth-session";

export default function HomeScreen() {
  const { signOut } = useSession();

  return (
    <Screen className="">
      {/* Header */}
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-text-muted text-xl">Tuesday</Text>
          <Text className="text-text text-3xl font-semibold">
            Welcome back!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          className="w-14 h-14 mt-2 bg-secondary rounded-full shadow-md"
        ></TouchableOpacity>
      </View>

      <Card className="">
        <View className="flex-row gap-2 items-center">
          <View className="w-4 h-4 bg-primary rounded-full"></View>
          <Text className="text-text/90 text-l">TRACKING - PROJECT </Text>
        </View>

        <View className="flex-row -mb-3.5 justify-between">
          <Text className="text-text text-5xl font-bold">1:25:59</Text>
          <View className="flex-row gap-2">
            <Button
              className="bg-border-muted border-border rounded-full justify-between w-14 h-14 m-0 px-3"
              icon="pause"
            />
            <Button
              className="bg-primary border-border rounded-full justify-between w-14 h-14 m-0 px-3"
              icon="stop"
              variant="secondary"
            />
          </View>
        </View>
        <Text className="text-text-muted">Goal • started 9:12</Text>
      </Card>

      <View className="flex-row justify-center gap-4">
        <Card className="grow">
          <View className="gap-1">
            <Text className="text-text-muted text-lg">TODAY</Text>
            <Text className="text-text text-3xl font-semibold">5h 12m</Text>
            <Text className="text-success">+12% vs avg</Text>
          </View>
        </Card>
        <Card className="grow">
          <View className="gap-1">
            <Text className="text-text-muted text-lg">STREAK</Text>
            <Text className="text-text text-3xl font-semibold">21 days</Text>
            <Text className="text-text-muted">personal best</Text>
          </View>
        </Card>
      </View>

      <View>
        <View className="flex-row justify-between">
          <Text className="text-text-muted text-lg">TODAY'S ACTIVITY</Text>
          <Button
            textClassName="text-primary"
            label="See all"
            variant="ghost"
          />
        </View>

        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
        <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
          <Text className="text-text text-lg">8:04</Text>

          <View
            className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
            style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
          />

          <View className="flex-1">
            <Text className="text-text text-lg font-semibold">
              SQL Practice
            </Text>
            <Text className="text-text-muted">Fundamentals</Text>
          </View>

          <Text className="text-text text-lg">56m</Text>
        </Card>
      </View>
    </Screen>
  );
}
