import { Card } from "@/components/ui/card";
import { Text, View } from "react-native";
import { getActivity } from "../activity.services";
import { useApiClient } from "@/lib/api/api";
import { useEffect, useState } from "react";

interface CardProp {
  id: string;
}

export default function ActivityCard({ id }: CardProp) {
  const apiClient = useApiClient();
  const [goalTitle, setGoalTitle] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      try {
        const data = await getActivity(apiClient, id);
        if (cancelled) return;

        setGoalTitle(data.goalTitle);
        setProjectTitle(data.projectTitle);
        setTime(data.time);
        setDuration(data.duration);
      } catch (error) {
        console.error("ActivityCard: Failed to load activity:", error);
      }
    }

    void loadActivity();

    return () => {
      cancelled = true;
    };
  }, [apiClient, id]);

  return (
    <Card className="flex-row items-center justify-between gap-6 py-4 my-1.5">
      <Text className="text-text text-lg">{time}</Text>

      <View
        className="h-12 w-1 flex-shrink-0 rounded-full bg-primary"
        style={{ boxShadow: "0px 0px 4px 4px rgba(86, 217, 255, 0.35)" }}
      />

      <View className="flex-1">
        <Text className="text-text text-lg font-semibold">{goalTitle}</Text>
        <Text className="text-text-muted">{projectTitle}</Text>
      </View>

      <Text className="text-text text-lg">{duration}</Text>
    </Card>
  );
}
