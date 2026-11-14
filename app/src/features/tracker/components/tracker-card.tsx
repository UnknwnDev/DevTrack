import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text, View } from "react-native";

interface CardProps {
  title: string;
  time?: string;
  goalTitle?: string;
  isRunning?: boolean;
}

export default function TrackerCard({
  title = "Start Session",
  time,
  goalTitle,
  isRunning = false,
}: CardProps) {
  return (
    <>
      {isRunning ? (
        <Card className="">
          <View className="flex-row gap-2 items-center">
            <View className="w-4 h-4 bg-primary rounded-full"></View>
            <Text className="text-text/90 text-l">{title}</Text>
          </View>
          <View className="flex-row -mb-3.5 justify-between">
            <Text className="text-text text-5xl font-bold">{time}</Text>
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
          <Text className="text-text-muted">{goalTitle}</Text>{" "}
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
